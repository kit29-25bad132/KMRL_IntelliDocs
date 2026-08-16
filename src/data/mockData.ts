import {
  UserProfile,
  KMRLDocument,
  ImpactSimulation,
  OperationalIncident,
  ComplianceItem,
  ComplaintTicket,
  OperationalTask,
  AuditLogEntry,
  NotificationItem
} from '../types';

export const currentUser: UserProfile = {
  id: 'usr-001',
  name: 'Harish Kumar',
  employeeId: 'KMRL-ENG-4029',
  email: 'harish.kumar@kochimetro.gov.in',
  role: 'Chief_Operations_Officer',
  department: 'Operations',
  avatarUrl: '',
  lastLogin: 'Today at 09:42 IST',
  permissions: ['DOC_READ', 'DOC_WRITE', 'SIMULATE_IMPACT', 'VERIFY_ACTIONS', 'EMERGENCY_DISPATCH', 'AUDIT_VIEW']
};

export const sampleUsers: UserProfile[] = [
  currentUser,
  {
    id: 'usr-005',
    name: 'Sreedharan Pillai',
    employeeId: 'KMRL-ADM-0001',
    email: 'sreedharan.pillai@kochimetro.gov.in',
    role: 'Super_Admin',
    department: 'Administration',
    lastLogin: 'Today at 07:15 IST',
    permissions: ['ALL', 'SYSTEM_ADMIN', 'SUPER_ADMIN_SECURITY', 'MODEL_ROUTING', 'USER_MANAGEMENT', 'AUDIT_MASTER']
  },
  {
    id: 'usr-002',
    name: 'Vipin Nayar',
    employeeId: 'KMRL-SAF-1102',
    email: 'vipin.nayar@kochimetro.gov.in',
    role: 'Safety_Inspector',
    department: 'Safety & Quality',
    lastLogin: 'Today at 08:30 IST',
    permissions: ['DOC_READ', 'SAFETY_AUDIT', 'EMERGENCY_DISPATCH']
  },
  {
    id: 'usr-003',
    name: 'Anjali Ramesh',
    employeeId: 'KMRL-FIN-3021',
    email: 'anjali.ramesh@kochimetro.gov.in',
    role: 'Finance_Manager',
    department: 'Finance',
    lastLogin: 'Yesterday at 17:15 IST',
    permissions: ['DOC_READ', 'FIN_APPROVE', 'PAYMENT_RELEASE']
  },
  {
    id: 'usr-004',
    name: 'Manoj Nair',
    employeeId: 'KMRL-CIV-8012',
    email: 'manoj.nair@kochimetro.gov.in',
    role: 'Engineering_Lead',
    department: 'Engineering',
    lastLogin: 'Today at 09:10 IST',
    permissions: ['DOC_READ', 'DOC_WRITE', 'WORK_ORDER_SIGN']
  }
];

