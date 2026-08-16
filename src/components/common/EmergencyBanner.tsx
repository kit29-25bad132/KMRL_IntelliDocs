import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencyBanner: React.FC = () => {
  const { incidents, currentTab, setCurrentTab } = useApp();
  const [dismissedIncidentId, setDismissedIncidentId] = useState<string | null>(null);

  const criticalIncident = incidents.find(
    (i) =>
      i.severity === 'critical' &&
      i.status !== 'Mitigated' &&
      i.status !== 'Acknowledged' &&
      i.id !== dismissedIncidentId
  );

  // Only show when there is an active emergency and user is not already on the emergency incident console
  if (!criticalIncident || currentTab === 'emergency') return null;

  return (
    <div className="bg-red-700 text-white px-4 py-2 text-xs flex items-center justify-between shadow-md border-b border-red-800 shrink-0 z-30 transition-all">
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider bg-red-900/80 px-2 py-0.5 rounded border border-red-500/40 shrink-0">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          CRITICAL OPERATIONAL ALERT
        </span>
        <div className="flex items-center gap-2 truncate">
          <span className="font-bold truncate">{criticalIncident.title}</span>
          <span className="text-red-200 hidden md:inline truncate">
            • {criticalIncident.location} • SLA: {criticalIncident.slaRemainingMinutes}m
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-3">
        <button
          onClick={() => setCurrentTab('emergency')}
          className="px-2.5 py-1 bg-white text-red-700 hover:bg-red-50 rounded font-bold text-[11px] flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
        >
          <span>Open Incident Console</span>
          <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={() => setDismissedIncidentId(criticalIncident.id)}
          className="p-1 text-red-200 hover:text-white hover:bg-red-800 rounded transition-colors"
          title="Dismiss Banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

