import React, { useState } from 'react';
import { GitCompare, Zap, ArrowRight, FileText, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VersionComparisonView: React.FC = () => {
  const { setCurrentTab, openSimulationForDoc } = useApp();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-800 rounded-lg">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">Document Time Machine & Version Diff</h1>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-200">
                AMENDMENT TRACKER
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side comparative analysis between Contract KMRL-104 v1.0 (Original) vs v2.1 (Amended Addendum).
            </p>
          </div>
        </div>

        <button
          onClick={() => openSimulationForDoc('KMRL-CNT-2026-104')}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Zap className="w-4 h-4" />
          <span>Simulate Operational Impact</span>
        </button>
      </div>

      {/* Difference Summary Alert */}
      <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <div>
            <span className="font-bold text-xs text-slate-900">1 Critical Schedule Clause Variance Detected</span>
            <p className="text-xs text-slate-600 mt-0.5 font-normal">
              Clause 4.2 duration amended: <strong className="text-slate-800">30 calendar days → 45 calendar days</strong> (+15 days delivery delay).
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 shrink-0">
          High Operational Risk
        </span>
      </div>

      {/* Side-by-Side Comparison Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Version 1.0 (Original) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Contract KMRL-104 (Version 1.0)</span>
            <span className="text-[10px] text-slate-500 font-mono">Uploaded 2026-08-01</span>
          </div>

          <div className="p-5 space-y-4 text-xs font-serif leading-relaxed text-slate-700">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-sans">
              <span className="font-bold text-slate-900 block mb-1">Clause 4.2: Delivery & Overhaul Turnaround</span>
              <p className="line-through bg-red-50 text-red-800 p-2 rounded border border-red-200 font-mono text-[11px]">
                The Contractor (Apex Rail Tech Infra) shall complete scheduled diagnostic overhaul and component replacement within 30 (Thirty) calendar days from receipt of Site Possession Notice.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-sans">
              <span className="font-bold text-slate-900 block mb-1">Clause 7.3: Milestone 3 Payment</span>
              <p className="text-slate-700 font-mono text-[11px]">
                Payment of Milestone 3 (₹82,00,000 INR) shall be released upon submission of dual-transformer dielectric test report within 30 days of mobilization.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Version 2.1 (Amended) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3 bg-emerald-50/80 border-b border-emerald-200 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-900">Contract KMRL-104 (Version 2.1 - Active)</span>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              AMENDMENT ADDENDUM
            </span>
          </div>

          <div className="p-5 space-y-4 text-xs font-serif leading-relaxed text-slate-800">
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-300 font-sans">
              <span className="font-bold text-slate-900 block mb-1">Clause 4.2: Delivery & Overhaul Turnaround (Amended)</span>
              <p className="bg-amber-100 text-amber-950 font-bold p-2 rounded border border-amber-300 font-mono text-[11px]">
                The Contractor (Apex Rail Tech Infra) shall complete scheduled diagnostic overhaul and component replacement within 45 (Forty Five) calendar days from receipt of Site Possession Notice.
              </p>
              <div className="text-[11px] text-amber-900 font-semibold mt-1.5">
                → Triggers +15 day delay across Work Orders WO-782 & WO-810.
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-sans">
              <span className="font-bold text-slate-900 block mb-1">Clause 7.3: Milestone 3 Payment</span>
              <p className="text-slate-800 font-mono text-[11px]">
                Payment of Milestone 3 (₹82,00,000 INR) shall be released upon submission of dual-transformer dielectric test report (Disbursement window shifted to Sept 12).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
