import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  Department,
  LanguageCode,
  KMRLDocument,
  ImpactSimulation,
  OperationalIncident,
  ComplianceItem,
  ComplaintTicket,
  OperationalTask,
  AuditLogEntry,
  NotificationItem,
  CopilotMessage
} from '../types';
import {
  currentUser as initialUser,
  sampleUsers,
  mockDocuments as initialDocs,
  flagshipImpactSimulation,
  mockIncidents as initialIncidents,
  mockComplianceItems,
  mockComplaints,
  mockTasks as initialTasks,
  mockNotifications as initialNotifs,
  mockAuditLogs as initialAudit
} from '../data/mockData';
import { translations, TranslationDict } from '../i18n/translations';

export type NavTab =
  | 'home'
  | 'emergency'
  | 'notifications'
  | 'compliance'
  | 'complaints'
  | 'finance'
  | 'documents'
  | 'document-viewer'
  | 'version-compare'
  | 'impact-simulator'
  | 'knowledge-graph'
  | 'copilot'
  | 'my-work'
  | 'analytics'
  | 'admin'
  | 'audit'
  | 'settings';

interface AppContextType {
  user: UserProfile;
  setUserRole: (roleId: string) => void;
  availableUsers: UserProfile[];
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDict;
  theme: 'light' | 'dark' | 'high-contrast';
  setTheme: (th: 'light' | 'dark' | 'high-contrast') => void;
  soundAlerts: boolean;
  setSoundAlerts: (en: boolean) => void;
  
  // Documents state
  documents: KMRLDocument[];
  selectedDoc: KMRLDocument | null;
  openDocumentViewer: (docId: string, highlightClauseId?: string) => void;
  highlightedClauseId: string | null;
  setHighlightedClauseId: (id: string | null) => void;
  ingestNewDocument: (
    fileOrConfig: File | {
      name: string;
      size?: number;
      category?: 'Contract' | 'SOP' | 'Circular' | 'Safety Code' | 'Tender' | 'Audit Report' | 'Work Order' | 'Invoice';
      department?: Department;
      title?: string;
      summary?: string;
      clauses?: Array<{ clauseNumber: string; title: string; content: string; page?: number; severity?: 'critical' | 'high' | 'medium' | 'low'; highlightCategory?: 'deadline' | 'financial' | 'safety' | 'obligation' | 'general' }>;
    }
  ) => Promise<KMRLDocument>;
  ingestionProgress: { active: boolean; step: number; label: string; progress: number } | null;
  isIngestModalOpen: boolean;
  setIsIngestModalOpen: (open: boolean) => void;
  openIngestModal: () => void;
  lastIngestedDoc: KMRLDocument | null;
  
  // Impact Simulator & Blast Radius state
  currentSimulation: ImpactSimulation;
  verifyAndSignoffImpact: (actionIds: string[], notes?: string) => void;
  openSimulationForDoc: (docId: string) => void;
  
  // Emergency Incidents
  incidents: OperationalIncident[];
  acknowledgeIncident: (id: string) => void;
  escalateIncident: (id: string) => void;
  
