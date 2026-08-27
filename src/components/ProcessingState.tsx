'use client';
import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface ProcessingStateProps {
  onComplete?: () => void;
}

const STEPS = [
  'Extracting printed questions & sub-parts (preserving Q11(a), Q11(b))...',
  'Analyzing handwritten student answer pages with OCR...',
  'Mapping answer region bounding boxes [ymin, xmin, ymax, xmax]...',
  'Evaluating correctness, calculating score & generating AI feedback...',
];

export const ProcessingState: React.FC<ProcessingStateProps> = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(timer);
          return 95;
        }
        return prev + 5;
      });
    }, 150);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      {/* Animated Glowing AI Sparkle Icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-brand-500/30 relative z-10 animate-bounce duration-1000">
          <Sparkles className="w-12 h-12 fill-white/20" />
        </div>
      </div>

      {/* Main Title & Loading Percentage */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Processing Assessment...
      </h2>
      <p className="text-sm font-semibold text-brand-600 mb-8">
        {progress}% Complete
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-slate-100 h-2.5 rounded-full overflow-hidden mb-8 border border-slate-200">
        <div
          className="bg-gradient-to-r from-brand-500 to-amber-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step List */}
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-left space-y-3">
        {STEPS.map((stepText, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium">
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-brand-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
              )}

              <span
                className={
                  isDone
                    ? 'text-slate-800 font-semibold'
                    : isCurrent
                    ? 'text-brand-600 font-bold'
                    : 'text-slate-400'
                }
              >
                {stepText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
