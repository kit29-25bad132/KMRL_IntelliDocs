export type UserRole =
  | 'Super_Admin'
  | 'Operations_Officer'
  | 'Chief_Operations_Officer'
  | 'Engineering_Lead'
  | 'Finance_Manager'
  | 'Safety_Inspector'
  | 'Procurement_Head'
  | 'Reviewer';

export type Department =
  | 'Operations'
  | 'Engineering'
  | 'Finance'
  | 'Safety & Quality'
  | 'Civil & Track'
  | 'Signaling & Telecom'
  | 'Procurement'
  | 'Administration';

export type LanguageCode = 'en' | 'ml' | 'ta' | 'kn';
export type SupportedLanguage = LanguageCode;

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'healthy';

export interface UserProfile {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  role: UserRole;
  department: Department;
  avatarUrl?: string;
  lastLogin: string;
  permissions: string[];
}

export interface DocumentClause {
  id: string;
  clauseNumber: string;
  title: string;
  content: string;
  page: number;
  isModified?: boolean;
  previousContent?: string;
  severity?: Severity;
  riskNote?: string;
  highlightCategory?: 'deadline' | 'financial' | 'safety' | 'obligation' | 'general';
}

export interface CanonicalMetadata {
  docId: string;
  docNumber: string;
  title: string;
  category: 'Contract' | 'SOP' | 'Circular' | 'Safety Code' | 'Tender' | 'Audit Report' | 'Work Order' | 'Invoice';
  department: Department;
  version: string;
  previousVersionId?: string;
  status: 'Ingested' | 'Indexed' | 'Verified' | 'Action_Required' | 'Archived';
  uploadDate: string;
  effectiveDate: string;
  expiryDate?: string;
  fileSize: string;
  pages: number;
  ocrConfidence: number;
  conflictsDetected: number;
  risksDetected: number;
  extractedEntities: {
    vendors?: string[];
    locations?: string[];
    monetaryValues?: string[];
    deadlines?: string[];
    regulations?: string[];
  };
  provenance: {
    uploadedBy: string;
    processingTimeMs: number;
    sha256: string;
    storagePath: string;
  };
}

export interface KMRLDocument {
  id: string;
  metadata: CanonicalMetadata;
  summary: string;
  rawTextPreview: string;
  clauses: DocumentClause[];
  relatedDocIds: string[];
  actionsPending: number;
  verificationStatus: 'Human_Verified' | 'Pending_Review' | 'AI_Flagged';
}

export interface BlastRadiusNode {
  id: string;
  type: 'change' | 'contract' | 'work_order' | 'vendor' | 'payment' | 'deadline' | 'approval' | 'task';
  label: string;
  sublabel: string;
  department: Department;
  severity: Severity;
  evidenceRef: {
    docId: string;
    docTitle: string;
    page: number;
    clause: string;
  };
  metrics?: string;
  status: 'affected' | 'at_risk' | 'pending_verification' | 'mitigated';
}

export interface BlastRadiusEdge {
  from: string;
  to: string;
  relationship: string;
  evidenceProvenance: string;
}

export interface ImpactSimulation {
  id: string;
  title: string;
  sourceDocId: string;
  sourceDocTitle: string;
  sourceVersion: string;
  targetVersion: string;
  changeSummary: string;
  detectedAt: string;
  overallRisk: Severity;
  nodes: BlastRadiusNode[];
  edges: BlastRadiusEdge[];
  financialExposure: string;
  scheduleDelayEstimate: string;
  affectedDepartments: Department[];
  recommendedActions: {
    id: string;
    title: string;
    assigneeRole: UserRole;
    department: Department;
    priority: Severity;
    deadline: string;
    selected: boolean;
    executed?: boolean;
  }[];
  verifiedBy?: string;
  verifiedAt?: string;
  status: 'Pending_Verification' | 'Human_Approved' | 'Mitigated' | 'Escalated';
}

export interface OperationalIncident {
  id: string;
  title: string;
  category: 'Safety' | 'Signaling' | 'Traction' | 'Rolling Stock' | 'Civil' | 'Procurement';
  severity: 'critical' | 'high' | 'medium';
  department: Department;
  location: string;
  detectedAt: string;
  slaRemainingMinutes: number;
  status: 'Active' | 'Investigating' | 'Acknowledged' | 'Mitigated' | 'Escalated';
  summary: string;
  evidenceDocs: {
    docId: string;
    docTitle: string;
    page: number;
    clause: string;
  }[];
  acknowledgedBy?: string;
  escalationLevel: number;
  assignedOfficer: string;
}

export interface ComplianceItem {
  id: string;
  regulationCode: string;
  title: string;
  issuingAuthority: 'CMRs' | 'MoHUA' | 'Kerala Fire & Safety' | 'KMRL Internal';
  department: Department;
  dueDate: string;
  status: 'Compliant' | 'Due_Soon' | 'Overdue' | 'Missing_Evidence';
  complianceScore: number;
  evidenceDocId: string;
  evidencePage: number;
  lastAuditDate: string;
}

export interface ComplaintTicket {
  id: string;
  ticketNumber: string;
  category: 'Service & Operations' | 'Ticketing & AFC' | 'Safety & Cleanliness' | 'Infrastructure' | 'Vendor Grievance';
  priority: Severity;
  subject: string;
  origin: 'Public Helpline' | 'Station Counter' | 'Internal Department' | 'Vendor Portal';
  stationOrLocation: string;
  submittedAt: string;
  slaHoursRemaining: number;
  status: 'Received' | 'Classified' | 'Assigned' | 'Investigating' | 'Resolved';
  assignedTo: string;
  relatedDocId?: string;
}

export interface OperationalTask {
  id: string;
  title: string;
  description: string;
  sourceDocId: string;
  sourceDocNumber: string;
  sourceClause?: string;
  department: Department;
  assignee: string;
  dueDate: string;
  priority: Severity;
  status: 'To_Do' | 'In_Progress' | 'Under_Review' | 'Completed';
  category: 'Review' | 'Approval' | 'Inspection' | 'Mitigation' | 'Filing';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officerName: string;
  officerRole: UserRole;
  actionType: 'LOGIN' | 'DOCUMENT_UPLOAD' | 'VIEW_EVIDENCE' | 'SIMULATE_IMPACT' | 'HUMAN_VERIFICATION' | 'TASK_ASSIGNED' | 'EMERGENCY_ACK' | 'ESCALATION';
  description: string;
  docReference?: string;
  department: Department;
  evidenceSnippet?: string;
  ipAddress: string;
}

export interface NotificationItem {
  id: string;
  severity: Severity;
  category: 'Critical' | 'Tasks' | 'Documents' | 'Changes' | 'Compliance' | 'Finance' | 'Complaints' | 'System';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedEntityId?: string;
  actionLabel?: string;
  actionView?: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  mode?: 'UNDERSTAND' | 'CHANGE' | 'IMPACT' | 'ACTION';
  citations?: {
    docId: string;
    docTitle: string;
    page: number;
    section: string;
    snippet: string;
  }[];
  confidence?: number;
  reasoningSummary?: string;
  isSimulated?: boolean;
}
