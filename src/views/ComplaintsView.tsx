import React, { useState } from 'react';
import { MessageSquareWarning, Clock, FileText, Download, CheckCircle2, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockComplaints } from '../data/mockData';

export const ComplaintsView: React.FC = () => {
  const { openDocumentViewer } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = mockComplaints.filter((ticket) => {
    return (
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.stationOrLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleExport = () => {
    const payload = {
      exportTitle: 'KMRL Passenger & Operational Grievance SLA Register',
      exportDate: new Date().toISOString(),
      tickets: filteredTickets
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KMRL_Grievances_${Date.now()}.json`;
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
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-lg">
            <MessageSquareWarning className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Passenger & Operational Grievance SLA Queue</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated classification, grounded SOP correlation, and SLA tracking for metro passenger & facilities grievances.
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Exported JSON</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Export Summary</span>
            </>
          )}
        </button>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Active Grievances</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{mockComplaints.length}</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-0.5">1 High-Priority SLA Active</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">SLA Compliance Rate</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">98.1%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Within 8-hour target envelope</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Auto-Classified via SOP</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">100%</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Grounded to Line-1 & AFC Rules</div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by ID, station, or category..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Showing {filteredTickets.length} of {mockComplaints.length} tickets
        </span>
      </div>

      {/* Ticket List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Operational Grievance Tickets
          </h3>
          <span className="text-xs text-slate-500">Real-time SLA Countdown</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{ticket.ticketNumber}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded uppercase ${
                        ticket.priority === 'high'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : ticket.priority === 'medium'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {ticket.priority} Priority
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.2 rounded border border-slate-200">
                      {ticket.category}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{ticket.subject}</h4>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    <span>Origin: <strong className="text-slate-700">{ticket.origin}</strong></span>
                    <span>• Location: <strong className="text-slate-700">{ticket.stationOrLocation}</strong></span>
                    <span>• Assigned: <strong className="text-slate-700">{ticket.assignedTo}</strong></span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {ticket.slaHoursRemaining}h remaining
                    </span>
                    <div className="text-[10px] text-slate-400 font-medium">Logged {ticket.submittedAt}</div>
                  </div>

                  {ticket.relatedDocId && (
                    <button
                      onClick={() => openDocumentViewer(ticket.relatedDocId!)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 text-emerald-700 border border-emerald-200 rounded text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                    >
                      <FileText className="w-3 h-3" />
                      <span>SOP Policy</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
