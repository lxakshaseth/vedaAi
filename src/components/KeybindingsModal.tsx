'use client';

import React from 'react';

interface KeybindingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeybindingsModal: React.FC<KeybindingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl / ⌘ + K', description: 'Open Command Palette launcher' },
    { key: '?', description: 'Display this keyboard shortcuts modal' },
    { key: 'H', description: 'Navigate to Overview & Diagnostic Home' },
    { key: 'U', description: 'Go to Assessment Upload screen' },
    { key: 'A', description: 'Go to Assignments Tracker' },
    { key: 'C', description: 'Open Classroom & Roster screen' },
    { key: 'L', description: 'Browse Question Library repository' },
    { key: 'S', description: 'Open System Settings & API keys' },
    { key: 'Esc', description: 'Close active modal / drawer' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm">
              ⌨️
            </div>
            <div>
              <h3 className="font-bold text-lg">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-300">Quick navigation hotkeys for power educators</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white rounded-lg p-1.5 hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 divide-y divide-slate-100 max-h-96 overflow-y-auto">
          {shortcuts.map((sc, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between text-sm">
              <span className="text-slate-600">{sc.description}</span>
              <kbd className="px-2.5 py-1 text-xs font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Press <kbd className="font-semibold bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px]">Esc</kbd> to exit</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-xs"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
