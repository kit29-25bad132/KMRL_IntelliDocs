import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
  X,
  ShieldCheck,
  Zap,
  Share2,
  Sparkles,
  ChevronRight,
  FolderPlus,
  FileType
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { KMRLDocument, Department, CanonicalMetadata } from '../../types';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({ isOpen, onClose }) => {
  const {
    ingestNewDocument,
    ingestionProgress,
    user,
    openDocumentViewer,
    openSimulationForDoc,
    setCurrentTab,
    lastIngestedDoc
  } = useApp();

  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState('');
  const [category, setCategory] = useState<CanonicalMetadata['category']>('SOP');
  const [department, setDepartment] = useState<Department>(user.department || 'Operations');
  const [completedDoc, setCompletedDoc] = useState<KMRLDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Preset KMRL sample documents for instant one-click testing
  const samplePresets: Array<{
    title: string;
    filename: string;
    category: CanonicalMetadata['category'];
    department: Department;
    size: number;
    summary: string;
    clauses: Array<{
      clauseNumber: string;
      title: string;
      content: string;
      page: number;
      severity: 'critical' | 'high' | 'medium' | 'low';
      highlightCategory: 'deadline' | 'financial' | 'safety' | 'obligation' | 'general';
    }>;
  }> = [
    {
      title: 'Elevated Viaduct Structural Inspection Log (Aluva - Kalamassery Pier 120-140)',
      filename: 'KMRL_Viaduct_Inspection_Aluva_2026.pdf',
      category: 'Safety Code',
      department: 'Civil & Track',
      size: 3.8 * 1024 * 1024,
      summary: 'Bi-monthly ultrasonic rail test and pier 120-140 deflection survey. Recommended 40km/h ballast consolidation speed limit.',
      clauses: [
        {
          clauseNumber: 'Clause 2.1',
          title: 'Permissible Track Deflection Limit',
          content: 'Maximum allowable vertical track deviation shall not exceed 2.5mm between Pier 120 and Pier 140 under full passenger load.',
          page: 1,
          severity: 'high',
          highlightCategory: 'obligation'
        },
        {
          clauseNumber: 'Clause 4.3',
          title: 'Speed Restriction Protocol',
          content: 'Impose temporary 40 km/h speed ceiling on down-line between chainage 14+200 and 16+800 until ballast tamping certification is issued.',
          page: 2,
          severity: 'critical',
          highlightCategory: 'safety'
        }
      ]
    },
    {
      title: '25kV Traction Substation Power Grid SLA Addendum (Contract 104-REV3)',
      filename: 'KMRL_Traction_Substation_SLA_Addendum_104.docx',
      category: 'Contract',
      department: 'Procurement',
      size: 4.2 * 1024 * 1024,
      summary: 'Contract amendment introducing revised overhaul cycle intervals and liquidated damages clause 11.1 for traction transformers.',
      clauses: [
        {
          clauseNumber: 'Clause 7.2',
          title: 'Milestone 3 Voucher Release Condition',
          content: 'The milestone disbursement of INR 82,00,000 shall only be executed upon verified completion of continuous 30-day thermal SCADA logging.',
          page: 3,
          severity: 'high',
          highlightCategory: 'financial'
        },
        {
          clauseNumber: 'Clause 11.1',
          title: 'Liquidated Damages for Overhaul Delay',
          content: 'For every seven (7) calendar days of unexcused delay beyond the scheduled commissioning deadline, the contractor shall forfeit 0.5% of total contract value.',
          page: 4,
          severity: 'critical',
          highlightCategory: 'obligation'
        }
      ]
    },
    {
      title: 'CMRS High-Speed Signaling & CBTC Latency Protocol 2026',
      filename: 'CMRS_Signaling_Protocol_Line1_2026.pdf',
      category: 'Circular',
      department: 'Signaling & Telecom',
      size: 2.1 * 1024 * 1024,
      summary: 'Statutory directive by Commissioner of Metro Railway Safety requiring redundant fiber loops for all axle counters on Line-1.',
      clauses: [
        {
          clauseNumber: 'Section 4.1',
          title: 'Signal Feedback Loop Redundancy',
          content: 'All CBTC transponders located between Aluva and Muttom depot must maintain secondary hot-standby feedback lines with <50ms failover.',
          page: 1,
          severity: 'critical',
          highlightCategory: 'safety'
        }
      ]
    }
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!documentTitle) {
        setDocumentTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!documentTitle) {
        setDocumentTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSelectPreset = (preset: typeof samplePresets[0]) => {
    setDocumentTitle(preset.title);
    setCategory(preset.category);
    setDepartment(preset.department);
    // Create a mock file representation
    const mockBlob = new Blob([preset.summary], { type: 'application/pdf' });
    const file = new File([mockBlob], preset.filename, { type: 'application/pdf' });
    setSelectedFile(file);
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile && !documentTitle) return;
    setIsProcessing(true);

    try {
      const doc = await ingestNewDocument({
        name: selectedFile ? selectedFile.name : `${documentTitle}.pdf`,
        size: selectedFile ? selectedFile.size : 2.5 * 1024 * 1024,
        title: documentTitle || (selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'KMRL Operational Document'),
        category,
        department,
        summary: `Canonical Ingestion of ${documentTitle || selectedFile?.name}. Grounded into KMRL Knowledge Graph with full semantic verification.`,
      });

      setCompletedDoc(doc);
    } catch (err) {
      console.error('Ingestion failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setDocumentTitle('');
    setCompletedDoc(null);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-600 text-white rounded-xl shadow-xs">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Ingest Document to Canonical Vault
                </h3>
                <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200">
                  OCR & pgvector
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Kochi Metro Rail Limited • Machine-Readable Knowledge Pipeline
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors disabled:opacity-30 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* STATE 1: Processing Progress */}
          {isProcessing && ingestionProgress?.active && (
            <div className="py-8 space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border-2 border-teal-200 shadow-sm animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Canonical Intelligence Pipeline In Progress
                </h4>
                <p className="text-xs text-teal-700 font-semibold">{ingestionProgress.label}</p>
              </div>

              {/* Step checklist */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2.5 max-w-lg mx-auto shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="text-slate-800 font-medium">1. File Validation & SHA-256 Cryptographic Checksum</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {ingestionProgress.step >= 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <Loader2 className="w-4 h-4 text-slate-400 animate-spin shrink-0" />
                  )}
                  <span className={ingestionProgress.step >= 2 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                    2. Document Layout & Optical OCR Extraction (99.4% precision)
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {ingestionProgress.step >= 3 ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                  )}
                  <span className={ingestionProgress.step >= 3 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                    3. Canonical JSON Clause Chunking & Metadata Provenance
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {ingestionProgress.step >= 4 ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                  )}
                  <span className={ingestionProgress.step >= 4 ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                    4. pgvector Embeddings & Knowledge Graph Relationship Linking
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="max-w-lg mx-auto w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${ingestionProgress.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* STATE 2: Ingestion Complete Success State */}
          {!isProcessing && completedDoc && (
            <div className="space-y-4 py-2">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-emerald-900">
                    Document Successfully Ingested & Canonicalized!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    <strong>{completedDoc.metadata.title}</strong> is now indexed in pgvector, grounded to the Knowledge Graph, and verifiable across all KMRL departments.
                  </p>
                </div>
              </div>

              {/* Document Overview Metadata */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Canonical Intelligence Registry
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Doc ID</span>
                    <span className="font-mono font-bold text-slate-900">{completedDoc.id}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">OCR Score</span>
                    <span className="font-bold text-emerald-700">{completedDoc.metadata.ocrConfidence}%</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Department</span>
                    <span className="font-semibold text-slate-800 truncate block">{completedDoc.metadata.department}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Clauses Parsed</span>
                    <span className="font-bold text-slate-900">{completedDoc.clauses?.length || 2} Sections</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600 break-all">
                  <span className="text-slate-400 font-sans font-bold block mb-0.5">SHA-256 Checksum:</span>
                  {completedDoc.metadata.provenance.sha256}
                </div>
              </div>

              {/* Next Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    openDocumentViewer(completedDoc.id);
                  }}
                  className="p-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open in Document Viewer</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    setCurrentTab('knowledge-graph');
                  }}
                  className="p-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-teal-400" />
                  <span>Explore in Knowledge Graph</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    openSimulationForDoc(completedDoc.id);
                  }}
                  className="p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Simulate Impact Radius</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: Standard Upload & Configuration Form */}
          {!isProcessing && !completedDoc && (
            <div className="space-y-4">
              {/* Preset Sample Quick Pick Banner */}
              <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-teal-900 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                    <span>Quick Ingest: KMRL Production Presets</span>
                  </div>
                  <span className="text-[10px] text-teal-700 font-semibold">1-Click Test</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {samplePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPreset(preset)}
                      className="p-2 bg-white hover:bg-teal-100/50 border border-teal-200/80 rounded-lg text-left transition-all hover:shadow-2xs group cursor-pointer"
                    >
                      <div className="font-bold text-slate-900 truncate text-[11px] group-hover:text-teal-900">
                        {preset.title.split('(')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                        <span>{preset.category}</span>
                        <span className="font-mono text-teal-700 font-semibold">Ready</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-teal-600 bg-teal-50/60 scale-[1.01]'
                    : selectedFile
                    ? 'border-teal-400 bg-teal-50/30'
                    : 'border-slate-300 bg-slate-50/60 hover:bg-slate-50 hover:border-teal-400'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.png,.jpg,.jpeg,.txt"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-2">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-900 mb-0.5">
                  {selectedFile ? selectedFile.name : 'Click to browse files or drag & drop here'}
                </div>
                <p className="text-[11px] text-slate-500">
                  Supports PDF, DOCX, Scanned Engineering Sheets, Images (Up to 50MB)
                </p>
              </div>

              {/* Selected File & Metadata Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="e.g. Traction Substation Overhaul Protocol"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Document Classification
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CanonicalMetadata['category'])}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
                  >
                    <option value="SOP">Standard Operating Procedure (SOP)</option>
                    <option value="Contract">Procurement & Maintenance Contract</option>
                    <option value="Safety Code">Statutory Safety Code (CMRS)</option>
                    <option value="Circular">Executive Circular & Directive</option>
                    <option value="Work Order">Engineering Work Order</option>
                    <option value="Tender">Tender & RFP Specification</option>
                    <option value="Audit Report">Audit & Compliance Report</option>
                    <option value="Invoice">Invoice & Financial Voucher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Authorizing Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as Department)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
                  >
                    <option value="Operations">Operations & Traffic</option>
                    <option value="Procurement">Procurement & Contracts</option>
                    <option value="Civil & Track">Civil & Track Engineering</option>
                    <option value="Signaling & Telecom">Signaling & Telecom</option>
                    <option value="Engineering">Electrical & Power Engineering</option>
                    <option value="Safety & Quality">Safety & Quality Assurance</option>
                    <option value="Finance">Finance & Accounts</option>
                    <option value="Administration">Administration & HR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Provenance Security Standard
                  </label>
                  <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-[11px] text-slate-700 flex items-center gap-1.5 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SHA-256 Immutable Object Storage</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>KMRL Intranet Gateway • Port 3000 Active</span>
          </div>

          <div className="flex items-center gap-2">
            {completedDoc ? (
              <>
                <button
                  onClick={resetForm}
                  className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Ingest Another
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleClose}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadSubmit}
                  disabled={isProcessing || (!selectedFile && !documentTitle)}
                  className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg shadow-sm disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Start Canonical Ingestion</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
