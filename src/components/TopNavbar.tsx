'use client';
import React from 'react';
import {
  ArrowLeft,
  LayoutGrid,
  Users,
  FileText,
  Trash2,
  History,
  Settings,
  HelpCircle,
  Bell,
  Sparkles,
  ChevronDown,
  Key,
  Globe,
} from 'lucide-react';
import { NavTab } from './Sidebar';

interface TopNavbarProps {
  activeTab: NavTab;
  onBack?: () => void;
  onOpenApiKeyModal: () => void;
  onOpenToolkit: () => void;
  onNavigateTab: (tab: NavTab) => void;
  hasApiKey: boolean;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  onBack,
  onOpenApiKeyModal,
  onOpenToolkit,
  onNavigateTab,
  hasApiKey,
}) => {
  const getTabInfo = () => {
    switch (activeTab) {
      case 'home':
        return { label: 'Teacher Dashboard', icon: LayoutGrid };
      case 'classroom':
        return { label: 'My Classroom', icon: Users };
      case 'assignments':
        return { label: 'Assignments', icon: FileText };
      case 'exams':
        return { label: 'Exams & Optical Mapping', icon: Trash2 };
      case 'library':
        return { label: 'My Library', icon: History };
      case 'settings':
        return { label: 'Settings', icon: Settings };
      default:
        return { label: 'Teacher Dashboard', icon: LayoutGrid };
    }
  };

  const currentTabInfo = getTabInfo();
  const TabIcon = currentTabInfo.icon;

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between z-20 shrink-0">
      {/* Left Breadcrumb Navigation */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2 text-slate-700">
          <TabIcon className="w-4 h-4 text-[#FF5722]" />
          <span className="font-bold text-xs sm:text-sm text-slate-900">
            {currentTabInfo.label}
          </span>
        </div>
      </div>

      {/* Right User & Tools Section */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Switch to Website Button */}
        <button
          onClick={() => onNavigateTab('website')}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
          title="View VedaAI Product Website"
        >
          <Globe className="w-3.5 h-3.5 text-[#FF5722]" />
          <span className="hidden sm:inline">Product Website</span>
        </button>

        {/* API Key Configuration Button */}
        <button
          onClick={onOpenApiKeyModal}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
            hasApiKey
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
          title="Configure API Key"
        >
          <Key className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{hasApiKey ? 'Groq Active' : 'API Key'}</span>
        </button>

        {/* AI Toolkit trigger */}
        <button
          onClick={onOpenToolkit}
          className="text-slate-700 hover:text-orange-600 p-1.5 rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-1 text-xs font-semibold"
          title="Open AI Teacher's Toolkit"
        >
          <Sparkles className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span className="hidden md:inline">AI Toolkit</span>
        </button>

        {/* Notification Bell with red badge */}
        <button
          className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile Dropdown (Madhur Rastogi) */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Madhur Rastogi"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="text-xs font-bold text-slate-800 hidden sm:block">
            Madhur Rastogi
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};