export const mockDocuments: KMRLDocument[] = [
  {
    id: 'KMRL-CNT-2026-104',
    metadata: {
      docId: 'KMRL-CNT-2026-104',
      docNumber: 'KMRL/PROC/2026/104-REV2',
      title: 'Traction Substation Maintenance & Overhaul SLA',
      category: 'Contract',
      department: 'Engineering',
      version: 'v2.1',
      previousVersionId: 'KMRL-CNT-2026-104-V1',
      status: 'Action_Required',
      uploadDate: '2026-08-15',
      effectiveDate: '2026-08-01',
      expiryDate: '2027-07-31',
      fileSize: '4.8 MB',
      pages: 24,
      ocrConfidence: 99.4,
      conflictsDetected: 1,
      risksDetected: 2,
      extractedEntities: {
        vendors: ['Apex Rail Tech Infra Ltd.', 'Kerala Power Trans Corp'],
        locations: ['Aluva Substation', 'Edappally Traction Node', 'Muttom Depot'],
        monetaryValues: ['₹82,00,000 (Milestone 3)', '₹3,40,00,000 (Total)'],
        deadlines: ['45 calendar days for overhaul', '15 days mobilization'],
        regulations: ['Metro Railways Act 2002', 'CERC High Voltage Grid Code']
      },
      provenance: {
        uploadedBy: 'Procurement Cell (S. Balakrishnan)',
        processingTimeMs: 1420,
        sha256: '9f8e21a88b7c4d3e0129bcfe841299bb8401aa881249b6d80112fa5721ee90ac',
        storagePath: 'kmrl-vault/contracts/2026/104-rev2.pdf'
      }
    },
    summary: 'Comprehensive maintenance agreement for 25kV AC traction transformers, gas-insulated switchgears (GIS), and auxiliary substations across Line 1 corridor. Amended clause 4.2 extends delivery window from 30 to 45 days.',
    rawTextPreview: `GOVERNMENT OF KERALA\nKOCHI METRO RAIL LIMITED\nCONTRACT KMRL/PROC/2026/104-REV2\nSERVICE LEVEL AGREEMENT FOR TRACTION POWER OVERHAUL\n...\nClause 4.2 (Amended): Delivery & Commissioning Schedule. The Contractor (Apex Rail Tech Infra) shall complete scheduled diagnostic overhaul and component replacement within 45 (Forty Five) calendar days from receipt of Site Possession Notice (previously 30 calendar days). Any unapproved overrun shall invoke liquidated damages under Clause 11.1 at 0.5% per week.\n...\nClause 7.3: Milestone Payment Terms. Milestone 3 (₹82,00,000 INR) is contingent upon successful dual-transformer dry dielectric test sign-off by Chief Electrical Inspector.`,
    clauses: [
      {
        id: 'c-104-1',
        clauseNumber: 'Clause 4.2',
        title: 'Overhaul Turnaround Schedule (Amended)',
        content: 'The Contractor shall complete scheduled diagnostic overhaul and component replacement within 45 (Forty Five) calendar days from receipt of Site Possession Notice. (Amended from original 30 calendar days).',
        page: 8,
        isModified: true,
        previousContent: 'The Contractor shall complete scheduled diagnostic overhaul and component replacement within 30 (Thirty) calendar days from receipt of Site Possession Notice.',
        severity: 'critical',
        riskNote: '15-day extension triggers conflict with Phase-2 Electrification Commissioning deadline and delays 2 dependent work orders.',
        highlightCategory: 'deadline'
      },
      {
        id: 'c-104-2',
        clauseNumber: 'Clause 7.3',
        title: 'Milestone 3 Disbursement Terms',
        content: 'Payment of Milestone 3 representing ₹82,00,000 INR shall be released upon submission of dual-transformer dielectric test report and Chief Safety Officer sign-off.',
        page: 14,
        isModified: false,
        severity: 'high',
        riskNote: 'Payment scheduled for release on Aug 28 shifts to Sept 12 due to Clause 4.2 schedule variation.',
        highlightCategory: 'financial'
      },
      {
        id: 'c-104-3',
        clauseNumber: 'Clause 11.1',
        title: 'Liquidated Damages & Penalties',
        content: 'Liquidated damages shall apply at 0.5% of the total contract value per week of delay beyond the approved 45-day window, capped at 10% maximum.',
        page: 19,
        isModified: false,
        severity: 'medium',
        highlightCategory: 'obligation'
      }
    ],
    relatedDocIds: ['KMRL-WO-2026-782', 'KMRL-WO-2026-810', 'KMRL-SOP-SIG-09'],
    actionsPending: 2,
    verificationStatus: 'Pending_Review'
  },
  {
    id: 'KMRL-SOP-SIG-09',
    metadata: {
      docId: 'KMRL-SOP-SIG-09',
      docNumber: 'KMRL/SOP/OPS/2026-09',
      title: 'Kerala Metro Track & Aluva Corridor Signal Protocols',
      category: 'SOP',
      department: 'Signaling & Telecom',
      version: 'v4.0',
      status: 'Indexed',
      uploadDate: '2026-07-20',
      effectiveDate: '2026-07-25',
      fileSize: '3.2 MB',
      pages: 18,
      ocrConfidence: 99.8,
      conflictsDetected: 0,
      risksDetected: 1,
      extractedEntities: {
        locations: ['Aluva Terminal', 'Kalamassery Cross-over', 'Muttom Signal Control Room'],
        regulations: ['RDSO Metro Signaling Standards 2024', 'IEEE 1474 CBTC']
      },
      provenance: {
        uploadedBy: 'Signaling Directorate (K. Venkitesh)',
        processingTimeMs: 980,
        sha256: '7b20ac45ef901239aa801823bb004123561aae901bc09918234ea7162900fa11',
        storagePath: 'kmrl-vault/sops/2026/sop-sig-09.pdf'
      }
    },
    summary: 'Standard Operating Procedure governing Communications-Based Train Control (CBTC), axle counter redundancy, and fallback optical communication channels along the Aluva-Pettah corridor.',
    rawTextPreview: `KMRL SIGNALS & TELECOM DIRECTORY\nSOP/OPS/2026-09: SIGNAL LATENCY & INTERLOCKING CONTROLS\n...\nSection 3.1: Permissible Telemetry Latency. All primary signal telemetry packet latency shall not exceed 40 milliseconds. In case latency exceeds 40ms for 3 consecutive polling cycles, the automatic switchover to redundant dark-fiber channel #2 must be executed within 120 seconds.`,
    clauses: [
      {
        id: 'c-sig-1',
        clauseNumber: 'Section 3.1',
        title: 'Telemetry Latency & Redundancy Threshold',
        content: 'All primary signal telemetry packet latency shall not exceed 40ms. If latency exceeds 40ms for 3 cycles, automatic switchover to redundant channel #2 must execute within 120s.',
        page: 4,
        severity: 'critical',
        riskNote: 'Live telemetry telemetry at Aluva is currently at 48ms.',
        highlightCategory: 'safety'
      }
    ],
    relatedDocIds: ['KMRL-SOP-SAF-02', 'KMRL-CNT-2026-104'],
    actionsPending: 1,
    verificationStatus: 'Human_Verified'
  },
  {
    id: 'KMRL-SOP-SAF-02',
    metadata: {
      docId: 'KMRL-SOP-SAF-02',
      docNumber: 'KMRL/SAF/2026/02-CMRS',
      title: 'National Metro Rail Safety Code 2026 Amendments',
      category: 'Safety Code',
      department: 'Safety & Quality',
      version: 'v1.0',
      status: 'Verified',
      uploadDate: '2026-06-10',
      effectiveDate: '2026-07-01',
      fileSize: '5.1 MB',
      pages: 42,
      ocrConfidence: 99.1,
      conflictsDetected: 0,
      risksDetected: 0,
      extractedEntities: {
        regulations: ['CMRS Guidelines for Metro Passenger Evacuation', 'NFPA 130']
      },
      provenance: {
        uploadedBy: 'Safety Officer (Vipin Nayar)',
        processingTimeMs: 1650,
        sha256: '4190faabb71289eeac102934bb6189a00912cbfae719001823abce1287661029',
        storagePath: 'kmrl-vault/safety/code-2026-amendments.pdf'
      }
    },
    summary: 'Comprehensive mandatory safety guidelines issued by Commissioner of Metro Railway Safety (CMRS) regarding track clearance, fire retardancy ratings, and evacuation walk-way lighting.',
    rawTextPreview: `MINISTRY OF HOUSING & URBAN AFFAIRS\nCMRS SAFETY MANDATES 2026\nMandatory compliance for all underground and elevated metro networks in India...`,
    clauses: [
      {
        id: 'c-saf-1',
        clauseNumber: 'Chapter 4, Rule 12',
        title: 'Substation Fire Suppression Clearance',
        content: 'All indoor 25kV traction substations must be equipped with nitrogen injection fire prevention system with bi-monthly pressure calibration certification.',
        page: 12,
        severity: 'high',
        highlightCategory: 'safety'
      }
    ],
    relatedDocIds: ['KMRL-CNT-2026-104'],
    actionsPending: 0,
    verificationStatus: 'Human_Verified'
  },
  {
    id: 'KMRL-WO-2026-782',
    metadata: {
      docId: 'KMRL-WO-2026-782',
      docNumber: 'KMRL/ENG/WO/782-2026',
      title: 'Work Order: Aluva Depot Transformer Overhaul & GIS Inspection',
      category: 'Work Order',
      department: 'Engineering',
      version: 'v1.0',
      status: 'Action_Required',
      uploadDate: '2026-08-05',
      effectiveDate: '2026-08-10',
      expiryDate: '2026-09-10',
      fileSize: '1.9 MB',
      pages: 6,
      ocrConfidence: 98.9,
      conflictsDetected: 1,
      risksDetected: 1,
      extractedEntities: {
        vendors: ['Apex Rail Tech Infra Ltd.'],
        locations: ['Aluva Traction Substation Bay 2'],
        monetaryValues: ['₹38,50,000']
      },
      provenance: {
        uploadedBy: 'Dy. Chief Engineer (Manoj Nair)',
        processingTimeMs: 640,
        sha256: '9901aa8812cbfe01923bb6189a00912cbfae719001823abce1287661029aa88b',
        storagePath: 'kmrl-vault/work-orders/wo-782.pdf'
      }
    },
    summary: 'Execution work order issued under Contract KMRL-CNT-2026-104 for transformer overhaul at Aluva depot. Completion target was indexed to 30-day master contract schedule.',
    rawTextPreview: `KMRL ENGINEERING DIVISION\nWORK ORDER REF: WO/782-2026\nTarget Completion Date: 30 days from Aug 10 (Target: Sept 09, 2026).\nNote: Directly tied to Contract KMRL/PROC/2026/104 Master SLA.`,
    clauses: [
      {
        id: 'c-wo-1',
        clauseNumber: 'Section 2.0',
        title: 'Target Operational Window',
        content: 'Work shall conclude within 30 days of mobilization to avoid overlap with festive passenger surge on Line 1.',
        page: 2,
        severity: 'high',
        isModified: false,
        riskNote: 'Directly impacted by Master Contract Clause 4.2 revision.',
        highlightCategory: 'deadline'
      }
    ],
    relatedDocIds: ['KMRL-CNT-2026-104'],
    actionsPending: 1,
    verificationStatus: 'AI_Flagged'
  },
  {
    id: 'KMRL-TEN-2026-319',
    metadata: {
      docId: 'KMRL-TEN-2026-319',
      docNumber: 'KMRL/PROC/TEN/319-2026',
      title: 'Global Tender for Automated Fare Collection (AFC) QR & NCMC Readers',
      category: 'Tender',
      department: 'Procurement',
      version: 'v1.2',
      status: 'Indexed',
      uploadDate: '2026-08-01',
      effectiveDate: '2026-08-01',
      expiryDate: '2026-09-30',
      fileSize: '6.4 MB',
      pages: 58,
      ocrConfidence: 99.6,
      conflictsDetected: 0,
      risksDetected: 1,
      extractedEntities: {
        monetaryValues: ['₹12,40,00,000 (Estimated Tender Value)'],
        regulations: ['Public Procurement (Preference to Make in India) Order 2017']
      },
      provenance: {
        uploadedBy: 'Procurement Manager (Anjali Ramesh)',
        processingTimeMs: 1820,
        sha256: '5561aae901bc09918234ea7162900fa114190faabb71289eeac102934bb6189a0',
        storagePath: 'kmrl-vault/tenders/tender-319.pdf'
      }
    },
    summary: 'RFP for procurement and 5-year maintenance of 120 National Common Mobility Card (NCMC) compliant turnstiles across Phase 1 and Phase 2 stations.',
    rawTextPreview: `KMRL TENDER NOTIFICATION\nBID SUBMISSION DEADLINE: 15-SEPT-2026 15:00 HRS IST\nTechnical qualifications require ISO 9001 and EMVCo Level 3 Certification...`,
    clauses: [
      {
        id: 'c-ten-1',
        clauseNumber: 'Section 4.1',
        title: 'Make in India Local Content Compliance',
        content: 'Bidders must demonstrate minimum 50% Class-1 Local Supplier content with statutory auditor certificate.',
        page: 15,
        severity: 'medium',
        highlightCategory: 'obligation'
      }
    ],
    relatedDocIds: [],
    actionsPending: 0,
    verificationStatus: 'Human_Verified'
  }
];

