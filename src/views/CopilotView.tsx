import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  FileText,
  ArrowRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CopilotView: React.FC = () => {
  const { copilotMessages, sendCopilotQuery, isCopilotLoading, openDocumentViewer, user, t } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState<'UNDERSTAND' | 'CHANGE' | 'IMPACT' | 'ACTION'>('UNDERSTAND');

  const suggestedQueries = [
    { mode: 'CHANGE', text: 'What changed in the latest Traction Substation Contract 104?' },
    { mode: 'IMPACT', text: 'What work orders and financial milestones are affected by the 15-day delay?' },
    { mode: 'UNDERSTAND', text: 'What is the maximum telemetry latency permitted under Signal SOP-09?' },
    { mode: 'ACTION', text: 'What immediate compliance filings are due for CMRS safety this week?' }
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim() || isCopilotLoading) return;
    setInputQuery('');
    await sendCopilotQuery(q, selectedMode);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-5xl mx-auto h-[calc(100vh-5.5rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-700 text-white rounded-lg shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900">
                {t.copilot.title}
              </h1>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200">
                EVIDENCE-GROUNDED
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              {t.copilot.subtitle}
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
          {(['UNDERSTAND', 'CHANGE', 'IMPACT', 'ACTION'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                selectedMode === mode
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Quick Queries */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs shrink-0">
        <span className="text-slate-400 font-semibold text-[11px] mr-1">{t.copilot.quickPrompts}:</span>
        {suggestedQueries.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedMode(sug.mode as any);
              handleSend(sug.text);
            }}
            className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:border-teal-700 hover:text-teal-800 text-[11px] whitespace-nowrap shadow-2xs transition-colors flex items-center gap-1"
          >
            <span className="text-[9px] font-bold uppercase text-teal-700">[{sug.mode}]</span>
            <span>{sug.text}</span>
          </button>
        ))}
      </div>

      {/* Message Chat Flow Canvas */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-2xs p-4 overflow-y-auto space-y-4 min-h-0">
        {copilotMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 text-[10px] text-slate-400 font-mono">
              <span>{msg.sender === 'user' ? user.name : 'KMRL IntelliDocs Engine'}</span>
              <span>• {msg.timestamp}</span>
              {msg.confidence && (
                <span className="text-teal-700 font-bold bg-teal-50 px-1 py-0.2 rounded">
                  {Math.round(msg.confidence * 100)}% {t.labels.confidence}
                </span>
              )}
            </div>

            <div
              className={`p-4 rounded-xl text-xs leading-relaxed max-w-2xl shadow-2xs ${
                msg.sender === 'user'
                  ? 'bg-teal-700 text-white font-medium'
                  : 'bg-slate-50 border border-slate-200 text-slate-800 space-y-3'
              }`}
            >
              <div className="whitespace-pre-line font-sans">{msg.text}</div>

              {/* Grounded Evidence Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-3 border-t border-slate-200 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {t.copilot.citations}:
                  </div>
                  <div className="space-y-1">
                    {msg.citations.map((cite, cIdx) => (
                      <div
                        key={cIdx}
                        onClick={() => openDocumentViewer(cite.docId)}
                        className="p-2 bg-white rounded border border-slate-200 hover:border-teal-700 cursor-pointer flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-teal-700">
                              {cite.docTitle}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {cite.section} • {t.labels.page} {cite.page}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isCopilotLoading && (
          <div className="flex items-center gap-2 p-3 bg-teal-50 text-teal-800 rounded-lg text-xs border border-teal-200 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-teal-700" />
            <span>Retrieving authorized KMRL evidence, traversing knowledge graph dependencies...</span>
          </div>
        )}
      </div>

      {/* Query Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs shrink-0"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={t.copilot.placeholder}
          className="flex-1 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isCopilotLoading}
          className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <span>{t.copilot.askQuestion}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
