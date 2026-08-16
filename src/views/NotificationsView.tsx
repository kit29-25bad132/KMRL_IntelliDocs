import React, { useState } from 'react';
import { Bell, CheckCheck, Filter, ArrowRight, AlertCircle, FileText, Zap, Shield, Coins } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../types';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setCurrentTab, openSimulationForDoc } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Critical', 'Changes', 'Tasks', 'Compliance', 'Finance'];

  const filteredNotifications = notifications.filter((n) => {
    if (selectedCategory === 'All') return true;
    return n.category === selectedCategory;
  });

  const handleActionClick = (notif: NotificationItem) => {
    markNotificationRead(notif.id);
    if (notif.actionView === 'impact-simulator') {
      setCurrentTab('impact-simulator');
    } else if (notif.actionView === 'emergency') {
      setCurrentTab('emergency');
    } else if (notif.actionView === 'compliance') {
      setCurrentTab('compliance');
    } else if (notif.actionView === 'documents') {
      setCurrentTab('documents');
    } else if (notif.actionView === 'my-work') {
      setCurrentTab('my-work');
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 text-slate-700 rounded-lg">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Notification & Operational Alert Inbox</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live updates across contract variations, safety breaches, compliance milestones, and task escalations.
            </p>
          </div>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4 text-emerald-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => {
          const count = cat === 'All' ? notifications.length : notifications.filter((n) => n.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border transition-all ${
                !notif.read
                  ? 'bg-white border-slate-300 shadow-sm ring-1 ring-emerald-500/20'
                  : 'bg-slate-50/60 border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {notif.category === 'Changes' && (
                      <span className="p-2 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                        <Zap className="w-4 h-4" />
                      </span>
                    )}
                    {notif.category === 'Critical' && (
                      <span className="p-2 rounded-lg bg-red-100 text-red-800 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4" />
                      </span>
                    )}
                    {notif.category === 'Compliance' && (
                      <span className="p-2 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                        <Shield className="w-4 h-4" />
                      </span>
                    )}
                    {notif.category === 'Finance' && (
                      <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Coins className="w-4 h-4" />
                      </span>
                    )}
                    {notif.category === 'Documents' && (
                      <span className="p-2 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </span>
                    )}
                    {notif.category === 'Tasks' && (
                      <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <CheckCheck className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded uppercase ${
                          notif.severity === 'critical'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : notif.severity === 'high'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {notif.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{notif.timestamp}</span>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                      )}
                    </div>

                    <h3 className="text-xs font-bold text-slate-900">{notif.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                  </div>
                </div>

                {notif.actionLabel && (
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleActionClick(notif)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>{notif.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-700">No notifications in this category</div>
            <p className="text-[11px] text-slate-400 mt-0.5">All operational alerts are currently acknowledged.</p>
          </div>
        )}
      </div>
    </div>
  );
};