// Flagship Change Impact Simulation Model
export const flagshipImpactSimulation: ImpactSimulation = {
  id: 'SIM-KMRL-2026-104',
  title: 'Contract 104 Delivery Extension Impact Analysis',
  sourceDocId: 'KMRL-CNT-2026-104',
  sourceDocTitle: 'Traction Substation Maintenance & Overhaul SLA',
  sourceVersion: 'v1.0',
  targetVersion: 'v2.1',
  changeSummary: 'Clause 4.2 Overhaul Schedule amended from 30 calendar days to 45 calendar days (+15 day duration overrun).',
  detectedAt: '2026-08-16 09:15 IST',
  overallRisk: 'critical',
  financialExposure: '₹82,00,000 (Milestone 3 Disbursal Shifted)',
  scheduleDelayEstimate: '+15 Calendar Days',
  affectedDepartments: ['Engineering', 'Finance', 'Operations', 'Safety & Quality'],
  nodes: [
    {
      id: 'node-change',
      type: 'change',
      label: 'Clause 4.2 Amended',
      sublabel: '30 Days → 45 Days Overhaul',
      department: 'Engineering',
      severity: 'critical',
      evidenceRef: {
        docId: 'KMRL-CNT-2026-104',
        docTitle: 'Traction Substation Maintenance SLA (v2.1)',
        page: 8,
        clause: 'Clause 4.2'
      },
      metrics: '+15 Days Shift',
      status: 'affected'
    },
    {
      id: 'node-contract',
      type: 'contract',
      label: 'Contract KMRL-104',
      sublabel: 'Apex Rail Tech Infra Ltd.',
      department: 'Engineering',
      severity: 'high',
      evidenceRef: {
        docId: 'KMRL-CNT-2026-104',
        docTitle: 'Traction Substation Maintenance SLA',
        page: 1,
        clause: 'Title Preamble'
      },
      metrics: '₹3.40 Cr Value',
      status: 'affected'
    },
    {
      id: 'node-wo1',
      type: 'work_order',
      label: 'Work Order WO-782',
      sublabel: 'Aluva Depot Transformer Overhaul',
      department: 'Engineering',
      severity: 'critical',
      evidenceRef: {
        docId: 'KMRL-WO-2026-782',
        docTitle: 'WO-782 Execution Schedule',
        page: 2,
        clause: 'Section 2.0'
      },
      metrics: 'Due: Sept 25 (Was Sept 10)',
      status: 'at_risk'
    },
    {
      id: 'node-wo2',
      type: 'work_order',
      label: 'Work Order WO-810',
      sublabel: 'Edappally Traction High-Voltage Switching',
      department: 'Engineering',
      severity: 'high',
      evidenceRef: {
        docId: 'KMRL-CNT-2026-104',
        docTitle: 'Traction Substation Maintenance SLA',
        page: 11,
        clause: 'Schedule B'
      },
      metrics: 'Blocked by WO-782',
      status: 'at_risk'
    },
    {
      id: 'node-vendor',
      type: 'vendor',
      label: 'Vendor Mobilization',
      sublabel: 'Apex Rail Tech Field Crew',
      department: 'Procurement',
      severity: 'medium',
      evidenceRef: {
        docId: 'KMRL-CNT-2026-104',
        docTitle: 'Traction Substation Maintenance SLA',
        page: 19,
        clause: 'Clause 11.1'
      },
      metrics: 'LD Clause 11.1 Active',
      status: 'affected'
    },
    {
      id: 'node-payment',
      type: 'payment',
      label: 'Payment Milestone #3',
      sublabel: 'Disbursement Shifted',
      department: 'Finance',
      severity: 'high',
      evidenceRef: {
        docId: 'KMRL-CNT-2026-104',
        docTitle: 'Traction Substation Maintenance SLA',
        page: 14,
        clause: 'Clause 7.3'
      },
      metrics: '₹82 Lakhs Delayed',
      status: 'at_risk'
    },
    {
      id: 'node-deadline',
      type: 'deadline',
      label: 'Phase-2 Grid Safety Inspection',
      sublabel: 'CMRS Regulatory Sign-off Window',
      department: 'Safety & Quality',
      severity: 'critical',
      evidenceRef: {
        docId: 'KMRL-SOP-SAF-02',
        docTitle: 'National Metro Rail Safety Code 2026',
        page: 12,
        clause: 'Rule 12'
      },
      metrics: 'Tight Buffer (-5 Days)',
      status: 'at_risk'
    },
    {
      id: 'node-task',
      type: 'task',
      label: 'Contingency Feeder Schedule',
      sublabel: 'Operations Line-1 Shift Adjustment',
      department: 'Operations',
      severity: 'medium',
      evidenceRef: {
        docId: 'KMRL-SOP-SIG-09',
        docTitle: 'Track & Signal Protocol',
        page: 4,
        clause: 'Section 3.1'
      },
      metrics: 'Requires Action',
      status: 'pending_verification'
    }
  ],
  edges: [
    { from: 'node-change', to: 'node-contract', relationship: 'Modifies Master Terms', evidenceProvenance: 'Contract 104 Amendment Addendum p.8' },
    { from: 'node-change', to: 'node-wo1', relationship: 'Direct Schedule Extension', evidenceProvenance: 'WO-782 Dependency Map' },
    { from: 'node-wo1', to: 'node-wo2', relationship: 'Cascading Substation Handover', evidenceProvenance: 'Line-1 Power Interlocking Chart' },
    { from: 'node-change', to: 'node-vendor', relationship: 'Alters Turnaround Obligations', evidenceProvenance: 'Clause 11.1 Liquidated Damages' },
    { from: 'node-wo1', to: 'node-payment', relationship: 'Blocks Milestone 3 Sign-off', evidenceProvenance: 'Clause 7.3 Payment Conditions' },
    { from: 'node-wo2', to: 'node-deadline', relationship: 'Reduces CMRS Inspection Buffer', evidenceProvenance: 'CMRS Safety Mandate Chapter 4' },
    { from: 'node-wo1', to: 'node-task', relationship: 'Demands Power Routing Shift', evidenceProvenance: 'Operations Control Center SOP' }
  ],
  recommendedActions: [
    {
      id: 'act-1',
      title: 'Issue Formal Schedule Addendum to Chief Electrical Engineer & OCC',
      assigneeRole: 'Engineering_Lead',
      department: 'Engineering',
      priority: 'critical',
      deadline: 'Today by 16:00 IST',
      selected: true
    },
    {
      id: 'act-2',
      title: 'Re-align Finance Cashflow & defer Milestone 3 ₹82 Lakh release to Sept 12',
      assigneeRole: 'Finance_Manager',
      department: 'Finance',
      priority: 'high',
      deadline: 'Tomorrow by 12:00 IST',
      selected: true
    },
    {
      id: 'act-3',
      title: 'Activate Secondary Feeders for Aluva Substation to prevent festive Line-1 bottleneck',
      assigneeRole: 'Operations_Officer',
      department: 'Operations',
      priority: 'high',
      deadline: 'In 3 Days',
      selected: true
    },
    {
      id: 'act-4',
      title: 'Notify CMRS Safety Inspector of revised pre-commissioning testing date',
      assigneeRole: 'Safety_Inspector',
      department: 'Safety & Quality',
      priority: 'medium',
      deadline: 'In 5 Days',
      selected: false
    }
  ],
  status: 'Pending_Verification'
};

