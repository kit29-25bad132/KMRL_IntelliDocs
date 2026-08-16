import React, { useState, useEffect } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Clock,
  ShieldAlert,
  CheckCircle2,
  FileText,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmergencyView: React.FC = () => {
  const { incidents, acknowledgeIncident, escalateIncident, openDocumentViewer, user, t } = useApp();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(incidents[0]?.id || '');
  const [countdown, setCountdown] = useState<number>(28);

  const activeIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 28));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-red-50/80 border border-red-200 p-5 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-600 text-white rounded-xl shadow-sm">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-red-950 uppercase tracking-tight">
                {t.emergency.title}
              </h1>
              <span className="bg-red-200 text-red-900 font-bold text-[10px] px-2 py-0.5 rounded border border-red-300">
                LIVE DISPATCH
              </span>
            </div>
            <p className="text-xs text-red-800 font-medium mt-0.5">
              {t.emergency.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-red-900 bg-white px-3 py-1.5 rounded-lg border border-red-200 shadow-2xs">
            OCC Dispatcher: {user.name}
          </span>
        </div>
      </div>

      {/* Incident Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Incidents */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Active Alarms ({incidents.length})
          </div>

          <div className="space-y-2.5">
            {incidents.map((inc) => {
              const isSelected = inc.id === selectedIncidentId;
              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncidentId(inc.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-red-50/80 border-red-500 shadow-sm ring-1 ring-red-400'
                      : 'bg-white border-slate-200 hover:border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                        inc.severity === 'critical'
                          ? 'bg-red-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {inc.severity}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">{inc.detectedAt}</span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 leading-snug">{inc.title}</div>
                  <div className="text-[11px] text-slate-600 font-medium mt-1">
                    {inc.location} • {inc.department}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-red-700 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      SLA: {countdown}m {t.emergency.slaRemaining}
                    </span>
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                        inc.status === 'Acknowledged'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inc.status === 'Escalated'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inc.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Selected Incident Workspace */}
        {activeIncident && (
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-5">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded border border-red-200">
                    INCIDENT ID: {activeIncident.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Escalation Level {activeIncident.escalationLevel}
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900">{activeIncident.title}</h2>
                <div className="text-xs text-slate-600 mt-0.5">
                  Location: <span className="font-semibold text-slate-800">{activeIncident.location}</span> | Assigned: <span className="font-semibold text-slate-800">{activeIncident.assignedOfficer}</span>
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 bg-red-100 text-red-900 border border-red-200 rounded-lg text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  {activeIncident.status}
                </span>
              </div>
            </div>

            {/* Incident Summary & SOP Mandate */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Telemetry Diagnostics & Impact Analysis
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200 font-normal">
                {activeIncident.summary}
              </p>
            </div>

            {/* Evidence & Grounded SOP References */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t.emergency.groundedSopEvidence}
              </h3>

              <div className="space-y-2">
                {activeIncident.evidenceDocs.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-teal-50/60 border border-teal-200 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">{ev.docTitle}</div>
                        <div className="text-[11px] text-slate-600 font-medium">
                          {ev.clause} • {t.labels.page} {ev.page} • Mandatory 120s Switchover Threshold
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openDocumentViewer(ev.docId)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 text-teal-800 border border-teal-300 rounded text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
                    >
                      <span>Inspect SOP</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dispatch & Escalation Action Matrix */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                {activeIncident.acknowledgedBy ? (
                  <span className="text-teal-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    Acknowledged by {activeIncident.acknowledgedBy}
                  </span>
                ) : (
                  <span className="text-red-700 font-semibold">
                    Awaiting Official Duty Officer Sign-off
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => escalateIncident(activeIncident.id)}
                  className="px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{t.emergency.escalate}</span>
                </button>

                <button
                  onClick={() => acknowledgeIncident(activeIncident.id)}
                  disabled={activeIncident.status === 'Acknowledged'}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold shadow-sm transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.emergency.acknowledge}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
