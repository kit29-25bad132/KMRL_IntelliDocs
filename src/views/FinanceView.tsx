import React, { useState } from 'react';
import { Coins, AlertTriangle, FileText, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FinanceView: React.FC = () => {
  const { openDocumentViewer, openSimulationForDoc } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportLedger = () => {
    const payload = {
      exportTitle: 'KMRL Contract Milestones & Financial Ledger',
      timestamp: new Date().toISOString(),
      totalPortfolioValue: '₹15,80,00,000 INR',
      contracts: [
        {
          id: 'KMRL-CNT-2026-104',
          vendor: 'Apex Rail Tech Infra Ltd.',
          value: '₹3,40,00,000 INR',
          milestone3: '₹82,00,000 INR',
          variance: '+15 Days',
          ldStatus: 'Clause 11.1 Governed'
        },
        {
          id: 'KMRL-TEN-2026-319',
          vendor: 'Open Global RFP',
          value: '₹12,40,00,000 INR',
          status: 'Budget Approved',
          localContent: '>50%'
        }
      ]
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KMRL_Finance_Ledger_${Date.now()}.json`;
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
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Contract Financial Milestones & Exposure Engine</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated detection of voucher milestones, schedule shifts, and liquidated damages across active KMRL contracts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportLedger}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Ledger Exported</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export Ledger (JSON)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Critical Financial Alert Banner */}
      <div className="bg-amber-50/70 border-2 border-amber-300 rounded-xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-amber-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-600 text-white font-bold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase">
                  FINANCIAL DISBURSEMENT VARIANCE
                </span>
                <span className="text-xs font-semibold text-slate-700">Contract KMRL/PROC/2026/104</span>
              </div>
              <h2 className="text-sm font-bold text-slate-900 mt-0.5">
                Milestone #3 (₹82,00,000 INR) Release Shifted by +15 Calendar Days
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openDocumentViewer('KMRL-CNT-2026-104', 'c-104-2')}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Clause 7.3 Evidence
            </button>
            <button
              onClick={() => openSimulationForDoc('KMRL-CNT-2026-104')}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Simulate Financial Blast Radius</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3.5 text-xs">
          <div className="bg-white p-3 rounded-lg border border-amber-200">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Original Disbursal Date</div>
            <div className="font-bold text-slate-900 mt-0.5">28-Aug-2026</div>
            <div className="text-[11px] text-slate-500">Scheduled upon 30-day overhaul</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-amber-200">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Revised Estimated Date</div>
            <div className="font-bold text-amber-800 mt-0.5">12-Sept-2026</div>
            <div className="text-[11px] text-amber-700 font-semibold">+15 day variance buffer</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-amber-200">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Liquidated Damages Check</div>
            <div className="font-bold text-emerald-800 mt-0.5">Clause 11.1 Governed</div>
            <div className="text-[11px] text-slate-500">0.5% per week unapproved overrun</div>
          </div>
        </div>
      </div>

      {/* Contract Financial Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Active Procurement Contracts & Payment Milestones
          </h3>
          <span className="text-xs text-slate-500">All figures verified from Canonical JSON metadata</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">Contract KMRL/PROC/2026/104-REV2</span>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.2 rounded border border-slate-200">
                  Apex Rail Tech Infra Ltd.
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.2 rounded border border-amber-200">
                  Milestone Shifted
                </span>
              </div>
              <div className="text-slate-600">Traction Substation 25kV AC Transformer Overhaul SLA</div>
              <div className="text-[11px] text-slate-400">Total Contract: ₹3,40,00,000 INR | Milestone 3: ₹82,00,000 INR</div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openDocumentViewer('KMRL-CNT-2026-104')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Contract PDF</span>
              </button>
              <button
                onClick={() => openSimulationForDoc('KMRL-CNT-2026-104')}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold cursor-pointer"
              >
                Inspect Ledger
              </button>
            </div>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">Tender KMRL/PROC/TEN/319-2026</span>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.2 rounded border border-slate-200">
                  Open Global RFP
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2 rounded border border-emerald-200">
                  Budget Approved
                </span>
              </div>
              <div className="text-slate-600">Automated Fare Collection (AFC) QR & NCMC Turnstiles</div>
              <div className="text-[11px] text-slate-400">Estimated CAPEX: ₹12,40,00,000 INR | Class-1 Local Content &gt;50%</div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openDocumentViewer('KMRL-TEN-2026-319')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Tender PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
