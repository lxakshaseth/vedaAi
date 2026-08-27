'use client';
import React from 'react';
import {
  LayoutGrid,
  Users,
  FileText,
  Trash2,
  History,
  Settings,
  Sparkles,
  ChevronRight,
  PanelLeftClose,
  Globe,
} from 'lucide-react';

export type NavTab = 'website' | 'home' | 'classroom' | 'assignments' | 'exams' | 'library' | 'settings';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  currentScreen: 'upload' | 'loading' | 'mapping';
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenToolkit: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  currentScreen,
  activeTab,
  onTabChange,
  onOpenToolkit,
}) => {
  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-slate-200 h-screen transition-all duration-300 select-none z-30 shrink-0 ${
        collapsed ? 'w-16 items-center px-2 py-4' : 'w-64 p-4'
      }`}
    >
      {/* Top Brand & Collapse Toggle */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-6`}>
        <div
          onClick={() => onTabChange('website')}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="Go to VedaAI Product Website"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 group-hover:bg-[#FF5722] flex items-center justify-center text-white font-extrabold text-lg shadow-sm transition-colors">
            V
          </div>
          {!collapsed && (
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-[#FF5722] transition-colors">
              Veda<span className="text-[#FF5722]">AI</span>
            </span>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* AI Teacher's Toolkit Pill Button */}
      {!collapsed ? (
        <button
          onClick={onOpenToolkit}
          className="w-full mb-6 flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border-2 border-orange-500/80 shadow-md shadow-orange-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-orange-400 fill-orange-400" />
          <span>AI Teacher&apos;s Toolkit</span>
        </button>
      ) : (
        <button
          onClick={onOpenToolkit}
          title="AI Teacher's Toolkit"
          className="w-10 h-10 mb-6 rounded-full bg-slate-900 text-white flex items-center justify-center border-2 border-orange-500 shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-orange-400 fill-orange-400" />
        </button>
      )}

      {/* Main Navigation Links */}
      <nav className="flex-1 space-y-1.5 w-full">
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs transition-all ${
            activeTab === 'home'
              ? 'font-bold text-slate-900 bg-slate-100 shadow-sm'
              : 'font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          } ${collapsed ? 'justify-center px-0' : ''}`}
          title="Home Dashboard"
        >
          <LayoutGrid className={`w-4 h-4 ${activeTab === 'home' ? 'text-slate-900' : 'text-slate-500'}`} />
          {!collapsed && <span>Home</span>}
        </button>

        {/* My Classroom */}
        <button
          onClick={() => onTabChange('classroom')}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs transition-all ${
            activeTab === 'classroom'
              ? 'font-bold text-slate-900 bg-slate-100 shadow-sm'
              : 'font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          } ${collapsed ? 'justify-center px-0' : ''}`}
          title="My Classroom"
        >
          <Users className={`w-4 h-4 ${activeTab === 'classroom' ? 'text-slate-900' : 'text-slate-500'}`} />
          {!collapsed && <span>My Classroom</span>}
        </button>

        {/* Assignments */}
        <button
          onClick={() => onTabChange('assignments')}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs transition-all ${
            activeTab === 'assignments'
              ? 'font-bold text-slate-900 bg-slate-100 shadow-sm'
              : 'font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          } ${collapsed ? 'justify-center px-0' : ''}`}
          title="Assignments"
        >
          <FileText className={`w-4 h-4 ${activeTab === 'assignments' ? 'text-slate-900' : 'text-slate-500'}`} />
          {!collapsed && <span>Assignments</span>}
        </button>

        {/* Exams */}
        <button
          onClick={() => onTabChange('exams')}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs transition-all ${
            activeTab === 'exams'
              ? 'font-bold text-slate-900 bg-slate-100 shadow-sm'
              : 'font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          } ${collapsed ? 'justify-center px-0' : ''}`}
          title="Exams"
        >
          <Trash2 className={`w-4 h-4 ${activeTab === 'exams' ? 'text-slate-900' : 'text-slate-500'}`} />
          {!collapsed && <span>Exams</span>}
        </button>

        {/* My Library */}
        <button
          onClick={() => onTabChange('library')}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs transition-all ${
            activeTab === 'library'
              ? 'font-bold text-slate-900 bg-slate-100 shadow-sm'
              : 'font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          } ${collapsed ? 'justify-center px-0' : ''}`}
          title="My Library"
        >
          <History className={`w-4 h-4 ${activeTab === 'library' ? 'text-slate-900' : 'text-slate-500'}`} />
          {!collapsed && <span>My Library</span>}
        </button>
      </nav>

      {/* Bottom Footer Section */}
      <div className="w-full pt-4 space-y-2.5 border-t border-slate-100">
        {/* Product Website Switcher Button */}
        <button
          onClick={() => onTabChange('website')}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#FF5722] bg-orange-50/80 hover:bg-orange-100 border border-orange-200 transition-colors ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title="View VedaAI Product Website"
        >
          <Globe className="w-4 h-4 text-[#FF5722]" />
          {!collapsed && <span>Product Website</span>}
        </button>

        {/* Settings */}
        <button
          onClick={() => onTabChange('settings')}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs transition-all ${
            activeTab === 'settings'
              ? 'font-bold text-slate-900 bg-slate-100 shadow-sm'
              : 'font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          } ${collapsed ? 'justify-center px-0' : ''}`}
          title="Settings"
        >
          <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-slate-900' : 'text-slate-500'}`} />
          {!collapsed && <span>Settings</span>}
        </button>

        {/* School Badge */}
        {!collapsed ? (
          <div className="bg-slate-100 rounded-xl p-2.5 flex items-center gap-2.5 border border-slate-200/70">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-emerald-700">DPS</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-bold text-slate-900 truncate">Delhi Public School</p>
              <p className="text-[10px] text-slate-500 truncate">Bokaro Steel City</p>
            </div>
          </div>
        ) : (
          <div
            title="Delhi Public School, Bokaro Steel City"
            className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold text-emerald-700"
          >
            DPS
          </div>
        )}

        {/* Collapse toggle button at bottom */}
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
