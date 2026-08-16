import React, { useState } from 'react';
import {
  Search,
  Bell,
  Globe,
  AlertTriangle,
  ChevronDown,
  Shield,
  User,
  Sparkles,
  Volume2,
  VolumeX,
  Check,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';

export const Header: React.FC = () => {
  const {
    user,
    setUserRole,
    availableUsers,
    language,
    setLanguage,
    setCurrentTab,
    notifications,
    incidents,
    soundAlerts,
    setSoundAlerts,
    setIsSearchModalOpen,
    startDemoTour,
    t
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const activeCriticalIncidents = incidents.filter((i) => i.severity === 'critical' && i.status !== 'Mitigated').length;

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'EN', native: 'English' },
    { code: 'ml', label: 'ML', native: 'മലയാളം' },
    { code: 'ta', label: 'TA', native: 'தமிழ்' },
    { code: 'kn', label: 'KN', native: 'ಕನ್ನಡ' }
  ];

  return (
    <header className="h-16 bg-[#0f172a] text-white border-b border-slate-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none shadow-md">
      {/* Left: Brand Identity matching Image 2 */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 font-black text-lg shadow-sm">
            <span className="text-teal-300 font-black tracking-tighter">K</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-sm sm:text-base leading-none">
                KMRL Operational Intelligence Platform
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-tight mt-1 hidden sm:block">
              {t.subTitle}
            </p>
          </div>
        </button>
      </div>

      {/* Center: Global Search Bar matching Image 2 */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-xs transition-all focus:outline-none focus:ring-1 focus:ring-teal-400/50"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300 font-normal truncate">{t.searchPlaceholder}</span>
          </div>
          <kbd className="hidden lg:inline-flex items-center gap-1 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right: Tools, Languages, Alert Indicator & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Flagship Guided Demo Tour Button */}
        <button
          onClick={startDemoTour}
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-teal-600/20 hover:bg-teal-600/30 border border-teal-500/40 text-teal-300 rounded-lg text-xs font-semibold shadow-xs transition-all"
          title="Launch Guided Evaluation Demo Flow"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-300" />
          <span>{t.dashboard.startDemoTour}</span>
        </button>

        {/* Emergency Alert Indicator */}
        {activeCriticalIncidents > 0 && (
          <button
            onClick={() => setCurrentTab('emergency')}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-red-950/60 hover:bg-red-900/60 border border-red-500/50 rounded-lg text-red-300 text-xs font-bold transition-all shadow-xs"
            title="Active Critical Emergency Alert"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden md:inline">{activeCriticalIncidents} {t.dashboard.active}</span>
          </button>
        )}

        {/* Language Switcher Pills */}
        <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs font-semibold">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`px-2 py-1 rounded-md transition-all text-[11px] ${
                language === l.code
                  ? 'bg-teal-500 text-slate-950 font-black shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              title={l.native}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => setCurrentTab('notifications')}
          className="relative p-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Notification Center"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifsCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-red-500 text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-slate-900">
              {unreadNotifsCount}
            </span>
          )}
        </button>

        {/* User Profile Pill & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs transition-all text-left"
          >
            <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs ring-1 ring-teal-400/50 shrink-0">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="hidden lg:block leading-tight">
              <div className="font-bold text-white flex items-center gap-1">
                <span>{user.name}</span>
                {user.role === 'Super_Admin' && (
                  <Shield className="w-3 h-3 text-teal-400" />
                )}
              </div>
              <div className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">
                {user.role.replace(/_/g, ' ')}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-white">
              <div className="px-3.5 py-2 border-b border-slate-800">
                <div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                  Active Officer Persona
                </div>
                <div className="font-bold text-sm text-white mt-0.5">{user.name}</div>
                <div className="text-xs text-slate-400">{user.email}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    user.role === 'Super_Admin'
                      ? 'bg-amber-950/60 text-amber-300 border-amber-500/50'
                      : 'bg-teal-950/60 text-teal-300 border-teal-500/50'
                  }`}>
                    {user.role.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[10px] text-slate-500">• {user.department}</span>
                </div>
              </div>

              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                Switch Operational Profile
              </div>

              <div className="space-y-1 px-1">
                {availableUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setUserRole(u.id);
                      setIsUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      user.id === u.id
                        ? 'bg-teal-600/30 text-teal-300 font-bold border border-teal-500/40'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-slate-200 flex items-center gap-1">
                        {u.name}
                        {u.role === 'Super_Admin' && (
                          <span className="text-[9px] bg-amber-900 text-amber-200 px-1 rounded font-bold">
                            ROOT
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {u.role.replace(/_/g, ' ')} • {u.department}
                      </div>
                    </div>
                    {user.id === u.id && <Check className="w-4 h-4 text-teal-400 shrink-0" />}
                  </button>
                ))}
              </div>

              <div className="px-3 pt-2 mt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>RBAC Security Clearance</span>
                <span className="text-teal-400 font-mono">GOV-KL-OCC-2026</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
