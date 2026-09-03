'use client';

import React, { useEffect, useState } from 'react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'assignments' | 'classroom' | 'library' | 'settings' | 'upload') => void;
  onTriggerToolkit?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onTriggerToolkit,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'nav-upload',
      title: 'Upload Assessment Paper',
      subtitle: 'Upload PDF exam questions & student answers',
      category: 'Actions',
      icon: '📤',
      action: () => {
        onNavigate('upload');
        onClose();
      },
    },
    {
      id: 'nav-toolkit',
      title: 'AI Teacher Toolkit',
      subtitle: 'Generate questions, create rubrics, build lesson notes',
      category: 'AI Tools',
      icon: '✨',
      action: () => {
        onTriggerToolkit?.();
        onClose();
      },
    },
    {
      id: 'nav-home',
      title: 'Overview & Diagnostic Analytics',
      subtitle: 'View class performance, accuracy metrics, and diagnostic charts',
      category: 'Navigation',
      icon: '📊',
      action: () => {
        onNavigate('home');
        onClose();
      },
    },
    {
      id: 'nav-assignments',
      title: 'Assignments Tracker',
      subtitle: 'Browse student submissions, pending evaluations, and status',
      category: 'Navigation',
      icon: '📋',
      action: () => {
        onNavigate('assignments');
        onClose();
      },
    },
    {
      id: 'nav-classroom',
      title: 'Classroom & Roster',
      subtitle: 'Manage student cohorts, attendance, and batch profiles',
      category: 'Navigation',
      icon: '🎓',
      action: () => {
        onNavigate('classroom');
        onClose();
      },
    },
    {
      id: 'nav-library',
      title: 'Curriculum Question Library',
      subtitle: 'Search past question banks, marking schemes, and exemplar answers',
      category: 'Navigation',
      icon: '📚',
      action: () => {
        onNavigate('library');
        onClose();
      },
    },
    {
      id: 'nav-settings',
      title: 'Settings & API Keys',
      subtitle: 'Configure Groq LLaMA 3.3, Google Gemini Vision, and rubric presets',
      category: 'System',
      icon: '⚙️',
      action: () => {
        onNavigate('settings');
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search actions (Ctrl+K)..."
            className="w-full bg-transparent text-slate-800 text-sm focus:outline-none placeholder-slate-400"
            autoFocus
          />
          <kbd className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-200/80 rounded border border-slate-300">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching actions found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredActions.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left p-3 rounded-xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-900 flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-900">{item.title}</h5>
                    <p className="text-xs text-slate-400 group-hover:text-indigo-600/70">{item.subtitle}</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded group-hover:bg-indigo-100 group-hover:text-indigo-700">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span className="flex items-center gap-1">
            <span>Powered by</span>
            <strong className="text-indigo-600 font-semibold">Veda AI Engine</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
