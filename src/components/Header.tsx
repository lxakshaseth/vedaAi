'use client';
import React from 'react';
import { Sparkles, Key, FileText, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
  onReset?: () => void;
  isResultsPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApiKeyModal,
  hasApiKey,
  onReset,
  isResultsPage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-brand-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
          <Sparkles className="w-5 h-5 fill-white/20" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Veda<span className="text-brand-600">AI</span>
            </span>
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-orange-100 text-brand-700 border border-orange-200">
              Assessment v2.0
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            Extraction &amp; Handwritten Answer Mapping
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {isResultsPage && onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Upload New Paper
          </button>
        )}

        <button
          onClick={onOpenApiKeyModal}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
            hasApiKey
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
              : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>{hasApiKey ? 'Gemini Key Active' : 'Configure API Key'}</span>
        </button>
      </div>
    </header>
  );
};
