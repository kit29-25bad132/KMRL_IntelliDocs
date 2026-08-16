import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  FileText,
  Plus,
  CheckCircle2,
  AlertCircle,
  Filter,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OperationalTask } from '../types';

export const MyWorkView: React.FC = () => {
  const { tasks, updateTaskStatus, openDocumentViewer, user, addNewTask } = useApp();
  const [activeFilter, setActiveFilter] = useState<'All' | 'My_Dept' | 'Critical'>('All');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'My_Dept') return t.department === user.department;
    if (activeFilter === 'Critical') return t.priority === 'critical';
    return true;
  });

  const columns: { status: OperationalTask['status']; label: string; color: string }[] = [
    { status: 'To_Do', label: 'To Do / Pending', color: 'border-slate-300' },
    { status: 'In_Progress', label: 'In Progress', color: 'border-blue-400' },
    { status: 'Under_Review', label: 'Under Review / Approval', color: 'border-amber-400' },
    { status: 'Completed', label: 'Completed & Audited', color: 'border-emerald-500' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Personalized Operational Task & Work Manager</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Assigned work orders, review obligations, and mitigation tasks automatically extracted from KMRL documents.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-bold">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              List View
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setActiveFilter('All')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
            activeFilter === 'All'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Operational Tasks ({tasks.length})
        </button>
        <button
          onClick={() => setActiveFilter('My_Dept')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
            activeFilter === 'My_Dept'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          My Directorate ({user.department})
        </button>
        <button
          onClick={() => setActiveFilter('Critical')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
            activeFilter === 'Critical'
              ? 'bg-red-700 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Critical Deadlines ({tasks.filter((t) => t.priority === 'critical').length})
        </button>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.status);
            return (
              <div key={col.status} className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wider">{col.label}</span>
                  <span className="bg-white text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200 text-[11px]">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5 min-h-[160px]">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-2 text-xs hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            task.priority === 'critical'
                              ? 'bg-red-100 text-red-800'
                              : task.priority === 'high'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Due {task.dueDate}</span>
                      </div>

                      <h4 className="font-bold text-slate-900 leading-snug">{task.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{task.description}</p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <button
                          onClick={() => openDocumentViewer(task.sourceDocId)}
                          className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Evidence</span>
                        </button>

                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value as any)}
                          className="text-[10px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-semibold focus:outline-none"
                        >
                          <option value="To_Do">To Do</option>
                          <option value="In_Progress">In Progress</option>
                          <option value="Under_Review">Under Review</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <div className="p-4 text-center text-slate-400 text-xs italic">
                      No items in this column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="divide-y divide-slate-100 text-xs">
            {filteredTasks.map((task) => (
              <div key={task.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded uppercase ${
                        task.priority === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'high'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="font-bold text-slate-900">{task.title}</span>
                    <span className="text-slate-400">• {task.department}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{task.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-mono text-slate-600">Due {task.dueDate}</span>
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as any)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-semibold"
                  >
                    <option value="To_Do">To Do</option>
                    <option value="In_Progress">In Progress</option>
                    <option value="Under_Review">Under Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
