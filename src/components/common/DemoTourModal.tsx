import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  FileText,
  Zap,
  GitCompare,
  History,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoTourModal: React.FC = () => {
  const { isDemoTourActive, demoTourStep, nextDemoTourStep, prevDemoTourStep, endDemoTour } = useApp();

  if (!isDemoTourActive) return null;

  const tourSteps = [
    {
      step: 1,
      title: 'Step 1: Operational Change Detected on Dashboard',
      description:
        'Officer Harish Kumar logs into KMRL IntelliDocs. The system highlights a high-impact contract amendment: Contract KMRL/2026/104 delivery schedule shifted from 30 days to 45 days.',
      actionPrompt: 'Click "View Grounded Evidence" to inspect the highlighted clause in the original contract.',
      buttonText: 'View Grounded Evidence →',
      icon: Zap
    },
    {
      step: 2,
      title: 'Step 2: Split-Screen Document Viewer & Grounded Evidence',
      description:
        'The original PDF is rendered on the left with exact highlighted Clause 4.2. On the right, Canonical Document Intelligence extracts verified metadata, affected work orders, and financial dependencies.',
      actionPrompt: 'Click "Compare Document Versions" to inspect the side-by-side time machine diff.',
      buttonText: 'Compare Versions (Diff) →',
      icon: FileText
    },
    {
      step: 3,
      title: 'Step 3: Document Time Machine & Clause Diffing',
      description:
        'Side-by-side comparison of v1.0 vs v2.1 highlights the specific text modified: "30 calendar days" → "45 calendar days", flagging downstream project schedule delay risks.',
      actionPrompt: 'Click "Simulate Impact" to execute the Flagship Operational Blast Radius graph.',
      buttonText: 'Simulate Blast Radius →',
      icon: GitCompare
    },
    {
      step: 4,
      title: 'Step 4: Operational Blast Radius & Dependency Tracing',
      description:
        'IntelliDocs traces verified dependencies: Changed Clause → Master Contract → Work Orders WO-782 & WO-810 → Apex Rail Tech → Milestone 3 (₹82 Lakhs Delayed) → CMRS Safety Inspection Buffer.',
      actionPrompt: 'Click "Authorize Human-in-the-Loop Sign-off" to dispatch mitigation tasks.',
      buttonText: 'Authorize & Sign-off →',
      icon: Zap
    },
    {
      step: 5,
      title: 'Step 5: Human Verification & Autonomous Task Dispatch',
      description:
        'The Officer reviews the 4 AI-recommended mitigation actions and signs off. Instant task tickets are generated for Engineering, Finance, and OCC with strict SLA deadlines.',
      actionPrompt: 'Click "Inspect Audit Trail" to review the immutable compliance log.',
      buttonText: 'Inspect Audit Trail →',
      icon: ShieldCheck
    },
    {
      step: 6,
      title: 'Step 6: Cryptographic & Departmental Audit Trail',
      description:
        'Every single step (OCR, AI analysis, evidence viewed, blast simulation, officer sign-off) is immutably recorded with timestamps, user IDs, and evidence links.',
      actionPrompt: 'Tour Completed! You have witnessed the complete end-to-end IntelliDocs operational pipeline.',
      buttonText: 'Finish Walkthrough ✓',
      icon: History
    }
  ];

  const currentStepData = tourSteps[demoTourStep - 1] || tourSteps[0];
  const StepIcon = currentStepData.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-lg bg-white rounded-xl shadow-2xl border-2 border-emerald-600 p-4 animate-in slide-in-from-bottom duration-200">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-md">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Flagship Hackathon Demo Flow
            </span>
            <div className="text-xs font-bold text-slate-800">
              {currentStepData.title}
            </div>
          </div>
        </div>
        <button
          onClick={endDemoTour}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-1.5 mb-3">
        {tourSteps.map((s) => (
          <div
            key={s.step}
            className={`h-1.5 rounded-full transition-all ${
              s.step === demoTourStep
                ? 'w-8 bg-emerald-600'
                : s.step < demoTourStep
                ? 'w-3 bg-emerald-300'
                : 'w-3 bg-slate-200'
            }`}
          />
        ))}
        <span className="text-[11px] font-bold text-slate-500 ml-auto">
          Step {demoTourStep} of {tourSteps.length}
        </span>
      </div>

      {/* Body text */}
      <p className="text-xs text-slate-600 mb-2 leading-relaxed font-normal">
        {currentStepData.description}
      </p>

      <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-900 mb-3 flex items-center gap-2">
        <StepIcon className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>{currentStepData.actionPrompt}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={prevDemoTourStep}
          disabled={demoTourStep <= 1}
          className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <button
          onClick={nextDemoTourStep}
          className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <span>{currentStepData.buttonText}</span>
        </button>
      </div>
    </div>
  );
};
