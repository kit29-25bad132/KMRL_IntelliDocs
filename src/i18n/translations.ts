import { LanguageCode } from '../types';

export interface TranslationDict {
  appName: string;
  subTitle: string;
  tagline: string;
  searchPlaceholder: string;
  commandControl: string;
  govKerala: string;
  transitCommandCenter: string;
  nav: {
    dashboard: string;
    home: string;
    emergency: string;
    notifications: string;
    compliance: string;
    complaints: string;
    finance: string;
    documents: string;
    myWork: string;
    intelligence: string;
    copilot: string;
    impactSimulator: string;
    versionCompare: string;
    knowledgeGraph: string;
    analytics: string;
    admin: string;
    audit: string;
    settings: string;
  };
  dashboard: {
    breadcrumb: string;
    goodMorning: string;
    operationalSubtitle: string;
    docsProcessedToday: string;
    vsYesterday: string;
    pendingReview: string;
    criticalAlerts: string;
    complianceScore: string;
    priorityQueueTitle: string;
    priorityQueueSubtitle: string;
    goToInbox: string;
    review: string;
    auditTimelineTitle: string;
    auditTimelineSubtitle: string;
    activeAlertsTitle: string;
    activeAlertsSubtitle: string;
    viewEvidenceSource: string;
    ingestDocument: string;
    startDemoTour: string;
    confidence: string;
    active: string;
  };
  emergency: {
    title: string;
    subtitle: string;
    slaRemaining: string;
    groundedSopEvidence: string;
    escalate: string;
    acknowledge: string;
    activeIncidents: string;
    location: string;
    assignedOfficer: string;
  };
  audit: {
    title: string;
    subtitle: string;
    exportDossier: string;
    ledgerEntries: string;
    timestamp: string;
    actionAndEvent: string;
    officer: string;
    targetDoc: string;
    contextHash: string;
  };
  simulator: {
    title: string;
    badge: string;
    desc: string;
    pendingSignoff: string;
    signedOff: string;
    triggeringChange: string;
    financialExposure: string;
    downstreamNodes: string;
    affectedDept: string;
    graphTitle: string;
    graphSubtitle: string;
    provenanceTitle: string;
    jumpToDoc: string;
    authorizeAndDispatch: string;
    mitigationActions: string;
    deterministicTraversal: string;
    verifiedProvenance: string;
  };
  copilot: {
    title: string;
    subtitle: string;
    placeholder: string;
    askQuestion: string;
    groundedIn: string;
    quickPrompts: string;
    citations: string;
    verifiedFact: string;
  };
  settings: {
    title: string;
    subtitle: string;
    launchTour: string;
    langSection: string;
    englishLabel: string;
    englishSub: string;
    malayalamLabel: string;
    malayalamSub: string;
    tamilLabel: string;
    tamilSub: string;
    kannadaLabel: string;
    kannadaSub: string;
    soundSection: string;
    soundTitle: string;
    soundDesc: string;
    officerSection: string;
    loggedInOfficer: string;
    directorate: string;
    operationalRole: string;
    stationId: string;
    securityClearance: string;
  };
  analytics: {
    title: string;
    subtitle: string;
    exportDossier: string;
    docsProcessed: string;
    docsProcessedSub: string;
    avgTime: string;
    avgTimeSub: string;
    ocrAccuracy: string;
    ocrAccuracySub: string;
    actionsCompleted: string;
    actionsCompletedSub: string;
    tableTitle: string;
    tableSub: string;
    colDept: string;
    colDocs: string;
    colTime: string;
    colCompliance: string;
    colPending: string;
  };
  knowledgeGraph: {
    title: string;
    subtitle: string;
    filterNodes: string;
    allNodes: string;
    docs: string;
    facilities: string;
    vendors: string;
    regulations: string;
    telemetry: string;
    searchNodes: string;
    liveUpdating: string;
    nodeCount: string;
    edgeCount: string;
    nodeDetails: string;
    connectedTo: string;
    impactSeverity: string;
    provenance: string;
  };
  accessControl: {
    restrictedTitle: string;
    restrictedDesc: string;
    currentClearance: string;
    requiredClearance: string;
    switchPrompt: string;
    superAdminRole: string;
  };
  actions: {
    investigate: string;
    viewEvidence: string;
    simulateImpact: string;
    verifyAndSignoff: string;
    acknowledge: string;
    escalate: string;
    assignTask: string;
    openDocument: string;
    uploadNew: string;
    searchDocs: string;
    compareVersions: string;
    exportReport: string;
    close: string;
    filter: string;
    markAsRead: string;
    approve: string;
    reject: string;
    retry: string;
    startDemoTour: string;
  };
  headings: {
    commandCenter: string;
    prioritySummary: string;
    requiresAttention: string;
    operationalBlastRadius: string;
    emergencyConsole: string;
    complianceHealth: string;
    grievanceQueue: string;
    financialExposure: string;
    canonicalIntelligence: string;
    immutableAuditTrail: string;
    aiGovernance: string;
  };
  labels: {
    critical: string;
    highPriority: string;
    dueSoon: string;
    healthy: string;
    humanVerified: string;
    aiFlagged: string;
    pendingReview: string;
    sourceDocument: string;
    page: string;
    clause: string;
    confidence: string;
    department: string;
    role: string;
    lastUpdated: string;
    actions: string;
  };
}