export const mockIncidents: OperationalIncident[] = [
  {
    id: 'INC-2026-088',
    title: 'Sustained Signal Latency Detected on Line-1 Aluva Terminal',
    category: 'Signaling',
    severity: 'critical',
    department: 'Signaling & Telecom',
    location: 'Aluva Corridor (Pier 40–88)',
    detectedAt: '12 mins ago (09:52 IST)',
    slaRemainingMinutes: 28,
    status: 'Active',
    summary: 'Continuous telemetry telemetry delay measured at 48ms (Exceeds maximum allowable 40ms threshold specified in SOP-SIG-09 Sec 3.1). Immediate switchover to redundant optical line recommended.',
    evidenceDocs: [
      {
        docId: 'KMRL-SOP-SIG-09',
        docTitle: 'Kerala Metro Track & Aluva Signal Protocols',
        page: 4,
        clause: 'Section 3.1'
      }
    ],
    escalationLevel: 1,
    assignedOfficer: 'K. Venkitesh (Dy. CE Signaling)'
  },
  {
    id: 'INC-2026-085',
    title: 'Transformer Dielectric Oil Pressure Low Alarm - Muttom Yard',
    category: 'Traction',
    severity: 'high',
    department: 'Engineering',
    location: 'Muttom Depot Substation TR-03',
    detectedAt: '1 hour ago',
    slaRemainingMinutes: 110,
    status: 'Investigating',
    summary: 'Diagnostic sensor reading oil pressure 12% below standard operating envelope. Maintenance technician dispatched for physical valve audit.',
    evidenceDocs: [
      {
        docId: 'KMRL-CNT-2026-104',
        docTitle: 'Traction Substation Maintenance SLA',
        page: 8,
        clause: 'Clause 4.2'
      }
    ],
    escalationLevel: 0,
    assignedOfficer: 'Manoj Nair (Engineering Lead)'
  }
];

