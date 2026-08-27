'use client';
import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex-1 bg-white m-3 sm:m-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
      {/* 4 Glowing Orange AI Sparkle Stars matching Figma */}
      <div className="relative w-28 h-28 flex items-center justify-center mb-6">
        <svg
          viewBox="0 0 100 100"
          className="w-24 h-24 text-[#FF5722] fill-current animate-pulse duration-1000"
        >
          {/* Main large 4-point star */}
          <path d="M 55 10 Q 55 35 75 35 Q 55 35 55 60 Q 55 35 35 35 Q 55 35 55 10 Z" />

          {/* Secondary 4-point star (bottom-left) */}
          <path d="M 38 45 Q 38 60 52 60 Q 38 60 38 75 Q 38 60 24 60 Q 38 60 38 45 Z" />

          {/* Small star (bottom-right) */}
          <path d="M 72 58 Q 72 65 78 65 Q 72 65 72 72 Q 72 65 66 65 Q 72 65 72 58 Z" />

          {/* Small dot (left) */}
          <circle cx="28" cy="40" r="3.5" />
        </svg>
      </div>

      {/* Main Title & Subtitle */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
        Extracting...
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        This may take a while
      </p>
    </div>
  );
};
