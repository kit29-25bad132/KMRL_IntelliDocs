import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowLeft,
  ChevronRight,
  GitCompare,
  Download,
  Share2,
  Layers,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DocumentViewerView: React.FC = () => {
  const { selectedDoc, highlightedClauseId, setHighlightedClauseId, setCurrentTab, openSimulationForDoc } = useApp();
  const [activeRightTab, setActiveRightTab] = useState<'clauses' | 'canonical' | 'entities' | 'actions'>('clauses');

  if (!selectedDoc) {
    return (
      <div className="p-8 text-center text-slate-500">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
        <p className="text-sm font-bold">No document selected</p>
      </div>
    );
  }

  const selectedClause = selectedDoc.clauses.find((c) => c.id === highlightedClauseId) || selectedDoc.clauses[0];

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-7xl mx-auto h-[calc(100vh-5.5rem)] flex flex-col">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('documents')}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm truncate max-w-md">
                {selectedDoc.metadata.title}
              </span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border border-slate-200">
                {selectedDoc.metadata.docNumber}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2 rounded border border-emerald-200">
                {selectedDoc.metadata.version}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Department: {selectedDoc.metadata.department} • Effective: {selectedDoc.metadata.effectiveDate} • OCR: {selectedDoc.metadata.ocrConfidence}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedDoc.metadata.previousVersionId && (
            <button
              onClick={() => setCurrentTab('version-compare')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Compare v1.0 vs v2.1</span>
            </button>
          )}

          {selectedDoc.id === 'KMRL-CNT-2026-104' && (
            <button
              onClick={() => openSimulationForDoc(selectedDoc.id)}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Blast Radius</span>
            </button>
          )}
        </div>
      </div>

      {/* Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left Column: Authoritative Original Document Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col overflow-hidden">
          {/* Document Viewer Toolbar */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Authoritative Source PDF</span>
              <span className="text-slate-400 font-normal">| Page {selectedClause?.page || 1} of {selectedDoc.metadata.pages}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                ✓ Cryptographic Seal Valid
              </span>
            </div>
          </div>

          {/* Document Content / Highlighted Clauses Canvas */}
          <div className="p-6 overflow-y-auto font-serif text-slate-800 text-xs leading-relaxed space-y-4 bg-slate-50/30 flex-1">
            <div className="text-center pb-4 border-b border-slate-200 font-sans">
              <div className="font-bold text-sm tracking-wider uppercase text-slate-900">
                KOCHI METRO RAIL LIMITED
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                (A Joint Venture of Government of India & Government of Kerala)
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                REF: {selectedDoc.metadata.docNumber} • REVISED EDITION {selectedDoc.metadata.version}
              </div>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div className="text-slate-700 font-bold text-xs uppercase tracking-wide">
                1.0 EXECUTIVE OPERATIONAL SUMMARY
              </div>
              <p className="text-slate-600 leading-relaxed font-normal">
                {selectedDoc.summary}
              </p>

              <div className="text-slate-700 font-bold text-xs uppercase tracking-wide pt-2">
                2.0 FORMAL CLAUSES & OBLIGATIONS (OCR EXTRACTED)
              </div>

              {selectedDoc.clauses.map((clause) => {
                const isHighlighted = highlightedClauseId === clause.id;
                return (
                  <div
                    key={clause.id}
                    onClick={() => setHighlightedClauseId(clause.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isHighlighted
                        ? 'bg-amber-50/90 border-amber-400 shadow-md ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{clause.clauseNumber}: {clause.title}</span>
                        {clause.isModified && (
                          <span className="bg-red-600 text-white font-bold text-[9px] px-1.5 py-0.2 rounded uppercase">
                            MODIFIED
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Page {clause.page}</span>
                    </div>

                    <p className="text-xs text-slate-800 leading-relaxed font-medium">
                      {clause.content}
                    </p>

                    {clause.riskNote && (
                      <div className="mt-2.5 pt-2 border-t border-amber-200 text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>AI Warning: {clause.riskNote}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Canonical Document Intelligence Layer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="p-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1 text-xs shrink-0">
            <button
              onClick={() => setActiveRightTab('clauses')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeRightTab === 'clauses'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Clause Intelligence
            </button>
            <button
              onClick={() => setActiveRightTab('canonical')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeRightTab === 'canonical'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Canonical JSON
            </button>
            <button
              onClick={() => setActiveRightTab('entities')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeRightTab === 'entities'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Entities ({Object.keys(selectedDoc.metadata?.extractedEntities || {}).length})
            </button>
          </div>

          {/* Right Tab Content */}
          <div className="p-4 overflow-y-auto text-xs space-y-4 flex-1">
            {activeRightTab === 'clauses' && selectedClause && (
              <div className="space-y-4">
                <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Clause Grounding</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs mb-0.5">{selectedClause.clauseNumber}: {selectedClause.title}</div>
                  <div className="text-[11px] text-slate-600">Source: Page {selectedClause.page} • Optical Confidence 99.4%</div>
                </div>

                {selectedClause.previousContent && (
                  <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg">
                    <div className="text-[10px] font-bold text-red-700 uppercase mb-1">Original Text (v1.0):</div>
                    <p className="text-slate-700 line-through font-mono text-[11px]">{selectedClause.previousContent}</p>
                  </div>
                )}

                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg">
                  <div className="text-[10px] font-bold text-amber-800 uppercase mb-1">Amended Text (v2.1):</div>
                  <p className="text-slate-900 font-semibold font-mono text-[11px]">{selectedClause.content}</p>
                </div>

                {/* Downstream Operations at Risk */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Downstream Dependencies Affected
                  </h4>
                  <div className="space-y-1.5">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">Work Order WO-782 (Aluva Substation)</div>
                        <div className="text-[11px] text-slate-500">Execution target shifted by +15 days</div>
                      </div>
                      <span className="text-red-700 font-bold text-[10px] bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                        At Risk
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">Milestone 3 Voucher (₹82 Lakhs)</div>
                        <div className="text-[11px] text-slate-500">Disbursal date deferred to Sept 12</div>
                      </div>
                      <span className="text-amber-800 font-bold text-[10px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openSimulationForDoc(selectedDoc.id)}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  <span>Launch Change Impact Simulator</span>
                </button>
              </div>
            )}

            {activeRightTab === 'canonical' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Machine-Readable Canonical JSON</span>
                  <span className="text-[10px] font-mono text-slate-400">pgvector ready</span>
                </div>
                <pre className="p-3 bg-slate-900 text-emerald-400 rounded-lg font-mono text-[10px] overflow-x-auto max-h-96">
                  {JSON.stringify(
                    {
                      document_id: selectedDoc.id,
                      title: selectedDoc.metadata?.title,
                      version: selectedDoc.metadata?.version,
                      department: selectedDoc.metadata?.department,
                      ocr_confidence: selectedDoc.metadata?.ocrConfidence,
                      sha256: selectedDoc.metadata?.provenance?.sha256,
                      entities: selectedDoc.metadata?.extractedEntities || {},
                      clauses_count: (selectedDoc.clauses || []).length,
                      vector_dimensions: 768
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}

            {activeRightTab === 'entities' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Extracted Named Entities & Provenance
                </h4>

                {Object.entries(selectedDoc.metadata?.extractedEntities || {}).map(([category, items]) => (
                  <div key={category} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {((items as string[]) || []).map((val, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-slate-800 text-xs font-medium px-2 py-0.5 rounded border border-slate-300"
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