export const mockComplianceItems: ComplianceItem[] = [
  {
    id: 'CMP-REG-01',
    regulationCode: 'CMRS/2026/ELV-18',
    title: 'Elevated Guideway Structural & Bearing Integrity Certification',
    issuingAuthority: 'CMRs',
    department: 'Civil & Track',
    dueDate: '2026-08-25',
    status: 'Due_Soon',
    complianceScore: 92.5,
    evidenceDocId: 'KMRL-SOP-SAF-02',
    evidencePage: 12,
    lastAuditDate: '2026-05-20'
  },
  {
    id: 'CMP-REG-02',
    regulationCode: 'KFS/METRO/2026/04',
    title: 'Emergency Passenger Evacuation & Fire Smoke Extraction SOP Audit',
    issuingAuthority: 'Kerala Fire & Safety',
    department: 'Safety & Quality',
    dueDate: '2026-08-18',
    status: 'Due_Soon',
    complianceScore: 98.0,
    evidenceDocId: 'KMRL-SOP-SAF-02',
    evidencePage: 4,
    lastAuditDate: '2026-07-15'
  },
  {
    id: 'CMP-REG-03',
    regulationCode: 'MoHUA/NCMC/2026',
    title: 'National Common Mobility Card Interoperability & AFC EMVCo Compliance',
    issuingAuthority: 'MoHUA',
    department: 'Procurement',
    dueDate: '2026-09-30',
    status: 'Compliant',
    complianceScore: 100.0,
    evidenceDocId: 'KMRL-TEN-2026-319',
    evidencePage: 15,
    lastAuditDate: '2026-08-01'
  },
  {
    id: 'CMP-REG-04',
    regulationCode: 'CERC/GRID/2025/11',
    title: '25kV Traction Harmonic Resonance & Substation Earth Resistance Calibration',
    issuingAuthority: 'KMRL Internal',
    department: 'Engineering',
    dueDate: '2026-08-10',
    status: 'Overdue',
    complianceScore: 78.4,
    evidenceDocId: 'KMRL-CNT-2026-104',
    evidencePage: 8,
    lastAuditDate: '2026-02-10'
  }
];

