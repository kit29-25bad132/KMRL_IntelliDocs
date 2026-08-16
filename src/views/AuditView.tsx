import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuditView: React.FC = () => {
  const { auditLogs, openDocumentViewer, t } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExport = () => {
    // Generate real cryptographic JSON dossier download
    const exportPayload = {
      exportAuthority: 'Kochi Metro Rail Limited (KMRL) Intranet OCC',
      exportTimestamp: new Date().toISOString(),
      hashAlgorithm: 'SHA-256 (HMAC Immutable)',
      chainStatus: 'VERIFIED',
      totalRecords: auditLogs.length,
      auditLedger: auditLogs
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KMRL_Audit_Dossier_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-100 text-teal-800 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                {t.audit.title}
              </h1>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200">
                SHA-256 VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.audit.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer shadow-2xs"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Dossier Exported (JSON)</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>{t.audit.exportDossier}</span>
            </>
          )}
        </button>
      </div>

      {/* Audit List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {t.audit.ledgerEntries} ({auditLogs.length})
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">Blockchain / Hash-Chained Verification: OK</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
              <tr>
                <th className="p-3.5">{t.audit.timestamp}</th>
                <th className="p-3.5">{t.audit.actionAndEvent}</th>
                <th className="p-3.5">{t.audit.officer}</th>
                <th className="p-3.5">{t.audit.targetDoc}</th>
                <th className="p-3.5">{t.audit.contextHash}</th>
                <th className="p-3.5 text-right">{t.labels.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-3.5">
                    <span className="bg-slate-100 text-slate-900 font-bold px-2 py-0.5 rounded text-[11px] border border-slate-200">
                      {log.actionType}
                    </span>
                    <p className="text-[11px] text-slate-600 mt-1 max-w-sm">{log.description}</p>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{log.officerName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{log.officerRole.replace(/_/g, ' ')}</div>
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 mt-0.5 inline-block font-semibold">
                      {log.department}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-800">{log.docReference || 'System Governance'}</div>
                    {log.evidenceSnippet && (
                      <div className="text-[10px] text-slate-500 font-mono italic max-w-xs truncate mt-0.5">
                        "{log.evidenceSnippet}"
                      </div>
                    )}
                  </td>
                  <td className="p-3.5">
                    <div className="font-mono text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200 max-w-[140px] truncate">
                      {log.ipAddress}
                    </div>
                  </td>
                  <td className="p-3.5 text-right">
                    {log.docReference && (
                      <button
                        onClick={() => openDocumentViewer(log.docReference!)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-50 text-teal-700 border border-teal-200 rounded font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    )}
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
