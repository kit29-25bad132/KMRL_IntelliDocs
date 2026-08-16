import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  Search,
  Filter,
  Eye,
  GitCompare,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KMRLDocument } from '../types';
export const DocumentsView: React.FC = () => {
  const { documents, openDocumentViewer, setCurrentTab, openSimulationForDoc, openIngestModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Contract', 'SOP', 'Safety Code', 'Work Order', 'Tender', 'Circular'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.metadata.category === selectedCategory;
    const matchesSearch =
      doc.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.metadata.docNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.metadata.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Canonical Document Intelligence Vault</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Original documents preserved as source of truth • Machine-readable Canonical JSON & pgvector embeddings.
            </p>
          </div>
        </div>

        <button
          onClick={openIngestModal}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Ingest New Document</span>
        </button>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vault documents..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          />
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Canonical Document Registry ({filteredDocs.length})
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">
            OCR Verification Confidence &gt;98% Required
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
              <tr>
                <th className="p-3.5">Document Title & Number</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Version</th>
                <th className="p-3.5">OCR / Extraction</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 leading-snug">{doc.metadata.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {doc.metadata.docNumber} • {doc.metadata.pages} pages • {doc.metadata.fileSize}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded text-[11px] border border-slate-200">
                      {doc.metadata.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">{doc.metadata.department}</td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-700 font-bold">
                    {doc.metadata.version}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-emerald-800 text-[11px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {doc.metadata.ocrConfidence}% OCR
                      </span>
                      {doc.metadata.conflictsDetected > 0 && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-200">
                          {doc.metadata.conflictsDetected} Conflict
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        doc.metadata.status === 'Action_Required'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : doc.metadata.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {doc.metadata.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openDocumentViewer(doc.id)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-colors"
                        title="Open Split-Screen Grounded Evidence"
                      >
                        <Eye className="w-3 h-3 text-emerald-700" />
                        <span>Evidence</span>
                      </button>

                      {doc.metadata.previousVersionId && (
                        <button
                          onClick={() => setCurrentTab('version-compare')}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold text-[11px] flex items-center gap-1 transition-colors"
                          title="Compare Versions"
                        >
                          <GitCompare className="w-3 h-3 text-slate-500" />
                          <span>Diff</span>
                        </button>
                      )}

                      {doc.id === 'KMRL-CNT-2026-104' && (
                        <button
                          onClick={() => openSimulationForDoc(doc.id)}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-colors"
                          title="Simulate Operational Blast Radius"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Impact</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