export const mockComplaints: ComplaintTicket[] = [
  {
    id: 'CMP-TKT-2041',
    ticketNumber: 'CMP-2026-2041',
    category: 'Service & Operations',
    priority: 'high',
    subject: 'Excessive platform wait time & irregular headway at Edappally station during 08:30 peak',
    origin: 'Public Helpline',
    stationOrLocation: 'Edappally Station Platform 1',
    submittedAt: 'Today at 08:45 IST',
    slaHoursRemaining: 3.2,
    status: 'Investigating',
    assignedTo: 'Operations Control Center (Harish Kumar)',
    relatedDocId: 'KMRL-SOP-SIG-09'
  },
  {
    id: 'CMP-TKT-2039',
    ticketNumber: 'CMP-2026-2039',
    category: 'Ticketing & AFC',
    priority: 'medium',
    subject: 'Kochi1 Card contactless QR gate delay on Exit Turnstile #4',
    origin: 'Station Counter',
    stationOrLocation: 'MG Road Station',
    submittedAt: 'Today at 07:15 IST',
    slaHoursRemaining: 6.5,
    status: 'Assigned',
    assignedTo: 'AFC Maintenance Cell',
    relatedDocId: 'KMRL-TEN-2026-319'
  },
  {
    id: 'CMP-TKT-2034',
    ticketNumber: 'CMP-2026-2034',
    category: 'Infrastructure',
    priority: 'low',
    subject: 'Concourse escalator maintenance sound vibration reported',
    origin: 'Public Helpline',
    stationOrLocation: 'Aluva Metro Terminal',
    submittedAt: 'Yesterday at 16:30 IST',
    slaHoursRemaining: 18.0,
    status: 'Resolved',
    assignedTo: 'Civil Facilities Team'
  }
];

