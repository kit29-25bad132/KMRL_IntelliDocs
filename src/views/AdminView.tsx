import React, { useState } from 'react';
import {
  ShieldAlert,
  Cpu,
  Sliders,
  Users,
  CheckCircle2,
  AlertTriangle,
  Lock,
  RefreshCw,
  Key,
  Shield,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminView: React.FC = () => {
  const { availableUsers, user, setUserRole, t } = useApp();
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(92);
  const [autoEscalate, setAutoEscalate] = useState<boolean>(true);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash');

  const isSuperAdmin = user.role === 'Super_Admin' || user.permissions.includes('SYSTEM_ADMIN');
  const superAdminUser = availableUsers.find((u) => u.role === 'Super_Admin');

  // RBAC Access Control Guard
  if (!isSuperAdmin) {
    return (
      <div className="p-6 md:p-12 max-w-3xl mx-auto my-12 bg-white rounded-2xl border border-slate-200 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
            RBAC Clearance Enforcement
          </span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-2">
            {t.accessControl.restrictedTitle}
          </h2>
          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            {t.accessControl.restrictedDesc}
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs max-w-md mx-auto space-y-2 text-left">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">{t.accessControl.currentClearance}:</span>
            <span className="font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded">
              {user.name} ({user.role.replace(/_/g, ' ')})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">{t.accessControl.requiredClearance}:</span>
            <span className="font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded border border-teal-200">
              Super_Admin (Level 5 Root)
            </span>
          </div>
        </div>

        {superAdminUser && (
          <div className="pt-2">
            <button
              onClick={() => setUserRole(superAdminUser.id)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm inline-flex items-center gap-2 transition-all"
            >
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>Switch to {superAdminUser.name} ({t.accessControl.superAdminRole})</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 text-white rounded-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                Super Admin & AI Governance Center
              </h1>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300">
                ENTERPRISE CONTROL
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Model routing policies, deterministic safety thresholds, RBAC permissions, and Human-in-the-Loop governance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
            ✓ System Governance Pass Rate: 99.8%
          </span>
        </div>
      </div>

      {/* Model Router & Safety Configurations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model Router Configuration */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-bold text-slate-900 uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-teal-700" />
            <span>AI Model Routing & Gateway</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Active Reasoning Model (Operational Copilot & Blast Simulator)
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended - Low Latency & High Precision)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Multi-Clause Reasoning)</option>
                <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash-Lite (High Volume Document Classification)</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-700">
                <span>Minimum Document Extraction Confidence Threshold</span>
                <span className="text-teal-700 font-mono">{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="99"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-teal-700 cursor-pointer"
              />
              <div className="text-[11px] text-slate-500">
                Extractions scoring below {confidenceThreshold}% are automatically routed to human officer verification queue.
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Escalation Rules */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-bold text-slate-900 uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-teal-700" />
            <span>Auto-Escalation & Safety Guardrails</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <div className="font-bold text-slate-900">Mandatory Human Sign-off for High Risk</div>
                <div className="text-[11px] text-slate-500">
                  Precludes autonomous modification of contract terms and work orders.
                </div>
              </div>
              <span className="bg-teal-100 text-teal-800 font-bold text-[10px] px-2 py-0.5 rounded border border-teal-200">
                ENFORCED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <div className="font-bold text-slate-900">Auto-Escalate Critical Telemetry Latency</div>
                <div className="text-[11px] text-slate-500">
                  Broadcast alarms when signal telemetry latency &gt;40ms exceeds 3 cycles.
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoEscalate}
                onChange={(e) => setAutoEscalate(e.target.checked)}
                className="h-4 w-4 text-teal-700 rounded border-slate-300 focus:ring-teal-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* User Management & RBAC Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Role-Based Access Control (RBAC) User Registry
            </h3>
          </div>
          <span className="text-xs text-slate-500">PostgreSQL Row-Level Security Enforced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
              <tr>
                <th className="p-3.5">Officer Name & ID</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Permissions Granted</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {availableUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">{u.employeeId} • {u.email}</div>
                  </td>
                  <td className="p-3.5">
                    <span className={`font-semibold px-2 py-0.5 rounded text-[11px] border ${
                      u.role === 'Super_Admin'
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                        : 'bg-slate-100 text-slate-800 border-slate-200'
                    }`}>
                      {u.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">{u.department}</td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {u.permissions.map((p, idx) => (
                        <span key={idx} className="bg-slate-50 text-slate-600 text-[10px] font-mono px-1.5 py-0.2 rounded border border-slate-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 text-right">
                    <span className="text-teal-800 font-bold text-[11px] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Active (MFA)
                    </span>
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
