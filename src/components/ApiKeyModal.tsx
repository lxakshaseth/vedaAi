'use client';
import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Google Gemini API Key</h3>
            <p className="text-xs text-slate-500">Configure key for live AI Vision processing</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
          <strong className="text-slate-800">Note:</strong> If left empty, VedaAI will operate using our pre-extracted high-precision AI Vision dataset, showcasing all required edge cases (out-of-order answers, sub-parts, unanswered questions, and multi-page regions).
        </p>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            API Key
          </label>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-4 py-2.5 text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          />

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-brand-600 font-medium hover:underline"
            >
              Get Free Gemini Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-500/20 transition-all"
          >
            <Check className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
