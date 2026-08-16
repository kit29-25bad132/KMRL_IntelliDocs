import React, { useState } from 'react';
import { BarChart3, Download, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { t } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const deptData = [
    { name: 'Safety & Quality Assurance', docs: 32, latency: '1.2 hrs', compliance: '98.0%', pending: 2 },
    { name: 'Procurement & Contracts', docs: 48, latency: '3.4 hrs', compliance: '96.4%', pending: 4 },
    { name: 'Civil & Track Engineering', docs: 24, latency: '2.1 hrs', compliance: '92.5%', pending: 1 },
    { name: 'Operations & Traffic', docs: 19, latency: '1.8 hrs', compliance: '98.1%', pending: 3 },
    { name: 'Signaling & Telecom', docs: 13, latency: '2.7 hrs', compliance: '100.0%', pending: 1 },
    { name: 'Administration & HR', docs: 6, latency: '0.8 hrs', compliance: '94.2%', pending: 0 }
  ];

  const handleExport = () => {
    // Generate real CSV report download
    const csvRows = [
      ['Department', 'Documents Ingested', 'Avg Processing Time', 'Compliance Score', 'Pending Actions'],
      ...deptData.map((d) => [d.name, `${d.docs}`, d.latency, d.compliance, `${d.pending}`])
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.map(x => `"${x}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `KMRL_Analytics_Dossier_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-800 rounded-lg">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">{t.analytics.title}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.analytics.subtitle}
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
              <span className="text-emerald-700 font-bold">Dossier Exported (CSV)</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>{t.analytics.exportDossier}</span>
            </>
          )}
        </button>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">{t.analytics.docsProcessed}</div>
          <div className="text-2xl font-black text-slate-900 mt-1">142 Ingested</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">{t.analytics.docsProcessedSub}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">{t.analytics.avgTime}</div>
          <div className="text-2xl font-black text-slate-900 mt-1">2.1 hrs</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">{t.analytics.avgTimeSub}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">{t.analytics.ocrAccuracy}</div>
          <div className="text-2xl font-black text-slate-900 mt-1">98.1%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">{t.analytics.ocrAccuracySub}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">{t.analytics.actionsCompleted}</div>
          <div className="text-2xl font-black text-slate-900 mt-1">128 Dispatched</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">{t.analytics.actionsCompletedSub}</div>
        </div>
      </div>

      {/* Department Volume Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {t.analytics.tableTitle}
          </h3>
          <span className="text-xs text-slate-500">{t.analytics.tableSub}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
              <tr>
                <th className="p-3.5">{t.analytics.colDept}</th>
                <th className="p-3.5">{t.analytics.colDocs}</th>
                <th className="p-3.5">{t.analytics.colTime}</th>
                <th className="p-3.5">{t.analytics.colCompliance}</th>
                <th className="p-3.5 text-right">{t.analytics.colPending}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deptData.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{d.name}</td>
                  <td className="p-3.5 text-slate-700 font-mono">{d.docs} docs</td>
                  <td className="p-3.5 text-slate-600 font-mono">{d.latency}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                      {d.compliance}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-bold text-slate-900">{d.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
