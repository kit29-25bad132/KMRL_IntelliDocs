import React from 'react';
import { Settings, Volume2, Globe, Shield, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, startDemoTour, user, t } = useApp();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 text-slate-800 rounded-lg">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">{t.settings.title}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.settings.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={startDemoTour}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.settings.launchTour}</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Language Localization */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>{t.settings.langSection}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { code: 'en' as SupportedLanguage, label: t.settings.englishLabel, sub: t.settings.englishSub },
              { code: 'ml' as SupportedLanguage, label: t.settings.malayalamLabel, sub: t.settings.malayalamSub },
              { code: 'ta' as SupportedLanguage, label: t.settings.tamilLabel, sub: t.settings.tamilSub },
              { code: 'kn' as SupportedLanguage, label: t.settings.kannadaLabel, sub: t.settings.kannadaSub }
            ].map((lang) => (
              <div
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  language === lang.code
                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-slate-900">{lang.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{lang.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Audio & Alerts */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>{t.settings.soundSection}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <div className="font-bold text-slate-900">{t.settings.soundTitle}</div>
              <div className="text-[11px] text-slate-500">{t.settings.soundDesc}</div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-emerald-700 rounded border-slate-300 focus:ring-emerald-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Current Officer Profile */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>{t.settings.officerSection}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">{t.settings.loggedInOfficer}</div>
              <div className="font-bold text-slate-900 mt-0.5">{user.name}</div>
              <div className="text-[11px] text-slate-500">{user.email}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">{t.settings.directorate}</div>
              <div className="font-bold text-slate-900 mt-0.5">{user.department}</div>
              <div className="text-[11px] text-slate-500">{t.settings.stationId}: {user.employeeId}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">{t.settings.operationalRole}</div>
              <div className="font-bold text-emerald-800 mt-0.5">{user.role.replace(/_/g, ' ')}</div>
              <div className="text-[11px] text-slate-500">{t.settings.securityClearance}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
