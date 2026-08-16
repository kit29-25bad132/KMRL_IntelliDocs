import React, { useState, useMemo } from 'react';
import { Search, FileText, Zap, AlertTriangle, ArrowRight, X, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, documents, openDocumentViewer, openSimulationForDoc, setCurrentTab } = useApp();
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matchedDocs = documents.filter(
      (d) =>
        d.metadata.title.toLowerCase().includes(q) ||
        d.metadata.docNumber.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.clauses.some((c) => c.title.toLowerCase().includes(q) || c.content.toLowerCase().includes(q))
    );

    return matchedDocs;
  }, [query, documents]);

  if (!isSearchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-3 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type document name, clause, vendor, or operational question..."
            autoFocus
            className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded font-mono"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium mr-1 text-[11px]">Quick:</span>
          {['Contract 104 Overhaul', 'Signal Telemetry 40ms', 'CMRS Safety Code 2026', 'NCMC Tender 319'].map((sug) => (
            <button
              key={sug}
              onClick={() => setQuery(sug)}
              className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-[11px] whitespace-nowrap transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Search Results / Default State */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-4 space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Frequently Accessed Documents
              </div>
              <div className="space-y-1">
                {documents.slice(0, 3).map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      openDocumentViewer(doc.id);
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                          {doc.metadata.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {doc.metadata.docNumber} • {doc.metadata.department} • {doc.metadata.version}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-1.5 p-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Found {filteredResults.length} Verified KMRL Evidence Records
              </div>
              {filteredResults.map((doc) => (
                <div
                  key={doc.id}
                  className="p-2.5 rounded-lg border border-slate-200 bg-white hover:border-emerald-600/40 hover:bg-emerald-50/20 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{doc.metadata.title}</span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-1.5 py-0.2 rounded border border-slate-200">
                        {doc.metadata.docNumber}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      OCR: {doc.metadata.ocrConfidence}%
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 mb-2">{doc.summary}</p>

                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        openDocumentViewer(doc.id);
                        setIsSearchModalOpen(false);
                      }}
                      className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-medium flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      Open Evidence
                    </button>
                    {doc.id === 'KMRL-CNT-2026-104' && (
                      <button
                        onClick={() => {
                          openSimulationForDoc(doc.id);
                          setIsSearchModalOpen(false);
                        }}
                        className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-medium flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        Simulate Impact
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <div className="text-xs font-semibold text-slate-700">No matching authorized documents</div>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                No matching verified records found. Try broader search terms or ingest a new document.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Row-Level Security (RLS) & Permission-Aware Search Active
          </span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
