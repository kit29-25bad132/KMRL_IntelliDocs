import React, { useState } from 'react';
import {
  AlertTriangle,
  FileText,
  Clock,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  AlertCircle,
  History,
  Sparkles,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomeView: React.FC = () => {
  const {
    user,
    documents,
    incidents,
    tasks,
    notifications,
    auditLogs,
    openDocumentViewer,
    openSimulationForDoc,
    setCurrentTab,
    startDemoTour,
    openIngestModal,
    t
  } = useApp();

  const pendingDocsCount = documents.filter((d) => d.metadata.status === 'Action_Required' || d.metadata.status === 'Draft').length;
  const criticalIncidentsCount = incidents.filter((i) => i.severity === 'critical' && i.status !== 'Mitigated').length;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Subheader / Breadcrumb matching Image 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <span className="text-slate-600 font-semibold">{t.dashboard.breadcrumb.split('/')[0]}</span>
          <span>/</span>
          <span className="text-teal-700 font-bold">{t.dashboard.breadcrumb.split('/')[1] || 'Dashboard Overview'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openIngestModal}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.dashboard.ingestDocument}</span>
          </button>
          <button
            onClick={startDemoTour}
            className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-200" />
            <span>{t.dashboard.startDemoTour}</span>
          </button>
        </div>
      </div>

      {/* 4 Hero KPI Cards matching Image 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Documents Processed Today */}
        <div
          onClick={() => setCurrentTab('documents')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs cursor-pointer transition-all hover:shadow-xs group"
        >
          <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
            {t.dashboard.docsProcessedToday}
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {40 + documents.length}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 12% {t.dashboard.vsYesterday}</span>
          </div>
        </div>

        {/* Card 2: Pending Review */}
        <div
          onClick={() => setCurrentTab('documents')}
          className="bg-white p-5 rounded-xl border border-amber-200/80 hover:border-amber-300 shadow-2xs cursor-pointer transition-all hover:shadow-xs group"
        >
          <div className="text-[11px] font-bold text-amber-700 tracking-wider uppercase">
            {t.dashboard.pendingReview}
          </div>
          <div className="text-3xl font-black text-amber-600 mt-2">
            {10 + pendingDocsCount}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Requires Human Sign-off
          </div>
        </div>

        {/* Card 3: Critical Alerts */}
        <div
          onClick={() => setCurrentTab('emergency')}
          className="bg-white p-5 rounded-xl border border-red-200/80 hover:border-red-300 shadow-2xs cursor-pointer transition-all hover:shadow-xs group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-bold text-red-600 tracking-wider uppercase">
              {t.dashboard.criticalAlerts}
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          </div>
          <div className="text-3xl font-black text-red-600 mt-2">
            {Math.max(1, criticalIncidentsCount)}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Aluva Telemetry Latency SLA
          </div>
        </div>

        {/* Card 4: Compliance Score */}
        <div
          onClick={() => setCurrentTab('compliance')}
          className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs cursor-pointer transition-all hover:shadow-xs group flex items-center justify-between"
        >
          <div>
            <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
              {t.dashboard.complianceScore}
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">
              98.1%
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">
              ✓ Metro Safety Audit Pass
            </div>
          </div>
          {/* Circular Visual Gauge */}
          <div className="w-12 h-12 rounded-full border-4 border-teal-500 border-t-teal-200 flex items-center justify-center font-bold text-[10px] text-teal-800 shadow-inner">
            98%
          </div>
        </div>
      </div>

      {/* Main Two-Column Section matching Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Priority Document Intelligence Queue */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {t.dashboard.priorityQueueTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.dashboard.priorityQueueSubtitle}
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('notifications')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors"
            >
              <span>{t.dashboard.goToInbox}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Item 1: Critical Joint Safety Audit */}
            <div className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Critical
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 hover:text-teal-700 cursor-pointer" onClick={() => openDocumentViewer('KMRL-SOP-2026-088', 'cl-sop-03')}>
                    Joint Safety Audit Report: Aluva-Kalamassery Section
                  </h3>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  SAFETY & QUALITY ASSURANCE • 10 mins ago
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  <span className="font-semibold text-slate-800">AI Summary:</span> Significant track wear and signal degradation identified between pillar 120-140. Mandatory speed restriction to 40 km/h recommended until ballast consolidation.
                </p>
              </div>
              <button
                onClick={() => openDocumentViewer('KMRL-SOP-2026-088', 'cl-sop-03')}
                className="self-start sm:self-center px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shrink-0 shadow-2xs"
              >
                {t.dashboard.review}
              </button>
            </div>

            {/* Item 2: High Tender Bid Analysis */}
            <div className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    High
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 hover:text-teal-700 cursor-pointer" onClick={() => openSimulationForDoc('KMRL-CNT-2026-104')}>
                    Tender Bid Analysis for Edapally Station Roofing Works
                  </h3>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  FINANCE & PROCUREMENT • 1 hour ago
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  <span className="font-semibold text-slate-800">AI Summary:</span> Discrepancy in unit rates found; bid 3 deviates 18% below benchmark cost. Requires cross-verification against master procurement guidelines.
                </p>
              </div>
              <button
                onClick={() => openSimulationForDoc('KMRL-CNT-2026-104')}
                className="self-start sm:self-center px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shrink-0 shadow-2xs"
              >
                {t.dashboard.review}
              </button>
            </div>

            {/* Item 3: High Kerala Govt Circular */}
            <div className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    High
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 hover:text-teal-700 cursor-pointer" onClick={() => openDocumentViewer('KMRL-CIR-2026-042', 'cl-cir-01')}>
                    Kerala Govt Circular: Standardized Emergency Command Protocol
                  </h3>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  OPERATIONS & TRAFFIC • 2 hours ago
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  <span className="font-semibold text-slate-800">AI Summary:</span> New mandated directives for immediate coordination with district medical teams and rapid station isolation during signal telemetry failure.
                </p>
              </div>
              <button
                onClick={() => openDocumentViewer('KMRL-CIR-2026-042', 'cl-cir-01')}
                className="self-start sm:self-center px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shrink-0 shadow-2xs"
              >
                {t.dashboard.review}
              </button>
            </div>

            {/* Item 4: Medium Substation Maintenance */}
            <div className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    Medium
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 hover:text-teal-700 cursor-pointer" onClick={() => openDocumentViewer('KMRL-CNT-2026-104', 'cl-cnt-02')}>
                    Quarterly High-Voltage Substation Maintenance Log
                  </h3>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  CIVIL & TRACK ENGINEERING • 4 hours ago
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  <span className="font-semibold text-slate-800">AI Summary:</span> Transformer 3 oil levels stable; cooling fan bearings flagged for proactive servicing prior to monsoon load surge.
                </p>
              </div>
              <button
                onClick={() => openDocumentViewer('KMRL-CNT-2026-104', 'cl-cnt-02')}
                className="self-start sm:self-center px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shrink-0 shadow-2xs"
              >
                {t.dashboard.review}
              </button>
            </div>

            {/* Item 5: Medium Passenger Flow Survey */}
            <div className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    Medium
                  </span>
                  <h3 className="text-xs font-bold text-slate-900">
                    Kaloor Passenger Flow Optimization Survey
                  </h3>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  OPERATIONS & TRAFFIC • 5 hours ago
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  <span className="font-semibold text-slate-800">AI Summary:</span> AI analytics model suggests minor 3-minute schedule offset to match evening rush transit interchange at JLN Stadium.
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('analytics')}
                className="self-start sm:self-center px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shrink-0 shadow-2xs"
              >
                {t.dashboard.review}
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Officer Audit Timeline matching Image 2 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {t.dashboard.auditTimelineTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.dashboard.auditTimelineSubtitle}
            </p>
          </div>

          {/* Timeline items */}
          <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {/* Timeline Item 1 */}
            <div className="relative group">
              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-white" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Reviewed safety audit</span>
                <span className="text-[11px] font-mono text-slate-400">09:12 AM</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                MG Road escalator inspection sign-off completed.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative group">
              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-white" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Approved procurement order</span>
                <span className="text-[11px] font-mono text-slate-400">08:45 AM</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Acquisition of standard track fastening clips (Batch 4).
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative group">
              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-white" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Escalated maintenance alert</span>
                <span className="text-[11px] font-mono text-slate-400">08:10 AM</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Aluva station line feedback variance routed to Chief Engineer.
              </p>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative group">
              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-white" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Extracted legal terms</span>
                <span className="text-[11px] font-mono text-slate-400">Yesterday</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Station commercial retail agreement parsed for compliance.
              </p>
            </div>

            {/* Timeline Item 5 */}
            <div className="relative group">
              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-white" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Flagged budget anomaly</span>
                <span className="text-[11px] font-mono text-slate-400">Yesterday</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Civil works billing discrepancy routed back to vendor.
              </p>
            </div>

            {/* Timeline Item 6 */}
            <div className="relative group">
              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-white" />
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Uploaded central directive</span>
                <span className="text-[11px] font-mono text-slate-400">Yesterday</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                State Disaster Management authority guidelines indexed.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <button
              onClick={() => setCurrentTab('audit')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"
            >
              <span>View Full Cryptographic Audit Trail</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Active AI Structural & Fiscal Alerts matching Image 2 */}
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            {t.dashboard.activeAlertsTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.dashboard.activeAlertsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Alert Card 1: Budget Variance */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-mono">
                  94% {t.dashboard.confidence}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                Budget variance detected in Q3 procurement
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contract billing rates for concrete sleepers exceed historical master agreement by 12%.
              </p>
            </div>
            <button
              onClick={() => openDocumentViewer('KMRL-CNT-2026-104', 'cl-cnt-02')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 pt-2 border-t border-slate-100"
            >
              <span>{t.dashboard.viewEvidenceSource}</span>
              <span>→</span>
            </button>
          </div>

          {/* Alert Card 2: Critical Compliance Alignment */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-mono">
                  98% {t.dashboard.confidence}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                Critical compliance alignment verified
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operations protocols are 100% compliant with National Metro Rail Safety Code 2024 amendments.
              </p>
            </div>
            <button
              onClick={() => openDocumentViewer('KMRL-SOP-2026-088', 'cl-sop-01')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 pt-2 border-t border-slate-100"
            >
              <span>{t.dashboard.viewEvidenceSource}</span>
              <span>→</span>
            </button>
          </div>

          {/* Alert Card 3: Preventative Maintenance Cycle */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                  <History className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-mono">
                  87% {t.dashboard.confidence}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                Preventative Maintenance cycle predicted overdue
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Edapally substation transformer oil analytics suggest inspection schedule must accelerate 8 days.
              </p>
            </div>
            <button
              onClick={() => openSimulationForDoc('KMRL-CNT-2026-104')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 pt-2 border-t border-slate-100"
            >
              <span>{t.dashboard.viewEvidenceSource}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