export const mockTasks: OperationalTask[] = [
  {
    id: 'tsk-001',
    title: 'Review Contract 104 Overhaul Turnaround Addendum',
    description: 'Verify 45-day extension clause impact on WO-782 and authorize contingency power feeder protocol.',
    sourceDocId: 'KMRL-CNT-2026-104',
    sourceDocNumber: 'KMRL/PROC/2026/104-REV2',
    sourceClause: 'Clause 4.2',
    department: 'Operations',
    assignee: 'Harish Kumar',
    dueDate: 'Today, 16:00 IST',
    priority: 'critical',
    status: 'In_Progress',
    category: 'Review'
  },
  {
    id: 'tsk-002',
    title: 'Switch Aluva Signal Telemetry to Redundant Optical Channel #2',
    description: 'Resolve 48ms telemetry latency under SOP-SIG-09 Section 3.1 emergency protocol.',
    sourceDocId: 'KMRL-SOP-SIG-09',
    sourceDocNumber: 'KMRL/SOP/OPS/2026-09',
    sourceClause: 'Section 3.1',
    department: 'Signaling & Telecom',
    assignee: 'K. Venkitesh',
    dueDate: 'Today, 10:30 IST',
    priority: 'critical',
    status: 'To_Do',
    category: 'Mitigation'
  },
  {
    id: 'tsk-003',
    title: 'Verify Milestone 3 ₹82 Lakh invoice deferment with Finance Directorate',
    description: 'Align payment voucher release date with revised Chief Safety Officer inspection timeline.',
    sourceDocId: 'KMRL-CNT-2026-104',
    sourceDocNumber: 'KMRL/PROC/2026/104-REV2',
    sourceClause: 'Clause 7.3',
    department: 'Finance',
    assignee: 'Anjali Ramesh',
    dueDate: 'Tomorrow, 12:00 IST',
    priority: 'high',
    status: 'To_Do',
    category: 'Approval'
  },
  {
    id: 'tsk-004',
    title: 'File CMRS Pre-Inspection Evacuation Lighting Audit Report',
    description: 'Submit nitrogen fire suppression bi-monthly pressure calibration certificate.',
    sourceDocId: 'KMRL-SOP-SAF-02',
    sourceDocNumber: 'KMRL/SAF/2026/02-CMRS',
    sourceClause: 'Chapter 4, Rule 12',
    department: 'Safety & Quality',
    assignee: 'Vipin Nayar',
    dueDate: '2026-08-18',
    priority: 'medium',
    status: 'Under_Review',
    category: 'Filing'
  },
  {
    id: 'tsk-005',
    title: 'Conduct Monthly Traction Transformer Oil Breakdown Voltage Test',
    description: 'Laboratory dielectric strength analysis for Muttom Yard sub-station TR-01 & TR-02.',
    sourceDocId: 'KMRL-CNT-2026-104',
    sourceDocNumber: 'KMRL/PROC/2026/104',
    department: 'Engineering',
    assignee: 'Manoj Nair',
    dueDate: '2026-08-14',
    priority: 'low',
    status: 'Completed',
    category: 'Inspection'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    severity: 'critical',
    category: 'Changes',
    title: 'High Impact Contract Amendment Detected',
    message: 'Contract KMRL/2026/104 delivery window modified from 30 days to 45 days. 3 dependent work orders and Milestone 3 (₹82 Lakhs) affected.',
    timestamp: '8 mins ago',
    read: false,
    relatedEntityId: 'SIM-KMRL-2026-104',
    actionLabel: 'Simulate Impact',
    actionView: 'impact-simulator'
  },
  {
    id: 'notif-2',
    severity: 'critical',
    category: 'Critical',
    title: 'Signal Telemetry Latency Alert',
    message: 'Aluva Corridor telemetry telemetry exceeded 40ms SLA threshold. Redundant switchover required.',
    timestamp: '14 mins ago',
    read: false,
    relatedEntityId: 'INC-2026-088',
    actionLabel: 'Open Emergency Room',
    actionView: 'emergency'
  },
  {
    id: 'notif-3',
    severity: 'high',
    category: 'Compliance',
    title: 'KFS Evacuation Safety Audit Due in 48 Hours',
    message: 'Mandatory fire evacuation walkway lighting certification pending sign-off for Edappally Depot.',
    timestamp: '1 hour ago',
    read: true,
    relatedEntityId: 'CMP-REG-02',
    actionLabel: 'Review Compliance',
    actionView: 'compliance'
  },
  {
    id: 'notif-4',
    severity: 'medium',
    category: 'Finance',
    title: 'Milestone Payment Voucher Prepared',
    message: 'Tender 319 AFC Turnstiles delivery milestone ₹1.4 Cr ready for review.',
    timestamp: '3 hours ago',
    read: true,
    relatedEntityId: 'KMRL-TEN-2026-319',
    actionLabel: 'View Document',
    actionView: 'documents'
  }
];

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '2026-08-16 09:54:12 IST',
    officerName: 'Harish Kumar',
    officerRole: 'Chief_Operations_Officer',
    actionType: 'VIEW_EVIDENCE',
    description: 'Inspected highlighted Clause 4.2 in Contract KMRL/2026/104-REV2 regarding 45-day turnaround amendment.',
    docReference: 'KMRL-CNT-2026-104 (Page 8)',
    department: 'Operations',
    evidenceSnippet: 'Delivery & Commissioning schedule amended from 30 to 45 calendar days.',
    ipAddress: '10.240.12.8 (KMRL Intranet OCC)'
  },
  {
    id: 'aud-002',
    timestamp: '2026-08-16 09:32:05 IST',
    officerName: 'Harish Kumar',
    officerRole: 'Chief_Operations_Officer',
    actionType: 'SIMULATE_IMPACT',
    description: 'Triggered Operational Blast Radius simulator on Contract 104 version diff v1.0 -> v2.1.',
    docReference: 'SIM-KMRL-2026-104',
    department: 'Operations',
    evidenceSnippet: 'Traced 7 downstream nodes across WO-782, Apex Rail Tech, and ₹82 Lakh Milestone 3.',
    ipAddress: '10.240.12.8 (KMRL Intranet OCC)'
  },
  {
    id: 'aud-003',
    timestamp: '2026-08-16 09:15:40 IST',
    officerName: 'System OCR Pipeline',
    officerRole: 'Super_Admin',
    actionType: 'DOCUMENT_UPLOAD',
    description: 'Ingested, classified, and generated Canonical JSON representation for KMRL/PROC/2026/104-REV2.pdf.',
    docReference: 'KMRL-CNT-2026-104',
    department: 'Engineering',
    evidenceSnippet: 'Extracted 24 pages, 18 clauses, 99.4% OCR confidence, 1 conflict flagged.',
    ipAddress: '10.240.0.1 (Async Worker Cluster)'
  },
  {
    id: 'aud-004',
    timestamp: '2026-08-15 16:44:19 IST',
    officerName: 'Vipin Nayar',
    officerRole: 'Safety_Inspector',
    actionType: 'HUMAN_VERIFICATION',
    description: 'Verified CMRS Safety Code Chapter 4 nitrogen fire suppression compliance requirement.',
    docReference: 'KMRL-SOP-SAF-02',
    department: 'Safety & Quality',
    evidenceSnippet: 'Bi-monthly calibration cert validated and attached to Compliance Registry.',
    ipAddress: '10.240.14.22 (KMRL Safety Directorate)'
  },
  {
    id: 'aud-005',
    timestamp: '2026-08-15 14:10:00 IST',
    officerName: 'Anjali Ramesh',
    officerRole: 'Finance_Manager',
    actionType: 'TASK_ASSIGNED',
    description: 'Assigned AFC Tender 319 budget allocation verification task to Senior Accounts Officer.',
    docReference: 'KMRL-TEN-2026-319',
    department: 'Finance',
    evidenceSnippet: '₹12.40 Cr capital expenditure verification under Head CAPEX-2026-AFC.',
    ipAddress: '10.240.18.5 (KMRL Finance Wing)'
  }
];
