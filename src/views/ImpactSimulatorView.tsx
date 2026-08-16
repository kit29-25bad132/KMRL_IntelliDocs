import React, { useState } from 'react';
import {
  Zap,
  ShieldCheck,
  FileText,
  ExternalLink,
  CheckCircle2,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ImpactSimulatorView: React.FC = () => {
  const { currentSimulation, verifyAndSignoffImpact, openDocumentViewer, t } = useApp();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-change');
  const [selectedActions, setSelectedActions] = useState<string[]>(['act-1', 'act-2', 'act-3']);
  const [officerNotes, setOfficerNotes] = useState('');
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  const selectedNode =
    currentSimulation.nodes.find((n) => n.id === selectedNodeId) || currentSimulation.nodes[0];

  const handleActionToggle = (actionId: string) => {
    setSelectedActions((prev) =>
      prev.includes(actionId) ? prev.filter((id) => id !== actionId) : [...prev, actionId]
    );
  };

  const handleSignoff = () => {
    if (selectedActions.length === 0) return;
    const count = selectedActions.length;
    verifyAndSignoffImpact(selectedActions, officerNotes);

    // Clear selected actions and officer notes as requested
    setSelectedActions([]);
    setOfficerNotes('');
    setDispatchSuccess(true);
    setTimeout(() => setDispatchSuccess(false), 4000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500 text-white rounded-lg shadow-sm">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                {t.simulator.title}
              </h1>
              <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded border border-amber-300">
                {t.simulator.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              {t.simulator.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
              currentSimulation.status === 'Human_Approved'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {currentSimulation.status === 'Human_Approved'
                ? `${t.simulator.signedOff} (${currentSimulation.verifiedBy})`
                : t.simulator.pendingSignoff}
            </span>
          </span>
        </div>
      </div>

      {/* Dispatched Notification Toast Banner */}
      {dispatchSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-3 shadow-sm animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="flex-1">
            <strong className="font-bold text-sm block">Mitigation Actions Authorized & Dispatched!</strong>
            <span>Tasks have been routed to relevant directorate queues, and ledger entries recorded with cryptographic hash verification.</span>
          </div>
        </div>
      )}

      {/* Hero KPI Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">
            {t.simulator.triggeringChange}
          </div>
          <div className="font-bold text-slate-900 text-sm mt-0.5">Clause 4.2 Overhaul</div>
          <div className="text-[11px] text-red-600 font-semibold mt-0.5">30 → 45 Days (+15d overrun)</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">
            {t.simulator.financialExposure}
          </div>
          <div className="font-bold text-slate-900 text-sm mt-0.5">{currentSimulation.financialExposure}</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-0.5">Milestone 3 Disbursal Shifted</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">
            {t.simulator.downstreamNodes}
          </div>
          <div className="font-bold text-slate-900 text-sm mt-0.5">{currentSimulation.nodes.length} Connected Items</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">2 Work Orders • 1 Vendor</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">
            {t.simulator.affectedDept}
          </div>
          <div className="font-bold text-slate-900 text-sm mt-0.5">4 Directorates</div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">Engg, Fin, Ops, Safety</div>
        </div>
      </div>

      {/* Main Interactive Blast Radius Graph & Evidence Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Blast Radius Dependency Map (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t.simulator.graphTitle}
              </h3>
              <p className="text-[11px] text-slate-500">
                {t.simulator.graphSubtitle}
              </p>
            </div>
            <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {t.simulator.deterministicTraversal}
            </span>
          </div>

          {/* Interactive Graph Node Grid */}
          <div className="space-y-3 pt-2">
            {/* Level 0: Root Cause Change */}
            <div className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {t.simulator.triggeringChange}
              </div>
              <div
                onClick={() => setSelectedNodeId('node-change')}
                className={`max-w-md mx-auto p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedNodeId === 'node-change'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                    : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase bg-black/20 px-2 py-0.5 rounded">
                    AMENDED CLAUSE 4.2
                  </span>
                  <span className="text-xs font-mono font-bold">+15 Days Shift</span>
                </div>
                <div className="text-xs font-bold mt-1 text-left">
                  Traction Substation Maintenance SLA (v2.1)
                </div>
              </div>
            </div>

            {/* Connecting Arrow Down */}
            <div className="flex justify-center text-slate-400 font-mono text-xs">
              ↓ Direct Operational Impact Layer ↓
            </div>

            {/* Level 1: Traced Cascading Dependencies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentSimulation.nodes.slice(1, 5).map((node) => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3 rounded-xl border cursor-pointer text-left transition-all ${
                      isSelected
                        ? 'bg-teal-800 text-white border-teal-900 shadow-md ring-2 ring-teal-400'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {node.type.replace('_', ' ')}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          node.severity === 'critical'
                            ? isSelected ? 'text-red-200' : 'text-red-600'
                            : isSelected ? 'text-amber-200' : 'text-amber-600'
                        }`}
                      >
                        {node.metrics}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate">{node.label}</div>
                    <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                      {node.sublabel}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting Arrow Down */}
            <div className="flex justify-center text-slate-400 font-mono text-xs">
              ↓ Cascading Financial & Regulatory Buffers ↓
            </div>

            {/* Level 2: Financial, Regulatory & Operational Tasks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentSimulation.nodes.slice(5).map((node) => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3 rounded-xl border cursor-pointer text-left transition-all ${
                      isSelected
                        ? 'bg-teal-800 text-white border-teal-900 shadow-md ring-2 ring-teal-400'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {node.department}
                      </span>
                      <span className={`text-[9px] font-bold ${isSelected ? 'text-red-200' : 'text-red-600'}`}>
                        {node.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate">{node.label}</div>
                    <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                      {node.metrics}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Node Evidence & Human-in-the-Loop Sign-off (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Node Evidence Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t.simulator.provenanceTitle}
              </span>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {selectedNode.department}
              </span>
            </div>

            <div>
              <div className="text-sm font-bold text-slate-900">{selectedNode.label}</div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">{selectedNode.sublabel}</div>
            </div>

            {/* Evidence details */}
            <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-lg text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-teal-900 font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>Source: {selectedNode.evidenceRef.docTitle}</span>
              </div>
              <div className="text-slate-700 text-[11px]">
                {selectedNode.evidenceRef.clause} • Page {selectedNode.evidenceRef.page}
              </div>
              <button
                onClick={() => openDocumentViewer(selectedNode.evidenceRef.docId)}
                className="mt-1 text-teal-700 hover:text-teal-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <span>{t.simulator.jumpToDoc}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Recommended Mitigation Actions & Human-in-the-Loop Sign-off */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Recommended Mitigation Actions
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400">
                Human Sign-off Required
              </span>
            </div>

            <div className="space-y-2">
              {currentSimulation.recommendedActions.map((act) => {
                const isChecked = selectedActions.includes(act.id);
                return (
                  <div
                    key={act.id}
                    onClick={() => handleActionToggle(act.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors flex items-start gap-2.5 text-xs ${
                      act.executed
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 opacity-90'
                        : isChecked
                        ? 'bg-teal-50/70 border-teal-300 text-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked || !!act.executed}
                      onChange={() => {}}
                      className="mt-0.5 h-3.5 w-3.5 text-teal-700 rounded border-slate-300 focus:ring-teal-700 cursor-pointer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 leading-snug flex items-center gap-1.5">
                        <span>{act.title}</span>
                        {act.executed && (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" />
                            DISPATCHED
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Assignee: <strong className="text-slate-700">{act.assigneeRole.replace(/_/g, ' ')}</strong> • Due: {act.deadline}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Officer Notes */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700">
                Officer Authorization Notes / Addendum Reference
              </label>
              <textarea
                value={officerNotes}
                onChange={(e) => setOfficerNotes(e.target.value)}
                placeholder="e.g., Authorized contingency feeder power shift under OCC Protocol 14..."
                rows={2}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
              />
            </div>

            {/* Sign-off Action Button */}
            <button
              onClick={handleSignoff}
              disabled={selectedActions.length === 0}
              className={`w-full py-2.5 rounded-lg text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                selectedActions.length > 0
                  ? 'bg-teal-700 hover:bg-teal-800 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {selectedActions.length > 0
                  ? `${t.simulator.authorizeAndDispatch} (${selectedActions.length})`
                  : 'Select Actions to Dispatch'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
