'use client';
import React, { useState } from 'react';
import {
  Settings,
  Key,
  School,
  Sparkles,
  Sliders,
  Bell,
  Save,
  Check,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface SettingsScreenProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  onOpenApiKeyModal: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  apiKey,
  onSaveApiKey,
  onOpenApiKeyModal,
}) => {
  const [modelProvider, setModelProvider] = useState<'groq' | 'gemini'>('groq');
  const [rubricStrictness, setRubricStrictness] = useState('standard');
  const [autoEnhanceContrast, setAutoEnhanceContrast] = useState(true);
  const [partialMarking, setPartialMarking] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Settings &amp; Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage your AI model engine, school credentials, and assessment grading rubrics
          </p>
        </div>

        {/* Institution Profile Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-extrabold text-sm">
              DPS
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Institution &amp; Teacher Profile</h2>
              <p className="text-xs text-slate-500">Delhi Public School • Bokaro Steel City</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teacher Name</label>
              <input
                type="text"
                readOnly
                value="Madhur Rastogi"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                readOnly
                value="madhur.rastogi@dpsbokaro.edu.in"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* AI Evaluation Engine Configuration */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#FF5722] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">AI Evaluation Engine</h2>
                <p className="text-xs text-slate-500">Optical Character Recognition &amp; Semantic Reasoning</p>
              </div>
            </div>

            <button
              onClick={onOpenApiKeyModal}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Key className="w-3.5 h-3.5 text-orange-400" />
              <span>{apiKey ? 'Update API Key' : 'Configure API Key'}</span>
            </button>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Active Vision Model</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setModelProvider('groq')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    modelProvider === 'groq'
                      ? 'border-[#FF5722] bg-[#FFEFE7]/40 ring-2 ring-orange-400/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Groq Llama-3.2 90B Vision</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Ultra-Fast
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Lightning fast sub-second optical document coordinate extraction.
                  </p>
                </div>

                <div
                  onClick={() => setModelProvider('gemini')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    modelProvider === 'gemini'
                      ? 'border-[#FF5722] bg-[#FFEFE7]/40 ring-2 ring-orange-400/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Google Gemini 1.5 Flash</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                      Multi-Modal
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    High-accuracy biological diagram analysis and handwriting interpretation.
                  </p>
                </div>
              </div>
            </div>

            {/* Grading Strictness Controls */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-bold text-slate-700">Grading Strictness &amp; Rubrics</label>
              <div className="flex items-center gap-3">
                {['lenient', 'standard', 'rigorous'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setRubricStrictness(level)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      rubricStrictness === level
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoEnhanceContrast}
                  onChange={(e) => setAutoEnhanceContrast(e.target.checked)}
                  className="rounded text-[#FF5722] focus:ring-[#FF5722]"
                />
                <span>Automatically enhance low-contrast student pencil drawings</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={partialMarking}
                  onChange={(e) => setPartialMarking(e.target.checked)}
                  className="rounded text-[#FF5722] focus:ring-[#FF5722]"
                />
                <span>Award fractional partial marks for step-wise solutions</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {savedMessage ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fadeIn">
              <Check className="w-4 h-4" />
              Settings saved successfully!
            </span>
          ) : (
            <span />
          )}

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