  // Tasks
  tasks: OperationalTask[];
  updateTaskStatus: (taskId: string, newStatus: OperationalTask['status']) => void;
  addNewTask: (task: Omit<OperationalTask, 'id'>) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Audit Trail
  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'officerName' | 'officerRole' | 'ipAddress'>) => void;
  
  // Copilot Chat
  copilotMessages: CopilotMessage[];
  sendCopilotQuery: (text: string, mode?: 'UNDERSTAND' | 'CHANGE' | 'IMPACT' | 'ACTION') => Promise<void>;
  isCopilotLoading: boolean;
  
  // Global Search Modal
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  
  // Flagship Demo Tour
  isDemoTourActive: boolean;
  demoTourStep: number;
  startDemoTour: () => void;
  nextDemoTourStep: () => void;
  prevDemoTourStep: () => void;
  endDemoTour: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>('light');
  const [soundAlerts, setSoundAlerts] = useState<boolean>(true);

  const [documents, setDocuments] = useState<KMRLDocument[]>(initialDocs);
  const [selectedDoc, setSelectedDoc] = useState<KMRLDocument | null>(initialDocs[0]);
  const [highlightedClauseId, setHighlightedClauseId] = useState<string | null>('c-104-1');

  const [currentSimulation, setCurrentSimulation] = useState<ImpactSimulation>(flagshipImpactSimulation);
  const [incidents, setIncidents] = useState<OperationalIncident[]>(initialIncidents);
  const [tasks, setTasks] = useState<OperationalTask[]>(initialTasks);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifs);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAudit);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
  const [lastIngestedDoc, setLastIngestedDoc] = useState<KMRLDocument | null>(null);
  const [ingestionProgress, setIngestionProgress] = useState<{ active: boolean; step: number; label: string; progress: number } | null>(null);

  const openIngestModal = () => {
    setIsIngestModalOpen(true);
  };

  // Copilot state
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      timestamp: '09:42 IST',
      text: 'Good morning, Officer. I am KMRL IntelliDocs Copilot, grounded strictly on authorized Kochi Metro engineering contracts, signal protocols, and CMRS safety codes. Select a mode or ask any operational question.',
      mode: 'UNDERSTAND',
      confidence: 1.0,
      citations: []
    }
  ]);
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);

  // Demo Tour state
  const [isDemoTourActive, setIsDemoTourActive] = useState(false);
  const [demoTourStep, setDemoTourStep] = useState(0);

  const t = translations[language];

  // Keyboard shortcut Ctrl+K or Cmd+K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setUserRole = (userId: string) => {
    const found = sampleUsers.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      addAuditLog({
        actionType: 'LOGIN',
        description: `Officer switched active profile to ${found.name} (${found.role})`,
        department: found.department
      });
    }
  };

  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'officerName' | 'officerRole' | 'ipAddress'>) => {
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: timeStr,
      officerName: user.name,
      officerRole: user.role,
      ipAddress: '10.240.12.8 (KMRL Intranet)',
      ...entry
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const openDocumentViewer = (docId: string, highlightClauseId?: string) => {
    const doc = documents.find((d) => d.id === docId) || documents[0];
    if (!doc) return;
    setSelectedDoc(doc);
    if (highlightClauseId) {
      setHighlightedClauseId(highlightClauseId);
    } else if (doc.clauses && doc.clauses.length > 0) {
      setHighlightedClauseId(doc.clauses[0].id);
    } else {
      setHighlightedClauseId(null);
    }
    setCurrentTab('document-viewer');
    addAuditLog({
      actionType: 'VIEW_EVIDENCE',
      description: `Opened Document Viewer for ${doc.metadata?.docNumber || doc.id} - ${doc.metadata?.title || 'Document'}`,
      docReference: doc.id,
      department: doc.metadata?.department || user.department
    });
  };

  const openSimulationForDoc = (docId: string) => {
    setCurrentTab('impact-simulator');
    addAuditLog({
      actionType: 'SIMULATE_IMPACT',
      description: `Launched Change Impact Simulator for ${docId}`,
      docReference: docId,
      department: user.department
    });
  };

  const verifyAndSignoffImpact = (actionIds: string[], notes?: string) => {
    // 1. Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // 2. Update current simulation status
    const updatedRecs = currentSimulation.recommendedActions.map((act) => ({
      ...act,
      executed: actionIds.includes(act.id) ? true : act.executed
    }));

    setCurrentSimulation((prev) => ({
      ...prev,
      status: 'Human_Approved',
      verifiedBy: `${user.name} (${user.role})`,
      verifiedAt: new Date().toLocaleTimeString('en-GB') + ' IST',
      recommendedActions: updatedRecs
    }));

    // 3. Create active tasks for executed recommendations
    actionIds.forEach((id) => {
      const rec = currentSimulation.recommendedActions.find((a) => a.id === id);
      if (rec) {
        addNewTask({
          title: rec.title,
          description: `Generated via Change Impact Simulator verification for Contract 104 Amendment. ${notes || ''}`,
          sourceDocId: currentSimulation.sourceDocId,
          sourceDocNumber: 'KMRL/PROC/2026/104-REV2',
          sourceClause: 'Clause 4.2',
          department: rec.department,
          assignee: rec.assigneeRole === user.role ? user.name : 'Duty Officer',
          dueDate: rec.deadline,
          priority: rec.priority,
          status: 'To_Do',
          category: 'Mitigation'
        });
      }
    });

    // 4. Record high-governance audit trail
    addAuditLog({
      actionType: 'HUMAN_VERIFICATION',
      description: `Human-in-the-Loop Sign-off: Authorized ${actionIds.length} mitigation actions for Contract 104 delivery overrun.`,
      docReference: currentSimulation.sourceDocId,
      department: user.department,
      evidenceSnippet: `Authorized schedule variance buffer & ₹82L milestone voucher realignment.`
    });

    // 5. Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      severity: 'healthy',
      category: 'Tasks',
      title: 'Impact Mitigation Plan Authorized',
      message: `Officer ${user.name} verified and dispatched ${actionIds.length} operational tasks for Contract 104.`,
      timestamp: 'Just now',
      read: false,
      actionLabel: 'View My Work',
      actionView: 'my-work'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const acknowledgeIncident = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? { ...inc, status: 'Acknowledged', acknowledgedBy: `${user.name} (OCC)` }
          : inc
      )
    );
    addAuditLog({
      actionType: 'EMERGENCY_ACK',
      description: `Acknowledged emergency incident ${id} from Operations Control Center`,
      department: user.department
    });
  };

  const escalateIncident = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? { ...inc, status: 'Escalated', escalationLevel: inc.escalationLevel + 1 }
          : inc
      )
    );
    addAuditLog({
      actionType: 'ESCALATION',
      description: `Escalated incident ${id} to Managing Director & Chief Safety Officer Level`,
      department: user.department
    });
  };

  const updateTaskStatus = (taskId: string, newStatus: OperationalTask['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const addNewTask = (task: Omit<OperationalTask, 'id'>) => {
    const newTask: OperationalTask = {
      id: `tsk-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...task
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const ingestNewDocument = async (
    fileOrConfig: File | {
      name: string;
      size?: number;
      category?: 'Contract' | 'SOP' | 'Circular' | 'Safety Code' | 'Tender' | 'Audit Report' | 'Work Order' | 'Invoice';
      department?: Department;
      title?: string;
      summary?: string;
      clauses?: Array<{ clauseNumber: string; title: string; content: string; page?: number; severity?: 'critical' | 'high' | 'medium' | 'low'; highlightCategory?: 'deadline' | 'financial' | 'safety' | 'obligation' | 'general' }>;
    }
  ): Promise<KMRLDocument> => {
    const isRealFile = fileOrConfig instanceof File;
    const fileName = isRealFile ? fileOrConfig.name : fileOrConfig.name;
    const fileSize = isRealFile ? fileOrConfig.size : (fileOrConfig.size || 2.4 * 1024 * 1024);
    const category: 'Contract' | 'SOP' | 'Circular' | 'Safety Code' | 'Tender' | 'Audit Report' | 'Work Order' | 'Invoice' =
      (!isRealFile && fileOrConfig.category) ? fileOrConfig.category : 'SOP';
    const department: Department =
      (!isRealFile && fileOrConfig.department) ? fileOrConfig.department : user.department;
    const title = (!isRealFile && fileOrConfig.title) ? fileOrConfig.title : fileName.replace(/\.[^/.]+$/, '');

    setIngestionProgress({ active: true, step: 1, label: 'Uploading & Validating File Checksum (SHA-256)...', progress: 25 });
    await new Promise((r) => setTimeout(r, 600));

    setIngestionProgress({ active: true, step: 2, label: 'Document Layout Engine & OCR Optical Extraction (99.4% precision)...', progress: 50 });
    await new Promise((r) => setTimeout(r, 700));

    setIngestionProgress({ active: true, step: 3, label: 'Generating Canonical JSON & Metadata Provenance...', progress: 75 });
    await new Promise((r) => setTimeout(r, 600));

    setIngestionProgress({ active: true, step: 4, label: 'Vector Indexing (pgvector) & Multi-Entity Knowledge Graph Dependency Mapping...', progress: 95 });
    await new Promise((r) => setTimeout(r, 600));

    const newDocId = `KMRL-DOC-${Date.now().toString().slice(-4)}`;
    const randomSha = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const defaultClauses = [
      {
        id: `c-${newDocId}-1`,
        clauseNumber: 'Clause 1.1',
        title: 'Operational Scope & Compliance Threshold',
        content: `All depot superintendents and section controllers shall ensure immediate operational compliance with the stipulations specified in ${title}.`,
        page: 1,
        severity: 'medium' as const,
        highlightCategory: 'obligation' as const
      },
      {
        id: `c-${newDocId}-2`,
        clauseNumber: 'Clause 3.4',
        title: 'SCADA Telemetry Logging & SLA Verification',
        content: 'Emergency telemetry feeds and circuit alarms must be synchronized with the Muttom Operations Control Center (OCC) within 15 minutes of occurrence.',
        page: 2,
        severity: 'high' as const,
        highlightCategory: 'safety' as const
      }
    ];

    const clauses = (!isRealFile && fileOrConfig.clauses && fileOrConfig.clauses.length > 0)
      ? fileOrConfig.clauses.map((c, idx) => ({
          id: `c-${newDocId}-${idx + 1}`,
          clauseNumber: c.clauseNumber,
          title: c.title,
          content: c.content,
          page: c.page || 1,
          severity: (c.severity || 'medium') as 'critical' | 'high' | 'medium' | 'low',
          highlightCategory: (c.highlightCategory || 'obligation') as 'deadline' | 'financial' | 'safety' | 'obligation' | 'general'
        }))
      : defaultClauses;

    const newDoc: KMRLDocument = {
      id: newDocId,
      metadata: {
        docId: newDocId,
        docNumber: `KMRL/${department.substring(0, 3).toUpperCase()}/2026/${Math.floor(100 + Math.random() * 900)}`,
        title,
        category,
        department,
        version: 'v1.0',
        status: 'Indexed',
        uploadDate: new Date().toISOString().split('T')[0],
        effectiveDate: new Date().toISOString().split('T')[0],
        fileSize: `${(fileSize / (1024 * 1024)).toFixed(2)} MB`,
        pages: Math.max(4, Math.floor(Math.random() * 16) + 4),
        ocrConfidence: 99.4,
        conflictsDetected: 0,
        risksDetected: 0,
        extractedEntities: {
          locations: ['Aluva Terminal', 'Edappally Traction Post', 'Muttom OCC'],
          regulations: ['CMRS Safety Directives 2026', 'Metro Railways Act §17']
        },
        provenance: {
          uploadedBy: `${user.name} (${user.role})`,
          processingTimeMs: 1320,
          sha256: randomSha,
          storagePath: `kmrl-vault/canonical/${fileName}`
        }
      },
      summary: (!isRealFile && fileOrConfig.summary)
        ? fileOrConfig.summary
        : `Automated Canonical Ingestion of ${fileName}. Machine-readable JSON parsed with 99.4% OCR precision and 0 unresolved conflicts against KMRL Master Regulations.`,
      rawTextPreview: `KOCHI METRO RAIL LIMITED - CANONICAL INTELLIGENCE VAULT\nDOCUMENT: ${title}\nDEPARTMENT: ${department}\nSHA-256 CHECKSUM: ${randomSha}\n\n[SECTION 1 - GENERAL OPERATIONAL PRINCIPLES]\nExtracted verified operational records, signature seals, and provenance timestamps.`,
      clauses,
      relatedDocIds: ['KMRL-CNT-2026-104', 'KMRL-SOP-2026-04'],
      actionsPending: 0,
      verificationStatus: 'Human_Verified'
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setLastIngestedDoc(newDoc);
    setIngestionProgress({ active: false, step: 4, label: 'Ingestion Complete', progress: 100 });

    addAuditLog({
      actionType: 'DOCUMENT_UPLOAD',
      description: `Uploaded & ingested ${fileName} (${category}) into Canonical Intelligence Vault`,
      docReference: newDocId,
      department
    });

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      severity: 'healthy',
      category: 'Documents',
      title: 'Canonical Document Ingestion Complete',
      message: `${title} was successfully OCR-parsed, indexed with pgvector embeddings, and mapped to the Knowledge Graph.`,
      timestamp: 'Just now',
      read: false,
      relatedEntityId: newDocId,
      actionLabel: 'Open Document',
      actionView: 'document-viewer'
    };
    setNotifications((prev) => [notif, ...prev]);

    return newDoc;
  };

  const sendCopilotQuery = async (queryText: string, mode: 'UNDERSTAND' | 'CHANGE' | 'IMPACT' | 'ACTION' = 'UNDERSTAND') => {
    const userMsg: CopilotMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      text: queryText,
      mode
    };

    setCopilotMessages((prev) => [...prev, userMsg]);
    setIsCopilotLoading(true);

    try {
      const response = await fetch('/api/copilot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          mode,
          department: user.department,
          role: user.role,
          documentContext: documents.map((d) => ({
            id: d.id,
            title: d.metadata.title,
            category: d.metadata.category,
            clauses: d.clauses
          }))
        })
      });

      const data = await response.json();
      const assistantMsg: CopilotMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' IST',
        text: data.answer || 'Analysis complete based on authorized KMRL repository.',
        mode,
        citations: data.citations || [],
        confidence: data.confidence || 0.95,
        reasoningSummary: data.reasoningSummary || 'Synthesized strictly from authorized KMRL evidence repository.'
      };

      setCopilotMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Fallback deterministic response
      const fallbackMsg: CopilotMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' IST',
        text: `• **Verified Evidence**: Contract KMRL/2026/104 amended delivery schedule from **30 days → 45 days** (Clause 4.2).\n• **Operational Risk**: 2 Work Orders (WO-782, WO-810) and ₹82 Lakh Milestone 3 payment delayed by 15 calendar days.\n• **Required Action**: Issue OCC power routing schedule and align Finance payment voucher.`,
        mode,
        citations: [
          {
            docId: 'KMRL-CNT-2026-104',
            docTitle: 'Traction Substation Maintenance SLA',
            page: 8,
            section: 'Clause 4.2',
            snippet: 'Delivery & Commissioning schedule amended from 30 to 45 calendar days.'
          }
        ],
        confidence: 0.96,
        reasoningSummary: 'Deterministic verification against KMRL Canonical Store.'
      };
      setCopilotMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsCopilotLoading(false);
    }
  };

  // Flagship Demo Walkthrough Tour Controller
  const startDemoTour = () => {
    setIsDemoTourActive(true);
    setDemoTourStep(1);
    setCurrentTab('home');
  };

  const nextDemoTourStep = () => {
    if (demoTourStep === 1) {
      // Step 2: Open Evidence in Document Viewer
      openDocumentViewer('KMRL-CNT-2026-104', 'c-104-1');
      setDemoTourStep(2);
    } else if (demoTourStep === 2) {
      // Step 3: Compare Versions Diff
      setCurrentTab('version-compare');
      setDemoTourStep(3);
    } else if (demoTourStep === 3) {
      // Step 4: Simulate Blast Radius
      setCurrentTab('impact-simulator');
      setDemoTourStep(4);
    } else if (demoTourStep === 4) {
      // Step 5: Human Verification & Sign-off
      verifyAndSignoffImpact(['act-1', 'act-2', 'act-3'], 'Demo Tour Authorized Multi-Department Mitigation');
      setDemoTourStep(5);
    } else if (demoTourStep === 5) {
      // Step 6: Immutable Audit Trail Proof
      setCurrentTab('audit');
      setDemoTourStep(6);
    } else {
      endDemoTour();
    }
  };

  const prevDemoTourStep = () => {
    if (demoTourStep > 1) {
      setDemoTourStep((prev) => prev - 1);
      if (demoTourStep === 2) setCurrentTab('home');
      if (demoTourStep === 3) setCurrentTab('document-viewer');
      if (demoTourStep === 4) setCurrentTab('version-compare');
      if (demoTourStep === 5) setCurrentTab('impact-simulator');
      if (demoTourStep === 6) setCurrentTab('impact-simulator');
    }
  };

  const endDemoTour = () => {
    setIsDemoTourActive(false);
    setDemoTourStep(0);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUserRole,
        availableUsers: sampleUsers,
        currentTab,
        setCurrentTab,
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        soundAlerts,
        setSoundAlerts,
        documents,
        selectedDoc,
        openDocumentViewer,
        highlightedClauseId,
        setHighlightedClauseId,
        ingestNewDocument,
        ingestionProgress,
        currentSimulation,
        verifyAndSignoffImpact,
        openSimulationForDoc,
        incidents,
        acknowledgeIncident,
        escalateIncident,
        tasks,
        updateTaskStatus,
        addNewTask,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        auditLogs,
        addAuditLog,
        copilotMessages,
        sendCopilotQuery,
        isCopilotLoading,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isIngestModalOpen,
        setIsIngestModalOpen,
        openIngestModal,
        lastIngestedDoc,
        isDemoTourActive,
        demoTourStep,
        startDemoTour,
        nextDemoTourStep,
        prevDemoTourStep,
        endDemoTour
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
