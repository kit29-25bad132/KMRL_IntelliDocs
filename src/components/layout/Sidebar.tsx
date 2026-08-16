import React from 'react';
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  CheckSquare,
  History,
  Scale,
  MessageSquareWarning,
  Coins,
  BarChart3,
  Settings,
  Zap,
  Sparkles,
  GitCompare,
  ShieldAlert,
  Lock,
  ChevronRight,
  BookOpen,
  Share2
} from 'lucide-react';
import { useApp, NavTab } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, notifications, incidents, tasks, documents, user, t } = useApp();

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const criticalIncidentsCount = incidents.filter((i) => i.severity === 'critical' && i.status !== 'Mitigated').length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'To_Do' || t.status === 'In_Progress').length;
  const isSuperAdmin = user.role === 'Super_Admin' || user.permissions.includes('SYSTEM_ADMIN');

  interface NavItemConfig {
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    badgeColor?: string;
    isLocked?: boolean;
  }

  const primaryNavItems: NavItemConfig[] = [
    { id: 'home', label: t.nav.dashboard || 'Dashboard', icon: LayoutDashboard },
    {
      id: 'documents',
      label: t.nav.documents,
      icon: FileText,
      badge: documents.length > 0 ? documents.length : undefined,
      badgeColor: 'bg-slate-800 text-slate-300'
    },
    {
      id: 'emergency',
      label: t.nav.emergency || 'Alerts',
      icon: AlertTriangle,
      badge: criticalIncidentsCount > 0 ? `${criticalIncidentsCount}` : undefined,
      badgeColor: 'bg-red-500 text-white animate-pulse'
    },
    {
      id: 'my-work',
      label: t.nav.myWork || 'Actions',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
      badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
    },
    {
      id: 'audit',
      label: t.nav.audit || 'Audit Trail',
      icon: History
    }
  ];

  const intelligenceNavItems: NavItemConfig[] = [
    { id: 'knowledge-graph', label: t.nav.knowledgeGraph || 'Knowledge Graph', icon: Share2 },
    { id: 'impact-simulator', label: t.nav.impactSimulator, icon: Zap },
    { id: 'copilot', label: t.nav.copilot, icon: Sparkles },
    { id: 'version-compare', label: t.nav.versionCompare, icon: GitCompare }
  ];

  const knowledgeNavItems: NavItemConfig[] = [
    { id: 'compliance', label: t.nav.compliance, icon: Scale },
    { id: 'complaints', label: t.nav.complaints, icon: MessageSquareWarning },
    { id: 'finance', label: t.nav.finance, icon: Coins },
    { id: 'analytics', label: t.nav.analytics || 'Reports', icon: BarChart3 }
  ];

  const systemNavItems: NavItemConfig[] = [
    {
      id: 'admin',
      label: t.nav.admin || 'Super Admin',
      icon: isSuperAdmin ? ShieldAlert : Lock,
      isLocked: !isSuperAdmin,
      badge: !isSuperAdmin ? 'Restricted' : 'Active',
      badgeColor: !isSuperAdmin ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-teal-950 text-teal-300'
    },
    { id: 'settings', label: t.nav.settings, icon: Settings }
  ];

  const renderNavList = (items: NavItemConfig[]) => (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left group ${
              isActive
                ? 'bg-teal-600/25 text-teal-300 border border-teal-500/40 shadow-xs'
                : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </div>

            {item.isLocked ? (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-amber-400/90 border border-amber-800/40 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span className="text-[9px]">Root</span>
              </span>
            ) : item.badge !== undefined ? (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                  isActive ? 'bg-teal-400 text-slate-950' : item.badgeColor || 'bg-slate-800 text-slate-300'
                }`}
              >
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-slate-800/80 h-full min-h-full overflow-y-auto p-4 flex flex-col justify-between shrink-0 select-none text-slate-300 shadow-xl z-20">
      <div className="space-y-5">
        {/* Brand Banner Top */}
        <div className="px-2 pt-1 pb-2">
          <div className="text-sm font-black tracking-wider text-white flex items-center gap-1.5">
            <span>KMRL</span>
            <span className="text-teal-400 font-bold">INTELLIDOCS</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            OCC Operational Platform
          </div>
        </div>

        {/* Primary Command Navigation */}
        <div>{renderNavList(primaryNavItems)}</div>

        {/* Intelligence & AI Section */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t.nav.intelligence || 'Intelligence Engine'}
          </div>
          {renderNavList(intelligenceNavItems)}
        </div>

        {/* Knowledge Base Section */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Knowledge Base & Audits
          </div>
          {renderNavList(knowledgeNavItems)}
        </div>

        {/* System & Settings */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            System & Control
          </div>
          {renderNavList(systemNavItems)}
        </div>
      </div>

      {/* Footer Branding matching Image 2 */}
      <div className="pt-4 mt-4 border-t border-slate-800/80 px-2">
        <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          {t.govKerala || 'GOVERNMENT OF KERALA'}
        </div>
        <div className="text-[11px] font-semibold text-slate-300 mt-0.5">
          {t.transitCommandCenter || 'Transit Command Center'}
        </div>
        <div className="text-[10px] text-teal-400 font-mono mt-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span>Intranet Active • 10.240.12.8</span>
        </div>
      </div>
    </aside>
  );
};