export const translations: Record<LanguageCode, TranslationDict> = {
  en: {
    appName: 'KMRL IntelliDocs',
    subTitle: 'Kochi Metro Rail Limited • Command & Control',
    tagline: 'Operational Intelligence & Automated Document Action Platform',
    searchPlaceholder: 'Search documents, alerts, audits...',
    commandControl: 'Command & Control',
    govKerala: 'GOVERNMENT OF KERALA',
    transitCommandCenter: 'Transit Command Center',
    nav: {
      dashboard: 'Dashboard',
      home: 'Dashboard',
      emergency: 'Alerts',
      notifications: 'Notifications',
      compliance: 'Compliance',
      complaints: 'Grievances & SLA',
      finance: 'Finance & Contracts',
      documents: 'Documents',
      myWork: 'Actions',
      intelligence: 'Intelligence Hub',
      copilot: 'AI Copilot',
      impactSimulator: 'Impact Simulator',
      versionCompare: 'Version Diff',
      knowledgeGraph: 'Knowledge Graph',
      analytics: 'Analytics & KPIs',
      admin: 'Super Admin',
      audit: 'Audit Trail',
      settings: 'Settings'
    },
    dashboard: {
      breadcrumb: 'OPERATIONAL COMMAND CENTER',
      goodMorning: 'Kochi Metro Rail Operations Center',
      operationalSubtitle: 'AI Grounded Intelligence & Automated Action Platform • Real-time Multi-Document Graph Active',
      docsProcessedToday: 'Documents Processed Today',
      vsYesterday: '+12% vs yesterday',
      pendingReview: 'Pending Officer Review',
      criticalAlerts: 'Critical Active Alerts',
      complianceScore: 'Operational Compliance Score',
      priorityQueueTitle: 'High-Priority Operational Document Review Queue',
      priorityQueueSubtitle: 'AI-grounded clauses requiring officer sign-off and SLA verification',
      goToInbox: 'Open Full Document Vault',
      review: 'Review & Verify',
      auditTimelineTitle: 'Operations & Audit Event Ledger',
      auditTimelineSubtitle: 'Immutable cryptographically signed officer activities',
      activeAlertsTitle: 'Real-time Telemetry & SLA Alarms',
      activeAlertsSubtitle: 'Subsystem alerts cross-referenced with emergency standard operating procedures',
      viewEvidenceSource: 'View Evidence Source',
      ingestDocument: 'Ingest Document',
      startDemoTour: 'Interactive Demo Tour',
      confidence: 'confidence',
      active: 'Active'
    },
    emergency: {
      title: 'Emergency Incident Dispatch & OCC Action Desk',
      subtitle: 'Real-time telemetry alarms, automatic SOP citation retrieval, and human-in-the-loop dispatch',
      slaRemaining: 'SLA Remaining',
      groundedSopEvidence: 'Grounded Evidence & Standard Operating Procedures (SOP)',
      escalate: 'Escalate to Safety Director',
      acknowledge: 'Acknowledge Incident',
      activeIncidents: 'Active Alarms',
      location: 'Location',
      assignedOfficer: 'Assigned Officer'
    },
    audit: {
      title: 'KMRL Cryptographic Compliance & Operations Audit Trail',
      subtitle: 'Immutable record of document analyses, officer verifications, telemetry alarms, and dispatch signatures.',
      exportDossier: 'Export Compliance Dossier (JSON / CSV)',
      ledgerEntries: 'LEDGER ENTRIES RECORDED',
      timestamp: 'Timestamp & Block Hash',
      actionAndEvent: 'Action & Event',
      officer: 'Officer Clearance & User ID',
      targetDoc: 'Target Document / Entity',
      contextHash: 'Context Hash & Evidence Chain'
    },
    simulator: {
      title: 'Change Impact Simulator',
      badge: 'OPERATIONAL BLAST RADIUS',
      desc: 'Deterministic dependency graph mapping clause changes across contracts, safety codes, milestones, and work orders with verified provenance.',
      pendingSignoff: 'Awaiting Human-in-the-Loop Sign-off',
      signedOff: 'Authorized by Officer',
      triggeringChange: 'Triggering Document Change',
      financialExposure: 'Financial Exposure Impact',
      downstreamNodes: 'Downstream Dependencies',
      affectedDept: 'Impacted Directorates',
      graphTitle: 'Operational Blast Radius Dependency Map',
      graphSubtitle: 'Interactive cascading impact traversal across KMRL operations',
      provenanceTitle: 'Verified Source Provenance & Evidence',
      jumpToDoc: 'Inspect Grounded Clause in Document Viewer',
      authorizeAndDispatch: 'Authorize & Dispatch Mitigation Actions',
      mitigationActions: 'Recommended Mitigation Actions',
      deterministicTraversal: 'Deterministic Traversal',
      verifiedProvenance: 'Grounded Evidence Source'
    },
    copilot: {
      title: 'KMRL Intelligence Copilot',
      subtitle: 'Conversational grounded assistant referencing 400+ KMRL contracts, safety codes & circulars with page-level citations',
      placeholder: 'Ask any question across contracts, SOPs, safety circulars, or financial milestones...',
      askQuestion: 'Submit Query',
      groundedIn: 'Grounded strictly in official KMRL repository',
      quickPrompts: 'Quick Operational Queries',
      citations: 'Cited Documents & Clauses',
      verifiedFact: 'Verified by Grounded Extraction Engine'
    },
    settings: {
      title: 'System Preferences & Accessibility',
      subtitle: 'Configure operational display settings, language localization, sound indicators, and guided tours.',
      launchTour: 'Launch Interactive Demo Tour',
      langSection: 'Government Language Localization',
      englishLabel: 'English',
      englishSub: 'Standard Operational',
      malayalamLabel: 'മലയാളം (Malayalam)',
      malayalamSub: 'Official State Language',
      tamilLabel: 'தமிழ் (Tamil)',
      tamilSub: 'Regional Southern Metro',
      kannadaLabel: 'ಕನ್ನಡ (Kannada)',
      kannadaSub: 'Regional Rail Standard',
      soundSection: 'Telemetry Sound & Dispatch Alerts',
      soundTitle: 'Audio Alarm for Level-1 Critical Alarms',
      soundDesc: 'Plays standard chime during telemetry threshold breaches.',
      officerSection: 'Authenticated Officer Credentials',
      loggedInOfficer: 'Logged In Officer',
      directorate: 'Directorate',
      operationalRole: 'Operational Role',
      stationId: 'Station ID',
      securityClearance: 'Security Clearance: Gov-L2'
    },
    analytics: {
      title: 'Operational & Intelligence Analytics',
      subtitle: 'Measured processing latency, OCR accuracy benchmark, and cross-departmental compliance indices.',
      exportDossier: 'Export Analytics Dossier',
      docsProcessed: 'Documents Processed',
      docsProcessedSub: '+14 this week • 0 failures',
      avgTime: 'Avg Processing Time',
      avgTimeSub: '-4.2 hrs from baseline target',
      ocrAccuracy: 'OCR Accuracy Benchmark',
      ocrAccuracySub: 'Tested across scans & tables',
      actionsCompleted: 'Actions Completed',
      actionsCompletedSub: '18 pending officer sign-off',
      tableTitle: 'Departmental Volume & Operational Processing Latency',
      tableSub: 'Live Telemetry Metrics',
      colDept: 'Department',
      colDocs: 'Documents Ingested',
      colTime: 'Avg Processing Time',
      colCompliance: 'Compliance Score',
      colPending: 'Pending Actions'
    },
    knowledgeGraph: {
      title: 'Continuously Updating Operational Knowledge Graph',
      subtitle: 'Real-time multi-entity relationship graph dynamically updated from contracts, SOPs, telemetry feeds, and station assets.',
      filterNodes: 'Filter Entities',
      allNodes: 'All Network Entities',
      docs: 'Documents & Contracts',
      facilities: 'Stations & Depots',
      vendors: 'Vendors & Contractors',
      regulations: 'Safety Codes & Laws',
      telemetry: 'Active Alarms & Tasks',
      searchNodes: 'Search entity or connection...',
      liveUpdating: 'Continuously Syncing with OCC Data Bus',
      nodeCount: 'Total Graph Entities',
      edgeCount: 'Active Traceable Relationships',
      nodeDetails: 'Entity Intelligence & Provenance',
      connectedTo: 'Connected Operational Dependencies',
      impactSeverity: 'Operational Risk Level',
      provenance: 'Source Ingestion Reference'
    },
    accessControl: {
      restrictedTitle: 'Super Admin Access Restricted',
      restrictedDesc: 'You are currently authenticated as an operational officer. System configurations, AI confidence thresholds, and user management require Super Admin clearance (Level 5).',
      currentClearance: 'Current Clearance',
      requiredClearance: 'Required Clearance',
      switchPrompt: 'Switch to a Super Admin account profile to test administrator capabilities:',
      superAdminRole: 'Switch to Super Admin (Anand Varma)'
    },
    actions: {
      investigate: 'Investigate',
      viewEvidence: 'View Evidence',
      simulateImpact: 'Simulate Blast Radius',
      verifyAndSignoff: 'Sign-off Action',
      acknowledge: 'Acknowledge',
      escalate: 'Escalate to OCC Lead',
      assignTask: 'Dispatch Task',
      openDocument: 'Open Document',
      uploadNew: 'Ingest Document',
      searchDocs: 'Search Repository',
      compareVersions: 'Compare Versions',
      exportReport: 'Export Dossier',
      close: 'Close',
      filter: 'Filter',
      markAsRead: 'Mark as Read',
      approve: 'Authorize Sign-off',
      reject: 'Reject',
      retry: 'Retry OCR Processing',
      startDemoTour: 'Start Guided Tour'
    },
    headings: {
      commandCenter: 'Command Center',
      prioritySummary: 'High-Priority Queue',
      requiresAttention: 'Requires Verification',
      operationalBlastRadius: 'Operational Blast Radius',
      emergencyConsole: 'Emergency OCC Console',
      complianceHealth: 'Compliance Health Index',
      grievanceQueue: 'Passenger Grievance Queue',
      financialExposure: 'Financial Exposure Tracker',
      canonicalIntelligence: 'Canonical Document Vault',
      immutableAuditTrail: 'Cryptographic Audit Trail',
      aiGovernance: 'Super Admin & AI Governance'
    },
    labels: {
      critical: 'Critical Alert',
      highPriority: 'High Priority',
      dueSoon: 'Due Within 24h',
      healthy: 'Optimal',
      humanVerified: 'Human Verified',
      aiFlagged: 'AI Extraction',
      pendingReview: 'Pending Review',
      sourceDocument: 'Source Document',
      page: 'Page',
      clause: 'Clause',
      confidence: 'Confidence',
      department: 'Department',
      role: 'Clearance Role',
      lastUpdated: 'Last Updated',
      actions: 'Actions'
    }
  },
  ml: {
    appName: 'കെ.എം.ആർ.എൽ ഇൻ്റലിഡോക്സ്',
    subTitle: 'കൊച്ചി മെട്രോ റെയിൽ ലിമിറ്റഡ് • കമാൻഡ് & കൺട്രോൾ',
    tagline: 'ഓപ്പറേഷണൽ ഇൻ്റലിജൻസ് & ഓട്ടോമേറ്റഡ് ഡോക്യുമെന്റ് ആക്ഷൻ പ്ലാറ്റ്‌ഫോം',
    searchPlaceholder: 'രേഖകൾ, അലേർട്ടുകൾ, ഓഡിറ്റുകൾ തിരയുക...',
    commandControl: 'കമാൻഡ് & കൺട്രോൾ',
    govKerala: 'കേരള സർക്കാർ',
    transitCommandCenter: 'ട്രാൻസിറ്റ് കമാൻഡ് സെന്റർ',
    nav: {
      dashboard: 'ഡാഷ്‌ബോർഡ്',
      home: 'ഡാഷ്‌ബോർഡ്',
      emergency: 'അലേർട്ടുകൾ',
      notifications: 'അറിയിപ്പുകൾ',
      compliance: 'കംപ്ലയൻസ്',
      complaints: 'പരാതികൾ & എസ്.എൽ.എ',
      finance: 'ധനകാര്യം & കരാറുകൾ',
      documents: 'രേഖകൾ',
      myWork: 'പ്രവർത്തനങ്ങൾ',
      intelligence: 'ഇന്റലിജൻസ് ഹബ്',
      copilot: 'എ.ഐ കോപൈലറ്റ്',
      impactSimulator: 'ഇംപാക്റ്റ് സിമുലേറ്റർ',
      versionCompare: 'പതിപ്പ് വ്യത്യാസം',
      knowledgeGraph: 'നോളജ് ഗ്രാഫ്',
      analytics: 'അനലിറ്റിക്സ് & കെ.പി.ഐ',
      admin: 'സൂപ്പർ അഡ്മിൻ',
      audit: 'ഓഡിറ്റ് ട്രയൽ',
      settings: 'ക്രമീകരണങ്ങൾ'
    },
    dashboard: {
      breadcrumb: 'ഓപ്പറേഷണൽ കമാൻഡ് സെന്റർ',
      goodMorning: 'കൊച്ചി മെട്രോ റെയിൽ ഓപ്പറേഷൻസ് സെന്റർ',
      operationalSubtitle: 'എ.ഐ സാക്ഷ്യപ്പെടുത്തിയ ഇന്റലിജൻസ് & ഓട്ടോമേറ്റഡ് ആക്ഷൻ പ്ലാറ്റ്‌ഫോം • തത്സമയ ഡോക്യുമെന്റ് ഗ്രാഫ് സജീവം',
      docsProcessedToday: 'ഇന്ന് പ്രോസസ്സ് ചെയ്ത രേഖകൾ',
      vsYesterday: '+12% ഇന്നലത്തേതിനേക്കാൾ കൂടുതൽ',
      pendingReview: 'പരിശോധന കാത്തിരിക്കുന്നവ',
      criticalAlerts: 'നിർണായക അടിയന്തര അലേർട്ടുകൾ',
      complianceScore: 'കംപ്ലയൻസ് സ്കോർ',
      priorityQueueTitle: 'ഉയർന്ന മുൻഗണനയുള്ള രേഖാ പരിശോധന നിര',
      priorityQueueSubtitle: 'ഉദ്യോഗസ്ഥ സ്ഥിരീകരണവും എസ്.എൽ.എ അംഗീകാരവും ആവശ്യമുള്ള ക്ലോസുകൾ',
      goToInbox: 'മുഴുവൻ രേഖകളും കാണുക',
      review: 'പരിശോധിച്ചു അംഗീകരിക്കുക',
      auditTimelineTitle: 'ഓപ്പറേഷൻസ് & ഓഡിറ്റ് ഇവന്റ് ലെഡ്ജർ',
      auditTimelineSubtitle: 'ക്രിപ്റ്റോഗ്രാഫിക് രീതിയിൽ രേഖപ്പെടുത്തിയ ഉദ്യോഗസ്ഥ പ്രവർത്തനങ്ങൾ',
      activeAlertsTitle: 'തത്സമയ ടെലിമെട്രി & എസ്.എൽ.എ അലാറങ്ങൾ',
      activeAlertsSubtitle: 'എസ്.ഒ.പി മാർഗ്ഗനിർദ്ദേശങ്ങളുമായി ഒത്തുനോക്കിയ അടിയന്തര അലേർട്ടുകൾ',
      viewEvidenceSource: 'തെളിവ് ഉറവിടം പരിശോധിക്കുക',
      ingestDocument: 'രേഖ അപ്‌ലോഡ് ചെയ്യുക',
      startDemoTour: 'ഡെമോ ടൂർ ആരംഭിക്കുക',
      confidence: 'കൃത്യത',
      active: 'സജീവം'
    },
    emergency: {
      title: 'അടിയന്തര സംഭവ പ്രതികരണ & ഒ.സി.സി കൺസോൾ',
      subtitle: 'തത്സമയ ടെലിമെട്രി അലേർട്ടുകൾ, സ്വയമേവയുള്ള എസ്.ഒ.പി തെളിവുകൾ, ഉദ്യോഗസ്ഥ അംഗീകാരം',
      slaRemaining: 'എസ്.എൽ.എ ബാക്കി',
      groundedSopEvidence: 'സാക്ഷ്യപ്പെടുത്തിയ തെളിവുകളും സ്റ്റാൻഡേർഡ് ഓപ്പറേറ്റിംഗ് നടപടിക്രമങ്ങളും (SOP)',
      escalate: 'സുരക്ഷാ ഡയറക്ടർക്ക് കൈമാറുക',
      acknowledge: 'അംഗീകരിക്കുക',
      activeIncidents: 'സജീവ അലേർട്ടുകൾ',
      location: 'സ്ഥലം',
      assignedOfficer: 'ചുമതലയുള്ള ഓഫീസർ'
    },
    audit: {
      title: 'കെ.എം.ആർ.എൽ ക്രിപ്റ്റോഗ്രാഫിക് കംപ്ലയൻസ് & ഓഡിറ്റ് ട്രയൽ',
      subtitle: 'രേഖാ വിശകലനങ്ങൾ, ഉദ്യോഗസ്ഥ സ്ഥിരീകരണങ്ങൾ, ടെലിമെട്രി അലേർട്ടുകൾ എന്നിവയുടെ മാറ്റമില്ലാത്ത ചരിത്രം.',
      exportDossier: 'കംപ്ലയൻസ് റിപ്പോർട്ട് ഡൗൺലോഡ് (JSON / CSV)',
      ledgerEntries: 'രേഖപ്പെടുത്തിയ ലെഡ്ജർ എൻട്രികൾ',
      timestamp: 'സമയവും ബ്ലോക്ക് ഹാഷും',
      actionAndEvent: 'പ്രവർത്തനവും ഇവന്റും',
      officer: 'ഉദ്യോഗസ്ഥ പദവിയും യൂസർ ഐഡിയും',
      targetDoc: 'ലക്ഷ്യ രേഖ / ഘടകം',
      contextHash: 'കോൺടെക്സ്റ്റ് ഹാഷും തെളിവ് ശൃംഖലയും'
    },
    simulator: {
      title: 'മാറ്റ ആഘാത സിമുലേറ്റർ',
      badge: 'ഓപ്പറേഷണൽ ബ്ലാസ്റ്റ് റേഡിയസ്',
      desc: 'കരാറുകൾ, സുരക്ഷാ കോഡുകൾ, വർക്ക് ഓർഡറുകൾ എന്നിവയിലെ മാറ്റങ്ങൾ കണ്ടെത്തുകയും അവയുടെ പ്രത്യാഘാതം കണക്കാക്കുകയും ചെയ്യുന്നു.',
      pendingSignoff: 'ഉദ്യോഗസ്ഥ അംഗീകാരത്തിനായി കാത്തിരിക്കുന്നു',
      signedOff: 'ഉദ്യോഗസ്ഥൻ അംഗീകരിച്ചു',
      triggeringChange: 'മാറ്റത്തിന് കാരണമായ രേഖ',
      financialExposure: 'സാമ്പത്തിക ബാധ്യത',
      downstreamNodes: 'ബന്ധപ്പെട്ട ഘടകങ്ങൾ',
      affectedDept: 'ബാധിക്കപ്പെടുന്ന വകുപ്പുകൾ',
      graphTitle: 'ഓപ്പറേഷണൽ ഇംപാക്ട് മാപ്പ്',
      graphSubtitle: 'കൊച്ചി മെട്രോ പ്രവർത്തനങ്ങളിലെ തുടർച്ചയായ ആഘാത വിശകലനം',
      provenanceTitle: 'സാക്ഷ്യപ്പെടുത്തിയ രേഖാ തെളിവുകൾ',
      jumpToDoc: 'രേഖാ വ്യൂവറിൽ കാണുക',
      authorizeAndDispatch: 'നടപടികൾ അംഗീകരിച്ച് അയക്കുക',
      mitigationActions: 'ശുപാർശ ചെയ്ത പരിഹാര നടപടികൾ',
      deterministicTraversal: 'ഡീറ്റർമിനിസ്റ്റിക് വിശകലനം',
      verifiedProvenance: 'സാക്ഷ്യപ്പെടുത്തിയ തെളിവ്'
    },
    copilot: {
      title: 'കെ.എം.ആർ.എൽ ഇന്റലിജൻസ് കോപൈലറ്റ്',
      subtitle: '400+ കൊച്ചി മെട്രോ കരാറുകൾ, സുരക്ഷാ കോഡുകൾ, സർക്കുലറുകൾ എന്നിവയെ അടിസ്ഥാനമാക്കിയുള്ള എ.ഐ സഹായി',
      placeholder: 'കരാറുകൾ, എസ്.ഒ.പികൾ, ഫിനാൻഷ്യൽ മൈൽസ്റ്റോണുകൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...',
      askQuestion: 'ചോദ്യം അയക്കുക',
      groundedIn: 'ഔദ്യോഗിക കൊച്ചി മെട്രോ രേഖകളെ അടിസ്ഥാനമാക്കി',
      quickPrompts: 'പ്രധാന ചോദ്യങ്ങൾ',
      citations: 'ഉദ്ധരിച്ച രേഖകളും ക്ലോസുകളും',
      verifiedFact: 'സാക്ഷ്യപ്പെടുത്തിയ വിവരങ്ങൾ'
    },
    settings: {
      title: 'സിസ്റ്റം മുൻഗണനകളും ക്രമീകരണങ്ങളും',
      subtitle: 'ഡിസ്പ്ലേ ക്രമീകരണങ്ങൾ, ഭാഷാ മാറ്റം, ശബ്ദ സൂചകങ്ങൾ, ഗൈഡഡ് ടൂറുകൾ എന്നിവ ക്രമീകരിക്കുക.',
      launchTour: 'ഡെമോ ടൂർ ആരംഭിക്കുക',
      langSection: 'ഔദ്യോഗിക ഭാഷാ മാറ്റം',
      englishLabel: 'English',
      englishSub: 'സ്റ്റാൻഡേർഡ് ഓപ്പറേഷണൽ',
      malayalamLabel: 'മലയാളം (Malayalam)',
      malayalamSub: 'ഔദ്യോഗിക സംസ്ഥാന ഭാഷ',
      tamilLabel: 'தமிழ் (Tamil)',
      tamilSub: 'റീജിയണൽ സതേൺ മെട്രോ',
      kannadaLabel: 'ಕನ್ನಡ (Kannada)',
      kannadaSub: 'റീജിയണൽ റെയിൽ സ്റ്റാൻഡേർഡ്',
      soundSection: 'ടെലിമെട്രി ശബ്ദ & ഡിസ്പാച്ച് അലേർട്ടുകൾ',
      soundTitle: 'ലെവൽ-1 നിർണായക അലേർട്ടുകൾക്കുള്ള ഓഡിയോ അലാറം',
      soundDesc: 'ടെലിമെട്രി പരിധി ലംഘനങ്ങൾ ഉണ്ടാകുമ്പോൾ ഓഡിയോ അലാറം മുഴങ്ങുന്നു.',
      officerSection: 'ഉദ്യോഗസ്ഥ ക്രെഡൻഷ്യലുകൾ',
      loggedInOfficer: 'ലോഗിൻ ചെയ്ത ഓഫീസർ',
      directorate: 'ഡയറക്ടറേറ്റ്',
      operationalRole: 'പ്രവർത്തന പദവി',
      stationId: 'സ്റ്റേഷൻ ഐഡി',
      securityClearance: 'സുരക്ഷാ അനുമതി: Gov-L2'
    },
    analytics: {
      title: 'ഓപ്പറേഷണൽ & ഇന്റലിജൻസ് അനലിറ്റിക്സ്',
      subtitle: 'പ്രോസസ്സിംഗ് സമയം, ഒസിആർ കൃത്യത, വകുപ്പുതല കംപ്ലയൻസ് നിരക്കുകൾ എന്നിവ പരിശോധിക്കുക.',
      exportDossier: 'അനലിറ്റിക്സ് റിപ്പോർട്ട് ഡൗൺലോഡ്',
      docsProcessed: 'പ്രോസസ്സ് ചെയ്ത രേഖകൾ',
      docsProcessedSub: 'ഈ ആഴ്ച +14 • 0 പരാജയങ്ങൾ',
      avgTime: 'ശരാശരി പ്രോസസ്സിംഗ് സമയം',
      avgTimeSub: 'ടാർഗെറ്റിനേക്കാൾ 4.2 മണിക്കൂർ വേഗത്തിൽ',
      ocrAccuracy: 'ഒസിആർ കൃത്യതാ നിരക്ക്',
      ocrAccuracySub: 'സ്കാനുകളിലും പട്ടികകളിലും പരീക്ഷിച്ചു',
      actionsCompleted: 'പൂർത്തിയാക്കിയ നടപടികൾ',
      actionsCompletedSub: '18 എണ്ണം അംഗീകാരത്തിനായി കാത്തിരിക്കുന്നു',
      tableTitle: 'വകുപ്പുതല രേഖകളും പ്രോസസ്സിംഗ് സമയവും',
      tableSub: 'തത്സമയ ടെലിമെട്രി അളവുകൾ',
      colDept: 'വകുപ്പ്',
      colDocs: 'രേഖകളുടെ എണ്ണം',
      colTime: 'ശരാശരി സമയം',
      colCompliance: 'കംപ്ലയൻസ് സ്കോർ',
      colPending: 'തീർപ്പുകൽപ്പിക്കാത്ത നടപടികൾ'
    },
    knowledgeGraph: {
      title: 'തുടർച്ചയായി അപ്‌ഡേറ്റ് ചെയ്യപ്പെടുന്ന നോളജ് ഗ്രാഫ്',
      subtitle: 'കരാറുകൾ, എസ്.ഒ.പികൾ, ടെലിമെട്രി ഫീഡുകൾ, സ്റ്റേഷൻ ആസ്തികൾ എന്നിവയിൽ നിന്നുള്ള തത്സമയ റിലേഷൻഷിപ്പ് നെറ്റ്വർക്ക്.',
      filterNodes: 'ഫിൽട്ടർ ചെയ്യുക',
      allNodes: 'മുഴുവൻ ഘടകങ്ങളും',
      docs: 'രേഖകളും കരാറുകളും',
      facilities: 'സ്റ്റേഷനുകളും ഡിപ്പോകളും',
      vendors: 'കരാറുകാരും വെണ്ടർമാരും',
      regulations: 'സുരക്ഷാ നിയമങ്ങളും കോഡുകളും',
      telemetry: 'സജീവ അലാറങ്ങളും ചുമതലകളും',
      searchNodes: 'ഘടകങ്ങൾ തിരയുക...',
      liveUpdating: 'തത്സമയം ഡാറ്റാബസ്സുമായി സമന്വയിപ്പിക്കുന്നു',
      nodeCount: 'ആകെ ഗ്രാഫ് ഘടകങ്ങൾ',
      edgeCount: 'സജീവ ബന്ധങ്ങൾ',
      nodeDetails: 'ഘടക വിശദാംശങ്ങളും തെളിവുകളും',
      connectedTo: 'ബന്ധിപ്പിച്ച പ്രവർത്തന ഘടകങ്ങൾ',
      impactSeverity: 'റിസ്ക് നിലവാരം',
      provenance: 'ഉറവിട രേഖ'
    },
    accessControl: {
      restrictedTitle: 'സൂപ്പർ അഡ്മിൻ ആക്സസ് നിയന്ത്രിച്ചിരിക്കുന്നു',
      restrictedDesc: 'നിങ്ങൾ ഒരു ഓപ്പറേഷണൽ ഓഫീസറായി ലോഗിൻ ചെയ്തിരിക്കുന്നു. സിസ്റ്റം ക്രമീകരണങ്ങൾ മാറ്റുന്നതിന് സൂപ്പർ അഡ്മിൻ അനുമതി ആവശ്യമാണ്.',
      currentClearance: 'നിലവിലെ അനുമതി',
      requiredClearance: 'ആവശ്യമായ അനുമതി',
      switchPrompt: 'അഡ്മിനിസ്ട്രേറ്റർ ഫീച്ചറുകൾ പരീക്ഷിക്കാൻ സൂപ്പർ അഡ്മിൻ പ്രൊഫൈലിലേക്ക് മാറുക:',
      superAdminRole: 'സൂപ്പർ അഡ്മിനിലേക്ക് മാറുക (ആനന്ദ് വർമ്മ)'
    },
    actions: {
      investigate: 'അന്വേഷിക്കുക',
      viewEvidence: 'തെളിവ് കാണുക',
      simulateImpact: 'ആഘാതം പരിശോധിക്കുക',
      verifyAndSignoff: 'അംഗീകരിക്കുക',
      acknowledge: 'ശ്രദ്ധയിൽപ്പെട്ടു',
      escalate: 'മേലുദ്യോഗസ്ഥന് നൽകുക',
      assignTask: 'ചുമതല നൽകുക',
      openDocument: 'രേഖ തുറക്കുക',
      uploadNew: 'രേഖ അപ്‌ലോഡ് ചെയ്യുക',
      searchDocs: 'രേഖകൾ തിരയുക',
      compareVersions: 'പതിപ്പുകൾ താരതമ്യം ചെയ്യുക',
      exportReport: 'റിപ്പോർട്ട് ഡൗൺലോഡ്',
      close: 'അടയ്ക്കുക',
      filter: 'ഫിൽട്ടർ',
      markAsRead: 'വായിച്ചതായി അടയാളപ്പെടുത്തുക',
      approve: 'അംഗീകരിക്കുക',
      reject: 'നിരസിക്കുക',
      retry: 'വീണ്ടും ശ്രമിക്കുക',
      startDemoTour: 'ടൂർ ആരംഭിക്കുക'
    },
    headings: {
      commandCenter: 'കമാൻഡ് സെന്റർ',
      prioritySummary: 'മുൻഗണനാ നിര',
      requiresAttention: 'ശ്രദ്ധ ആവശ്യമായവ',
      operationalBlastRadius: 'ഓപ്പറേഷണൽ ബ്ലാസ്റ്റ് റേഡിയസ്',
      emergencyConsole: 'അടിയന്തര കൺസോൾ',
      complianceHealth: 'കംപ്ലയൻസ് നില',
      grievanceQueue: 'പരാതി നിര',
      financialExposure: 'സാമ്പത്തിക ബാധ്യത',
      canonicalIntelligence: 'ഡോക്യുമെന്റ് ശേഖരം',
      immutableAuditTrail: 'ഓഡിറ്റ് ട്രയൽ',
      aiGovernance: 'സൂപ്പർ അഡ്മിൻ & എ.ഐ നിയന്ത്രണം'
    },
    labels: {
      critical: 'നിർണായകം',
      highPriority: 'ഉയർന്ന മുൻഗണന',
      dueSoon: '24 മണിക്കൂറിനകം',
      healthy: 'തൃപ്തികരം',
      humanVerified: 'സ്ഥിരീകരിച്ചത്',
      aiFlagged: 'എ.ഐ കണ്ടെത്തിയത്',
      pendingReview: 'പരിശോധന കാത്തിരിക്കുന്നു',
      sourceDocument: 'ഉറവിട രേഖ',
      page: 'പേജ്',
      clause: 'ക്ലോസ്',
      confidence: 'കൃത്യത',
      department: 'വകുപ്പ്',
      role: 'പദവി',
      lastUpdated: 'അവസാനം പുതുക്കിയത്',
      actions: 'പ്രവർത്തനങ്ങൾ'
    }
  },
  ta: {
    appName: 'KMRL இன்டெலிடாக்ஸ்',
    subTitle: 'கொச்சி மெட்ரோ ரயில் லிமிடெட் • கமாண்ட் & கண்ட்ரோல்',
    tagline: 'செயல்பாட்டு நுண்ணறிவு மற்றும் ஆவண மேலாண்மை தளம்',
    searchPlaceholder: 'ஆவணங்கள், எச்சரிக்கைகள், தணிக்கைகளைத் தேடுங்கள்...',
    commandControl: 'கட்டுப்பாட்டு மையம்',
    govKerala: 'கேரள அரசு',
    transitCommandCenter: 'போக்குவரத்து கட்டுப்பாட்டு மையம்',
    nav: {
      dashboard: 'முகப்பு பலகை',
      home: 'முகப்பு பலகை',
      emergency: 'எச்சரிக்கைகள்',
      notifications: 'அறிவிப்புகள்',
      compliance: 'இணக்கம்',
      complaints: 'புகார்கள் & SLA',
      finance: 'நிதி & ஒப்பந்தங்கள்',
      documents: 'ஆவணங்கள்',
      myWork: 'செயல்கள்',
      intelligence: 'நுண்ணறிவு மையம்',
      copilot: 'AI வழிகாட்டி',
      impactSimulator: 'தாக்க உருவகப்படுத்துதல்',
      versionCompare: 'பதிப்பு ஒப்பீடு',
      knowledgeGraph: 'அறிவு வரைபடம்',
      analytics: 'பகுப்பாய்வு & அளவீடுகள்',
      admin: 'முதன்மை நிர்வாகி',
      audit: 'தணிக்கைப் பதிவு',
      settings: 'அமைப்புகள்'
    },
    dashboard: {
      breadcrumb: 'செயல்பாட்டு கட்டுப்பாட்டு மையம்',
      goodMorning: 'கொச்சி மெட்ரோ ரயில் செயல்பாட்டு மையம்',
      operationalSubtitle: 'AI அடிப்படையிலான நுண்ணறிவு தளம் • நிகழ்நேர ஆவண வரைபடம் செயலில் உள்ளது',
      docsProcessedToday: 'இன்று செயலாக்கப்பட்ட ஆவணங்கள்',
      vsYesterday: 'நேற்றை விட +12%',
      pendingReview: 'சரிபார்ப்புக்கு காத்திருப்பவை',
      criticalAlerts: 'முக்கிய எச்சரிக்கைகள்',
      complianceScore: 'பாதுகாப்பு இணக்க மதிப்பெண்',
      priorityQueueTitle: 'முக்கிய ஆவண ஆய்வு வரிசை',
      priorityQueueSubtitle: 'அதிகாரியின் ஒப்புதல் தேவைப்படும் முக்கிய விதிகள்',
      goToInbox: 'முழு ஆவணக் களஞ்சியத்தைத் திறக்க',
      review: 'ஆய்வு செய்து ஒப்புதல் அளி',
      auditTimelineTitle: 'செயல்பாடுகள் மற்றும் தணிக்கைப் பதிவு',
      auditTimelineSubtitle: 'மின்னணு முறையில் பாதுகாக்கப்பட்ட அதிகாரிகளின் நடவடிக்கைகள்',
      activeAlertsTitle: 'நிகழ்நேர டெலிமெட்ரி எச்சரிக்கைகள்',
      activeAlertsSubtitle: 'நிலையான இயக்க நடைமுறைகளுடன் சரிபார்க்கப்பட்ட எச்சரிக்கைகள்',
      viewEvidenceSource: 'சான்று மூலத்தைக் காண்க',
      ingestDocument: 'ஆவணத்தைப் பதிவேற்றுக',
      startDemoTour: 'வழிகாட்டி சுற்றுப்பயணம்',
      confidence: 'நம்பகத்தன்மை',
      active: 'செயலில்'
    },
    emergency: {
      title: 'அவசர சம்பவ மீட்பு & கட்டுப்பாட்டு அறை',
      subtitle: 'நிகழ்நேர எச்சரிக்கைகள், தானியங்கி SOP சான்றுகள் மற்றும் களப்பணி ஒப்புதல்',
      slaRemaining: 'SLA மீதம்',
      groundedSopEvidence: 'சரிபார்க்கப்பட்ட சான்றுகள் மற்றும் நிலையான இயக்க நடைமுறைகள் (SOP)',
      escalate: 'பாதுகாப்பு இயக்குனருக்கு அனுப்புக',
      acknowledge: 'ஏற்றுக்கொள்',
      activeIncidents: 'செயலில் உள்ள எச்சரிக்கைகள்',
      location: 'இடம்',
      assignedOfficer: 'பொறுப்பு அதிகாரி'
    },
    audit: {
      title: 'KMRL பாதுகாப்பு இணக்கம் மற்றும் தணிக்கைப் பதிவு',
      subtitle: 'ஆவண பகுப்பாய்வு, அதிகாரி ஒப்புதல்கள் மற்றும் அனுப்பல் கையொப்பங்களின் மாறாத பதிவு.',
      exportDossier: 'இணக்க அறிக்கையை பதிவிறக்கு (JSON / CSV)',
      ledgerEntries: 'பதிவு செய்யப்பட்ட தணிக்கை உள்ளீடுகள்',
      timestamp: 'நேரம் மற்றும் பிளாக் ஹாஷ்',
      actionAndEvent: 'செயல் மற்றும் நிகழ்வு',
      officer: 'அதிகாரி நிலை மற்றும் பயனர் ஐடி',
      targetDoc: 'இலக்கு ஆவணம் / பிரிவு',
      contextHash: 'சூழ்நிலை ஹாஷ் மற்றும் சான்று சங்கிலி'
    },
    simulator: {
      title: 'தாக்க உருவகப்படுத்துதல் கருவி',
      badge: 'செயல்பாட்டு தாக்க எல்லை',
      desc: 'ஒப்பந்தங்கள், பாதுகாப்பு விதிகள் மற்றும் பணிகளில் ஏற்படும் மாற்றங்களின் நேரடி தாக்க வரைபடம்.',
      pendingSignoff: 'அதிகாரி ஒப்புதலுக்காக காத்திருக்கிறது',
      signedOff: 'அதிகாரியால் அங்கீகரிக்கப்பட்டது',
      triggeringChange: 'மாற்றத்தை ஏற்படுத்திய ஆவணம்',
      financialExposure: 'நிதி தாக்க வெளிப்பாடு',
      downstreamNodes: 'தொடர்புடைய பிற பிரிவுகள்',
      affectedDept: 'பாதிக்கப்பட்ட துறைகள்',
      graphTitle: 'செயல்பாட்டு தாக்க வரைபடம்',
      graphSubtitle: 'கொச்சி மெட்ரோ செயல்பாடுகளின் ஊடாடும் தாக்க ஆய்வு',
      provenanceTitle: 'சரிபார்க்கப்பட்ட சான்றுகள்',
      jumpToDoc: 'ஆவணத்தில் பார்க்கவும்',
      authorizeAndDispatch: 'நடவடிக்கைகளுக்கு ஒப்புதல் அளித்து அனுப்புக',
      mitigationActions: 'பரிந்துரைக்கப்பட்ட நடவடிக்கைகள்',
      deterministicTraversal: 'நேரடி பகுப்பாய்வு',
      verifiedProvenance: 'சரிபார்க்கப்பட்ட சான்று'
    },
    copilot: {
      title: 'KMRL AI நுண்ணறிவு வழிகாட்டி',
      subtitle: '400+ மெட்ரோ ஒப்பந்தங்கள் மற்றும் பாதுகாப்பு விதிகளை அடிப்படையாகக் கொண்ட உதவியாளர்',
      placeholder: 'ஒப்பந்தங்கள், SOP, நிதி இலக்குகள் பற்றி கேட்கவும்...',
      askQuestion: 'கேள்வியை அனுப்புக',
      groundedIn: 'அதிகாரப்பூர்வ KMRL ஆவணங்களை அடிப்படையாகக் கொண்டது',
      quickPrompts: 'முக்கிய கேள்விகள்',
      citations: 'குறிப்பிடப்பட்ட ஆவணங்கள்',
      verifiedFact: 'சரிபார்க்கப்பட்ட தகவல்'
    },
    settings: {
      title: 'கணினி அமைப்புகள் மற்றும் விருப்பத்தேர்வுகள்',
      subtitle: 'காட்சி அமைப்புகள், மொழி மாற்றம், ஒலி எச்சரிக்கைகள் மற்றும் வழிகாட்டிகளை நிர்வகிக்கவும்.',
      launchTour: 'வழிகாட்டி சுற்றுப்பயணத்தைத் தொடங்கு',
      langSection: 'அரசு மொழி மாற்றம்',
      englishLabel: 'English',
      englishSub: 'நிலையான செயல்பாட்டு மொழி',
      malayalamLabel: 'മലയാളം (Malayalam)',
      malayalamSub: 'அதிகாரப்பூர்வ மாநில மொழி',
      tamilLabel: 'தமிழ் (Tamil)',
      tamilSub: 'தென் பிராந்திய மெட்ரோ',
      kannadaLabel: 'ಕನ್ನಡ (Kannada)',
      kannadaSub: 'பிராந்திய ரயில் தரநிலை',
      soundSection: 'டெலிமெட்ரி ஒலி & அனுப்பல் எச்சரிக்கைகள்',
      soundTitle: 'முக்கிய எச்சரிக்கைகளுக்கான ஒலி எச்சரிக்கை',
      soundDesc: 'டெலிமெட்ரி வரம்பு மீறப்படும் போது ஒலி எச்சரிக்கை எழுப்பும்.',
      officerSection: 'அங்கீகரிக்கப்பட்ட அதிகாரி விவரங்கள்',
      loggedInOfficer: 'உள்நுழைந்த அதிகாரி',
      directorate: 'துறை / பிரிவு',
      operationalRole: 'செயல்பாட்டு நிலை',
      stationId: 'நிலைய ஐடி',
      securityClearance: 'பாதுகாப்பு அனுமதி: Gov-L2'
    },
    analytics: {
      title: 'செயல்பாட்டு & நுண்ணறிவு பகுப்பாய்வு',
      subtitle: 'செயலாக்க நேரம், OCR துல்லியம் மற்றும் துறை வாரியான இணக்க குறியீடுகளை ஆய்வு செய்யவும்.',
      exportDossier: 'பகுப்பாய்வு அறிக்கையை பதிவிறக்கு',
      docsProcessed: 'செயலாக்கப்பட்ட ஆவணங்கள்',
      docsProcessedSub: 'இந்த வாரம் +14 • 0 பிழைகள்',
      avgTime: 'சராசரி செயலாக்க நேரம்',
      avgTimeSub: 'இலக்கை விட 4.2 மணி நேரம் விரைவாக',
      ocrAccuracy: 'OCR துல்லிய நிலை',
      ocrAccuracySub: 'அட்டவணைகள் மற்றும் ஆவணங்களில் சோதிக்கப்பட்டது',
      actionsCompleted: 'நிறைவு செய்யப்பட்ட பணிகள்',
      actionsCompletedSub: '18 ஒப்புதலுக்காக காத்திருக்கின்றன',
      tableTitle: 'துறை வாரியான ஆவணங்கள் மற்றும் செயலாக்க நேரம்',
      tableSub: 'நிகழ்நேர டெலிமெட்ரி அளவீடுகள்',
      colDept: 'துறை',
      colDocs: 'பதிவேற்றப்பட்ட ஆவணங்கள்',
      colTime: 'சராசரி நேரம்',
      colCompliance: 'இணக்க மதிப்பெண்',
      colPending: 'நிலுவையில் உள்ள பணிகள்'
    },
    knowledgeGraph: {
      title: 'நிகழ்நேர அறிவு வரைபடம்',
      subtitle: 'ஒப்பந்தங்கள், SOPகள், டெலிமெட்ரி தரவுகள் மற்றும் நிலைய சொத்துக்களின் நேரடி நெட்வொர்க்.',
      filterNodes: 'வடிகட்டவும்',
      allNodes: 'அனைத்து கூறுகள்',
      docs: 'ஆவணங்கள் & ஒப்பந்தங்கள்',
      facilities: 'நிலையங்கள் & பணிமனைகள்',
      vendors: 'ஒப்பந்ததாரர்கள் & விற்பனையாளர்கள்',
      regulations: 'பாதுகாப்பு விதிகள் & சட்டங்கள்',
      telemetry: 'செயலில் உள்ள எச்சரிக்கைகள் & பணிகள்',
      searchNodes: 'கூறுகளைத் தேடுங்கள்...',
      liveUpdating: 'தொடர்ந்து தரவுத்தளத்துடன் ஒத்திசைக்கப்படுகிறது',
      nodeCount: 'மொத்த வரைபட கூறுகள்',
      edgeCount: 'செயலில் உள்ள இணைப்புகள்',
      nodeDetails: 'கூறு விவரங்கள் & சான்றுகள்',
      connectedTo: 'இணைக்கப்பட்ட செயல்பாட்டு பிரிவுகள்',
      impactSeverity: 'ஆபத்து நிலை',
      provenance: 'மூல ஆவணம்'
    },
    accessControl: {
      restrictedTitle: 'நிர்வாகி அணுகல் கட்டுப்படுத்தப்பட்டுள்ளது',
      restrictedDesc: 'நீங்கள் கள அதிகாரியாக உள்நுழைந்துள்ளீர்கள். கணினி அமைப்புகளை மாற்ற முதன்மை நிர்வாகி அனுமதி தேவை.',
      currentClearance: 'தற்போதைய அனுமதி',
      requiredClearance: 'தேவையான அனுமதி',
      switchPrompt: 'நிர்வாக திறன்களை சோதிக்க முதன்மை நிர்வாகி சுயவிவரத்திற்கு மாறவும்:',
      superAdminRole: 'முதன்மை நிர்வாகிக்கு மாறவும் (ஆனந்த் வர்மா)'
    },
    actions: {
      investigate: 'ஆராய்ந்து பார்',
      viewEvidence: 'சான்றைப் பார்',
      simulateImpact: 'தாக்கத்தை மதிப்பிடு',
      verifyAndSignoff: 'ஒப்புதல் கையொப்பம்',
      acknowledge: 'ஏற்றுக்கொள்',
      escalate: 'உயர் அதிகாரிக்கு அனுப்பு',
      assignTask: 'பணியை ஒதுக்கு',
      openDocument: 'ஆவணத்தைத் திற',
      uploadNew: 'புதிய ஆவணம் பதிவேற்று',
      searchDocs: 'ஆவணங்களைத் தேடு',
      compareVersions: 'பதிப்புகளை ஒப்பிடு',
      exportReport: 'அறிக்கையை பதிவிறக்கு',
      close: 'மூடு',
      filter: 'வடிகட்டு',
      markAsRead: 'படித்ததாகக் குறி',
      approve: 'ஒப்புதல் அளி',
      reject: 'நிராகரி',
      retry: 'மீண்டும் முயற்சி செய்',
      startDemoTour: 'சுற்றுப்பயணத்தைத் தொடங்கு'
    },
    headings: {
      commandCenter: 'கட்டுப்பாட்டு மையம்',
      prioritySummary: 'முக்கிய பட்டியல்',
      requiresAttention: 'கவனம் தேவைப்படுபவை',
      operationalBlastRadius: 'செயல்பாட்டு தாக்க எல்லை',
      emergencyConsole: 'அவசர கட்டுப்பாட்டு பலகை',
      complianceHealth: 'இணக்க நிலை',
      grievanceQueue: 'பயணிகள் புகார் பட்டியல்',
      financialExposure: 'நிதி வெளிப்பாடு',
      canonicalIntelligence: 'ஆவணக் களஞ்சியம்',
      immutableAuditTrail: 'தணிக்கைப் பதிவு',
      aiGovernance: 'AI நிர்வாகம்'
    },
    labels: {
      critical: 'அவசர நிலை',
      highPriority: 'அதி முக்கியத்துவம்',
      dueSoon: '24 மணி நேரத்திற்குள்',
      healthy: 'சரியானது',
      humanVerified: 'சரிபார்க்கப்பட்டது',
      aiFlagged: 'AI அடையாளம் கண்டது',
      pendingReview: 'ஆய்வு நிலுவையில் உள்ளது',
      sourceDocument: 'மூல ஆவணம்',
      page: 'பக்கம்',
      clause: 'விதி',
      confidence: 'நம்பகத்தன்மை',
      department: 'துறை',
      role: 'பதவி',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
      actions: 'செயல்கள்'
    }
  },
  kn: {
    appName: 'KMRL ಇಂಟೆಲಿಡಾಕ್ಸ್',
    subTitle: 'ಕೊಚ್ಚಿ ಮೆಟ್ರೋ ರೈಲ್ ಲಿಮಿಟೆಡ್ • ಕಮಾಂಡ್ & ಕಂಟ್ರೋಲ್',
    tagline: 'ಕಾರ್ಯಾಚರಣೆಯ ಬುದ್ಧಿಮತ್ತೆ ಮತ್ತು ದಾಖಲೆ ನಿರ್ವಹಣಾ ವೇದಿಕೆ',
    searchPlaceholder: 'ದಾಖಲೆಗಳು, ಎಚ್ಚರಿಕೆಗಳು, ಆಡಿಟ್‌ಗಳನ್ನು ಹುಡುಕಿ...',
    commandControl: 'ನಿಯಂತ್ರಣ ಕೇಂದ್ರ',
    govKerala: 'ಕೇರಳ ಸರ್ಕಾರ',
    transitCommandCenter: 'ಸಾರಿಗೆ ನಿಯಂತ್ರಣ ಕೇಂದ್ರ',
    nav: {
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      home: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      emergency: 'ಎಚ್ಚರಿಕೆಗಳು',
      notifications: 'ಸೂಚನೆಗಳು',
      compliance: 'ಅನುಸರಣೆ',
      complaints: 'ದೂರುಗಳು & SLA',
      finance: 'ಹಣಕಾಸು & ಒಪ್ಪಂದಗಳು',
      documents: 'ದಾಖಲೆಗಳು',
      myWork: 'ಕ್ರಮಗಳು',
      intelligence: 'ಬುದ್ಧಿಮತ್ತೆ ಕೇಂದ್ರ',
      copilot: 'AI ಕೋಪೈಲಟ್',
      impactSimulator: 'ಪ್ರಭಾವ ಸಿಮ್ಯುಲೇಟರ್',
      versionCompare: 'ಆವೃತ್ತಿ ವ್ಯತ್ಯಾಸ',
      knowledgeGraph: 'ಜ್ಞಾನ ನಕ್ಷೆ',
      analytics: 'ವಿಶ್ಲೇಷಣೆ & ಮಾಪನಗಳು',
      admin: 'ಮುಖ್ಯ ನಿರ್ವಾಹಕ',
      audit: 'ಆಡಿಟ್ ಟ್ರಯಲ್',
      settings: 'ಸಂಯೋಜನೆಗಳು'
    },
    dashboard: {
      breadcrumb: 'ಕಾರ್ಯಾಚರಣೆ ನಿಯಂತ್ರಣ ಕೊಠಡಿ',
      goodMorning: 'ಕೊಚ್ಚಿ ಮೆಟ್ರೋ ರೈಲು ಕಾರ್ಯಾಚರಣೆ ಕೇಂದ್ರ',
      operationalSubtitle: 'AI ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಬುದ್ಧಿಮತ್ತೆ ವೇದಿಕೆ • ನೈಜ-ಸಮಯದ ದಾಖಲೆ ನಕ್ಷೆ ಸಕ್ರಿಯವಾಗಿದೆ',
      docsProcessedToday: 'ಇಂದು ಸಂಸ್ಕರಿಸಲಾದ ದಾಖಲೆಗಳು',
      vsYesterday: 'ನಿನ್ನೆಗಿಂತ +12% ಹೆಚ್ಚು',
      pendingReview: 'ಪರಿಶೀಲನೆಗೆ ಬಾಕಿ ಇರುವವು',
      criticalAlerts: 'ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳು',
      complianceScore: 'ಅನುಸರಣೆ ಸ್ಕೋರ್',
      priorityQueueTitle: 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ದಾಖಲೆ ಪರಿಶೀಲನಾ ಸರದಿ',
      priorityQueueSubtitle: 'ಅಧಿಕಾರಿಯ ಅನುಮೋದನೆ ಅಗತ್ಯವಿರುವ ಪ್ರಮುಖ ನಿಯಮಗಳು',
      goToInbox: 'ಸಂಪೂರ್ಣ ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      review: 'ಪರಿಶೀಲಿಸಿ ಅನುಮೋದಿಸಿ',
      auditTimelineTitle: 'ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಆಡಿಟ್ ಇತಿಹಾಸ',
      auditTimelineSubtitle: 'ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ರೀತಿಯಲ್ಲಿ ದಾಖಲಾದ ಅಧಿಕಾರಿಗಳ ಕ್ರಮಗಳು',
      activeAlertsTitle: 'ನೈಜ-ಸಮಯದ ಟೆಲಿಮೆಟ್ರಿ ಎಚ್ಚರಿಕೆಗಳು',
      activeAlertsSubtitle: 'ಗುಣಮಟ್ಟದ ಕಾರ್ಯವಿಧಾನಗಳೊಂದಿಗೆ ತಾಳೆ ನೋಡಲಾದ ಎಚ್ಚರಿಕೆಗಳು',
      viewEvidenceSource: 'ಮೂಲ ಸಾಕ್ಷ್ಯವನ್ನು ವೀಕ್ಷಿಸಿ',
      ingestDocument: 'ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      startDemoTour: 'ಮಾರ್ಗದರ್ಶಿ ಪ್ರವಾಸ',
      confidence: 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
      active: 'ಸಕ್ರಿಯ'
    },
    emergency: {
      title: 'ತುರ್ತು ಘಟನಾ ರವಾನೆ & OCC ನಿಯಂತ್ರಣ ಕೊಠಡಿ',
      subtitle: 'ನೈಜ-ಸಮಯದ ಟೆಲಿಮೆಟ್ರಿ ಎಚ್ಚರಿಕೆಗಳು, ಸ್ವಯಂಚಾಲಿತ SOP ಸಾಕ್ಷ್ಯಗಳು ಮತ್ತು ಅಧಿಕಾರಿಯ ಅನುಮೋದನೆ',
      slaRemaining: 'SLA ಬಾಕಿ ಇದೆ',
      groundedSopEvidence: 'ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಪುರಾವೆಗಳು & ಗುಣಮಟ್ಟದ ಕಾರ್ಯವಿಧಾನಗಳು (SOP)',
      escalate: 'ಸುರಕ್ಷತಾ ನಿರ್ದೇಶಕರಿಗೆ ಕಳುಹಿಸಿ',
      acknowledge: 'ಸ್ವೀಕರಿಸಿ',
      activeIncidents: 'ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು',
      location: 'ಸ್ಥಳ',
      assignedOfficer: 'ನಿಯೋಜಿತ ಅಧಿಕಾರಿ'
    },
    audit: {
      title: 'KMRL ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಅನುಸರಣೆ & ಆಡಿಟ್ ಟ್ರಯಲ್',
      subtitle: 'ದಾಖಲೆಗಳ ವಿಶ್ಲೇಷಣೆ, ಅಧಿಕಾರಿಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ರವಾನೆ ಸಹಿಗಳ ಬದಲಾಗದ ಇತಿಹಾಸ.',
      exportDossier: 'ಅನುಸರಣೆ ವರದಿ ಡೌನ್‌ಲೋಡ್ (JSON / CSV)',
      ledgerEntries: 'ದಾಖಲಾದ ಲೆಡ್ಜರ್ ನಮೂದುಗಳು',
      timestamp: 'ಸಮಯ ಮತ್ತು ಬ್ಲಾಕ್ ಹ್ಯಾಶ್',
      actionAndEvent: 'ಕ್ರಮ ಮತ್ತು ಘಟನೆ',
      officer: 'ಅಧಿಕಾರಿ ಅನುಮತಿ & ಬಳಕೆದಾರರ ID',
      targetDoc: 'ಗುರಿ ದಾಖಲೆ / ಘಟಕ',
      contextHash: 'ಸಂದರ್ಭ ಹ್ಯಾಶ್ & ಸಾಕ್ಷ್ಯ ಸರಪಳಿ'
    },
    simulator: {
      title: 'ಪರಿಣಾಮ ಸಿಮ್ಯುಲೇಟರ್',
      badge: 'ಕಾರ್ಯಾಚರಣೆಯ ಪ್ರಭಾವದ ವ್ಯಾಪ್ತಿ',
      desc: 'ಒಪ್ಪಂದಗಳು, ಸುರಕ್ಷತಾ ನಿಯಮಗಳು ಮತ್ತು ಕಾರ್ಯಾದೇಶಗಳಲ್ಲಿನ ಬದಲಾವಣೆಗಳ ನೇರ ಪ್ರಭಾವದ ನಕ್ಷೆ.',
      pendingSignoff: 'ಅಧಿಕಾರಿಯ ಸಹಿಗಾಗಿ ಕಾಯುತ್ತಿದೆ',
      signedOff: 'ಅಧಿಕಾರಿಯಿಂದ ಅನುಮೋದಿಸಲಾಗಿದೆ',
      triggeringChange: 'ಬದಲಾವಣೆಗೆ ಕಾರಣವಾದ ದಾಖಲೆ',
      financialExposure: 'ಹಣಕಾಸಿನ ಹೊಣೆಗಾರಿಕೆ',
      downstreamNodes: 'ಸಂಬಂಧಿತ ಇತರ ವಿಭಾಗಗಳು',
      affectedDept: 'ಬಾಧಿತ ಇಲಾಖೆಗಳು',
      graphTitle: 'ಕಾರ್ಯಾಚರಣೆಯ ಪ್ರಭಾವದ ನಕ್ಷೆ',
      graphSubtitle: 'ಕೊಚ್ಚಿ ಮೆಟ್ರೋ ಕಾರ್ಯಾಚರಣೆಯ ಮೇಲಿನ ನೇರ ಪರಿಣಾಮಗಳ ವಿಶ್ಲೇಷಣೆ',
      provenanceTitle: 'ದೃಢೀಕರಿಸಿದ ಸಾಕ್ಷ್ಯಗಳು',
      jumpToDoc: 'ದಾಖಲೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ',
      authorizeAndDispatch: 'ಕ್ರಮಗಳನ್ನು ಅನುಮೋದಿಸಿ ರವಾನಿಸಿ',
      mitigationActions: 'ಶಿಫಾರಸು ಮಾಡಿದ ಪರಿಹಾರ ಕ್ರಮಗಳು',
      deterministicTraversal: 'ನೇರ ವಿಶ್ಲೇಷಣೆ',
      verifiedProvenance: 'ದೃಢೀಕರಿಸಿದ ಮೂಲ'
    },
    copilot: {
      title: 'KMRL AI ಬುದ್ಧಿಮತ್ತೆ ಸಹಾಯಕ',
      subtitle: '400+ ಮೆಟ್ರೋ ಒಪ್ಪಂದಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಆಧರಿಸಿದ ಸಹಾಯಕ',
      placeholder: 'ಒಪ್ಪಂದಗಳು, SOP ಗಳು, ಹಣಕಾಸು ಮೈಲಿಗಲ್ಲುಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ...',
      askQuestion: 'ಪ್ರಶ್ನೆ ಕಳುಹಿಸಿ',
      groundedIn: 'ಅಧಿಕೃತ KMRL ದಾಖಲೆಗಳನ್ನು ಆಧರಿಸಿದೆ',
      quickPrompts: 'ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳು',
      citations: 'ಉಲ್ಲೇಖಿತ ದಾಖಲೆಗಳು',
      verifiedFact: 'ದೃಢೀಕರಿಸಿದ ಮಾಹಿತಿ'
    },
    settings: {
      title: 'ಸಿಸ್ಟಮ್ ಆದ್ಯತೆಗಳು ಮತ್ತು ಸಂಯೋಜನೆಗಳು',
      subtitle: 'ಪ್ರದರ್ಶನ ಸೆಟ್ಟಿಂಗ್‌ಗಳು, ಭಾಷಾ ಆಯ್ಕೆ, ಧ್ವನಿ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಪ್ರವಾಸಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
      launchTour: 'ಮಾರ್ಗದರ್ಶಿ ಪ್ರವಾಸ ಪ್ರಾರಂಭಿಸಿ',
      langSection: 'ಸರ್ಕಾರಿ ಭಾಷಾ ಆಯ್ಕೆ',
      englishLabel: 'English',
      englishSub: 'ಪ್ರಮಾಣಿತ ಕಾರ್ಯಾಚರಣೆ ಭಾಷೆ',
      malayalamLabel: 'മലയാളം (Malayalam)',
      malayalamSub: 'ಅಧಿಕೃತ ರಾಜ್ಯ ಭಾಷೆ',
      tamilLabel: 'தமிழ் (Tamil)',
      tamilSub: 'ದಕ್ಷಿಣ ಪ್ರಾದೇಶಿಕ ಮೆಟ್ರೋ',
      kannadaLabel: 'ಕನ್ನಡ (Kannada)',
      kannadaSub: 'ಪ್ರಾದೇಶಿಕ ರೈಲ್ವೆ ಮಾನದಂಡ',
      soundSection: 'ಟೆಲಿಮೆಟ್ರಿ ಧ್ವನಿ & ರವಾನೆ ಎಚ್ಚರಿಕೆಗಳು',
      soundTitle: 'ಹಂತ-1 ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳಿಗೆ ಆಡಿಯೋ ಅಲಾರಂ',
      soundDesc: 'ಟೆಲಿಮೆಟ್ರಿ ಮಿತಿ ಮೀರಿದಾಗ ಧ್ವನಿ ಎಚ್ಚರಿಕೆಯನ್ನು ನೀಡುತ್ತದೆ.',
      officerSection: 'ದೃಢೀಕೃತ ಅಧಿಕಾರಿ ವಿವರಗಳು',
      loggedInOfficer: 'ಲಾಗಿನ್ ಆದ ಅಧಿಕಾರಿ',
      directorate: 'ನಿರ್ದೇಶನಾಲಯ / ವಿಭಾಗ',
      operationalRole: 'ಕಾರ್ಯಾಚರಣೆಯ ಪಾತ್ರ',
      stationId: 'ನಿಲ್ದಾಣ ID',
      securityClearance: 'ಭದ್ರತಾ ಅನುಮತಿ: Gov-L2'
    },
    analytics: {
      title: 'ಕಾರ್ಯಾಚರಣೆ & ಬುದ್ಧಿಮತ್ತೆ ವಿಶ್ಲೇಷಣೆ',
      subtitle: 'ಸಂಸ್ಕರಣಾ ಸಮಯ, OCR ನಿಖರತೆ ಮತ್ತು ಇಲಾಖಾವಾರು ಅನುಸರಣೆ ಸೂಚ್ಯಂಕಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
      exportDossier: 'ವಿಶ್ಲೇಷಣಾ ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
      docsProcessed: 'ಸಂಸ್ಕರಿಸಿದ ದಾಖಲೆಗಳು',
      docsProcessedSub: 'ಈ ವಾರ +14 • 0 ದೋಷಗಳು',
      avgTime: 'ಸರಾಸರಿ ಸಂಸ್ಕರಣಾ ಸಮಯ',
      avgTimeSub: 'ಗುರಿಗಿಂತ 4.2 ಗಂಟೆ ವೇಗವಾಗಿ',
      ocrAccuracy: 'OCR ನಿಖರತೆ',
      ocrAccuracySub: 'ಕೋಷ್ಟಕಗಳು ಮತ್ತು ಸ್ಕ್ಯಾನ್‌ಗಳಲ್ಲಿ ಪರೀಕ್ಷಿಸಲಾಗಿದೆ',
      actionsCompleted: 'ಪೂರ್ಣಗೊಂಡ ಕ್ರಮಗಳು',
      actionsCompletedSub: '18 ಅಧಿಕಾರಿಗಳ ಅನುಮೋದನೆಗೆ ಬಾಕಿ ಇವೆ',
      tableTitle: 'ಇಲಾಖಾವಾರು ದಾಖಲೆಗಳು ಮತ್ತು ಸಂಸ್ಕರಣಾ ಸಮಯ',
      tableSub: 'ನೈಜ-ಸಮಯದ ಟೆಲಿಮೆಟ್ರಿ ಮಾಪನಗಳು',
      colDept: 'ಇಲಾಖೆ',
      colDocs: 'ದಾಖಲೆಗಳ ಸಂಖ್ಯೆ',
      colTime: 'ಸರಾಸರಿ ಸಮಯ',
      colCompliance: 'ಅನುಸರಣೆ ಸ್ಕೋರ್',
      colPending: 'ಬಾಕಿ ಇರುವ ಕ್ರಮಗಳು'
    },
    knowledgeGraph: {
      title: 'ನಿರಂತರವಾಗಿ ನವೀಕರಿಸಲಾಗುವ ಜ್ಞಾನ ನಕ್ಷೆ',
      subtitle: 'ಒಪ್ಪಂದಗಳು, SOP ಗಳು, ಟೆಲಿಮೆಟ್ರಿ ಮತ್ತು ನಿಲ್ದಾಣದ ಆಸ್ತಿಗಳ ನೈಜ-ಸಮಯದ ನೆಟ್‌ವರ್ಕ್.',
      filterNodes: 'ಫಿಲ್ಟರ್ ಮಾಡಿ',
      allNodes: 'ಎಲ್ಲಾ ಘಟಕಗಳು',
      docs: 'ದಾಖಲೆಗಳು & ಒಪ್ಪಂದಗಳು',
      facilities: 'ನಿಲ್ದಾಣಗಳು & ಡಿಪೋಗಳು',
      vendors: 'ಗುತ್ತಿಗೆದಾರರು & ಪೂರೈಕೆದಾರರು',
      regulations: 'ಸುರಕ್ಷತಾ ನಿಯಮಗಳು & ಕಾನೂನುಗಳು',
      telemetry: 'ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು & ಕಾರ್ಯಗಳು',
      searchNodes: 'ಘಟಕಗಳನ್ನು ಹುಡುಕಿ...',
      liveUpdating: 'ಡೇಟಾಬಸ್‌ನೊಂದಿಗೆ ನಿರಂತರವಾಗಿ ಸಿಂಕ್ ಆಗುತ್ತಿದೆ',
      nodeCount: 'ಒಟ್ಟು ನಕ್ಷೆಯ ಘಟಕಗಳು',
      edgeCount: 'ಸಕ್ರಿಯ ಸಂಬಂಧಗಳು',
      nodeDetails: 'ಘಟಕ ವಿವರಗಳು & ಸಾಕ್ಷ್ಯಗಳು',
      connectedTo: 'ಸಂಪರ್ಕಿತ ಕಾರ್ಯಾಚರಣಾ ಘಟಕಗಳು',
      impactSeverity: 'ಅಪಾಯದ ಮಟ್ಟ',
      provenance: 'ಮೂಲ ದಾಖಲೆ'
    },
    accessControl: {
      restrictedTitle: 'ನಿರ್ವಾಹಕ ಪ್ರವೇಶವನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ',
      restrictedDesc: 'ನೀವು ಕಾರ್ಯಾಚರಣಾ ಅಧಿಕಾರಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ. ಸಿಸ್ಟಮ್ ಬದಲಾವಣೆಗಳಿಗೆ ಮುಖ್ಯ ನಿರ್ವಾಹಕ ಅನುಮತಿ ಅಗತ್ಯವಿದೆ.',
      currentClearance: 'ಪ್ರಸ್ತುತ ಅನುಮತಿ',
      requiredClearance: 'ಅಗತ್ಯವಿರುವ ಅನುಮತಿ',
      switchPrompt: 'ನಿರ್ವಾಹಕ ಸೌಲಭ್ಯಗಳನ್ನು ಪರೀಕ್ಷಿಸಲು ಮುಖ್ಯ ನಿರ್ವಾಹಕ ಪ್ರೊಫೈಲ್‌ಗೆ ಬದಲಾಯಿಸಿ:',
      superAdminRole: 'ಮುಖ್ಯ ನಿರ್ವಾಹಕರಿಗೆ ಬದಲಾಯಿಸಿ (ಆನಂದ್ ವರ್ಮಾ)'
    },
    actions: {
      investigate: 'ತನಿಖೆ ನಡೆಸಿ',
      viewEvidence: 'ಸಾಕ್ಷ್ಯ ವೀಕ್ಷಿಸಿ',
      simulateImpact: 'ಪ್ರಭಾವವನ್ನು ಪರಿಶೀಲಿಸಿ',
      verifyAndSignoff: 'ಅನುಮೋದನೆ ಸಹಿ',
      acknowledge: 'ಸ್ವೀಕರಿಸಿ',
      escalate: 'ಮೇಲಧಿಕಾರಿಗೆ ಕಳುಹಿಸಿ',
      assignTask: 'ಕಾರ್ಯವನ್ನು ನಿಯೋಜಿಸಿ',
      openDocument: 'ದಾಖಲೆಯನ್ನು ತೆರೆಯಿರಿ',
      uploadNew: 'ಹೊಸ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್',
      searchDocs: 'ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಿ',
      compareVersions: 'ಆವೃತ್ತಿಗಳನ್ನು ಹೋಲಿಸಿ',
      exportReport: 'ವರದಿ ಡೌನ್‌ಲೋಡ್',
      close: 'ಮುಚ್ಚಿ',
      filter: 'ಫಿಲ್ಟರ್',
      markAsRead: 'ಓದಿದ್ದೆಂದು ಗುರುತಿಸಿ',
      approve: 'ಅನುಮೋದಿಸಿ',
      reject: 'ತಿರಸ್ಕರಿಸಿ',
      retry: 'ಮರುಪ್ರಯತ್ನಿಸಿ',
      startDemoTour: 'ಪ್ರವಾಸ ಪ್ರಾರಂಭಿಸಿ'
    },
    headings: {
      commandCenter: 'ನಿಯಂತ್ರಣ ಕೇಂದ್ರ',
      prioritySummary: 'ಆದ್ಯತಾ ಪಟ್ಟಿ',
      requiresAttention: 'ಗಮನ ಅಗತ್ಯವಿರುವವು',
      operationalBlastRadius: 'ಕಾರ್ಯಾಚರಣೆಯ ಪ್ರಭಾವದ ವ್ಯಾಪ್ತಿ',
      emergencyConsole: 'ತುರ್ತು ನಿಯಂತ್ರಣ ಫಲಕ',
      complianceHealth: 'ಅನುಸರಣೆ ಸ್ಥಿತಿ',
      grievanceQueue: 'ಪ್ರಯಾಣಿಕರ ದೂರುಗಳ ಪಟ್ಟಿ',
      financialExposure: 'ಹಣಕಾಸಿನ ಹೊಣೆಗಾರಿಕೆ',
      canonicalIntelligence: 'ದಾಖಲೆಗಳ ಭಂಡಾರ',
      immutableAuditTrail: 'ಆಡಿಟ್ ಇತಿಹಾಸ',
      aiGovernance: 'AI ಆಡಳಿತ'
    },
    labels: {
      critical: 'ತುರ್ತು ಎಚ್ಚರಿಕೆ',
      highPriority: 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆ',
      dueSoon: '24 ಗಂಟೆಗಳಲ್ಲಿ ಬಾಕಿ',
      healthy: 'ಉತ್ತಮವಾಗಿದೆ',
      humanVerified: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ',
      aiFlagged: 'AI ಗುರುತಿಸಿದೆ',
      pendingReview: 'ಪರಿಶೀಲನೆ ಬಾಕಿ ಇದೆ',
      sourceDocument: 'ಮೂಲ ದಾಖಲೆ',
      page: 'ಪುಟ',
      clause: 'ನಿಯಮ',
      confidence: 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
      department: 'ಇಲಾಖೆ',
      role: 'ಹುದ್ದೆ',
      lastUpdated: 'ಕೊನೆಯ ನವೀಕರಣ',
      actions: 'ಕ್ರಮಗಳು'
    }
  }
};
