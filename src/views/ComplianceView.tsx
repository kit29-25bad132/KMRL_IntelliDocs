import React, { useState } from 'react';
import { Scale, FileText, Download, CheckCircle2, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockComplianceItems } from '../data/mockData';

export const ComplianceView: React.FC = () => {
  const { openDocumentViewer } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredItems = mockComplianceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.regulationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const exportPayload = {
      exportTitle: 'KMRL Regulatory Compliance Registry Dossier',
      timestamp: new Date().toISOString(),
      items: filteredItems
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KMRL_Compliance_Report_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-800 rounded-lg">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Regulatory Compliance Command Center</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory verification across Commissioner of Metro Railway Safety (CMRS), MoHUA, and Kerala Fire & Safety mandates.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Report Exported</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export Compliance Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Compliance Health Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">CMRS Safety Mandates</div>
          <div className="text-xl font-bold text-slate-900 mt-1">98.0%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">All 14 Elevated Corridors Certified</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Kerala Fire & Safety</div>
          <div className="text-xl font-bold text-slate-900 mt-1">92.5%</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-0.5">1 Audit Due in 48 Hours</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">High-Voltage Grid Code</div>
          <div className="text-xl font-bold text-slate-900 mt-1">78.4%</div>
          <div className="text-[11px] text-red-600 font-semibold mt-0.5">1 Calibration Overdue</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">NCMC Interoperability</div>
          <div className="text-xl font-bold text-slate-900 mt-1">100.0%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">EMVCo Level 3 Standard Active</div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search regulations, codes..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          {['all', 'Compliant', 'Due_Soon', 'Non_Compliant'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                filterStatus === status
                  ? 'bg-blue-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'all' ? 'All Frameworks' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Compliance Registry Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Statutory Compliance Items & Audit Registry
          </h3>
          <span className="text-xs text-slate-500 font-medium">{filteredItems.length} Regulatory Standards Tracked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
              <tr>
                <th className="p-3.5">Regulation Code & Title</th>
                <th className="p-3.5">Authority</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Compliance Score</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">{item.regulationCode}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded text-[11px] border border-slate-200">
                      {item.issuingAuthority}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">{item.department}</td>
                  <td className="p-3.5 text-slate-600 font-mono text-[11px]">{item.dueDate}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            item.complianceScore >= 90
                              ? 'bg-emerald-600'
                              : item.complianceScore >= 80
                              ? 'bg-amber-500'
                              : 'bg-red-600'
                          }`}
                          style={{ width: `${item.complianceScore}%` }}
                        />
                      </div>
                      <span className="font-bold text-[11px] text-slate-700">{item.complianceScore}%</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.status === 'Compliant'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : item.status === 'Due_Soon'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => openDocumentViewer(item.evidenceDocId)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 text-teal-700 border border-teal-200 rounded font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Clause p.{item.evidencePage}</span>
                    </button>
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
