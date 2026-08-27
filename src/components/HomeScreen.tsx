'use client';
import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Users,
  FileCheck2,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  BookOpen,
  Plus,
  Play,
  UploadCloud,
  ChevronRight,
  GraduationCap,
  Award,
  Layers,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (tab: 'home' | 'classroom' | 'assignments' | 'exams' | 'library') => void;
  onOpenToolkit: () => void;
  onLoadSampleExam: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenToolkit,
  onLoadSampleExam,
}) => {
  const [quickSearchTopic, setQuickSearchTopic] = useState('');

  const recentAssessments = [
    {
      id: 'exam-1',
      title: 'Class 10 Biology - Unit Test: Life Processes',
      subject: 'Biology',
      class: 'Class 10-A',
      date: 'Today, 2:30 PM',
      totalSheets: 32,
      gradedSheets: 32,
      avgScore: '78.4%',
      status: 'Grading Complete',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'exam-2',
      title: 'Class 9 Physics - Motion & Laws of Motion',
      subject: 'Physics',
      class: 'Class 9-B',
      date: 'Yesterday',
      totalSheets: 30,
      gradedSheets: 24,
      avgScore: '71.2%',
      status: 'In Progress (6 Left)',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'exam-3',
      title: 'Class 11 Chemistry - Periodic Classification',
      subject: 'Chemistry',
      class: 'Class 11-Sci',
      date: 'Oct 24',
      totalSheets: 28,
      gradedSheets: 28,
      avgScore: '82.0%',
      status: 'Grading Complete',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
  ];

  const classSummary = [
    { name: 'Class 10-A', subject: 'Biology', students: 34, avg: 84, color: 'bg-emerald-500' },
    { name: 'Class 10-B', subject: 'General Science', students: 32, avg: 76, color: 'bg-blue-500' },
    { name: 'Class 9-A', subject: 'Physics & Chem', students: 38, avg: 72, color: 'bg-indigo-500' },
    { name: 'Class 11-A', subject: 'Advanced Biology', students: 38, avg: 88, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    {
      user: 'Priya Sharma (10-A)',
      action: 'Submitted Unit Test Answer Sheet',
      time: '12 mins ago',
      type: 'submission',
    },
    {
      user: 'AI Evaluation Engine',
      action: 'Completed optical mapping for 32 papers',
      time: '45 mins ago',
      type: 'ai',
    },
    {
      user: 'Aarav Patel (10-B)',
      action: 'Requested clarification on Q4 grading',
      time: '2 hours ago',
      type: 'query',
    },
    {
      user: 'Veda AI Copilot',
      action: 'Generated remedial worksheet on Chloroplasts',
      time: '4 hours ago',
      type: 'ai',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 flex flex-col overflow-y-auto">
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Welcome Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-[#FF5722]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 -mb-10 w-60 h-60 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-orange-300 text-xs font-semibold border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                <span>Delhi Public School • Academic Term 2026-27</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Madhur!</span> 🌟
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Your AI Teacher Copilot is active. 32 student answer sheets mapped and graded with high precision. All rubrics are synchronized.
              </p>
            </div>

            {/* Hero Quick Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => {
                  onLoadSampleExam();
                  onNavigate('exams');
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Evaluate Exam with AI</span>
              </button>

              <button
                onClick={onOpenToolkit}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>AI Toolkit</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Total Students</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">142</span>
              <span className="text-[11px] font-bold text-emerald-600">+4 this term</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Across 4 Class Sections</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Papers Graded</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">328</span>
              <span className="text-[11px] font-bold text-emerald-600">99.2% accuracy</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Handwritten &amp; Printed</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Active Exams</span>
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF5722] flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">3</span>
              <span className="text-[11px] font-bold text-orange-600">Live evaluation</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">1 scheduled for Friday</p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Time Saved by AI</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">48.5 <span className="text-base font-bold text-slate-500">hrs</span></span>
              <span className="text-[11px] font-bold text-emerald-600">~12h / week</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Auto-mapping &amp; Feedback</p>
          </div>
        </div>

        {/* Main Grid: Left 2 Cols (Recent Assessments & AI Insights), Right 1 Col (Class Health & Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex items-center justify-between gap-3 overflow-x-auto">
              <button
                onClick={() => onNavigate('exams')}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF5722] text-xs font-bold transition-colors shrink-0"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Question &amp; Answers</span>
              </button>

              <button
                onClick={() => onNavigate('assignments')}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>New Assignment</span>
              </button>

              <button
                onClick={() => onNavigate('classroom')}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors shrink-0"
              >
                <Users className="w-4 h-4" />
                <span>Student Roster</span>
              </button>

              <button
                onClick={() => onNavigate('library')}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>CBSE Question Bank</span>
              </button>
            </div>

            {/* AI Teacher Diagnostic & Pedagogical Insights Card */}
            <div className="bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent rounded-2xl p-5 border border-orange-200 relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#FF5722] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                  <Sparkles className="w-5 h-5 fill-white" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      AI Diagnostic Insights • Class 10-A Biology
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                      Action Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>68% of students</strong> lost marks on <em>Question 4 (Photolysis &amp; Thylakoid structure)</em> by confusing stroma enzymatic steps with light reactions.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={onOpenToolkit}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      <span>Generate 5-min Remedial Worksheet</span>
                    </button>
                    <button
                      onClick={() => onNavigate('classroom')}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                    >
                      View Student Breakdown
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Assessments Section */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Recent Assessments</h2>
                  <p className="text-xs text-slate-500">Live evaluation status &amp; class performance</p>
                </div>
                <button
                  onClick={() => onNavigate('assignments')}
                  className="text-xs font-bold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {recentAssessments.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 rounded-xl border border-slate-200/90 hover:border-orange-300 hover:bg-slate-50/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{exam.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${exam.statusColor}`}>
                          {exam.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">{exam.class}</span>
                        <span>•</span>
                        <span>{exam.totalSheets} Total Answer Sheets</span>
                        <span>•</span>
                        <span>Avg: <strong className="text-slate-800">{exam.avgScore}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onLoadSampleExam();
                          onNavigate('exams');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Map Answers</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 Col) */}
          <div className="space-y-6">
            {/* Classroom Performance Health */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#FF5722]" />
                  Class Performance
                </h3>
                <button
                  onClick={() => onNavigate('classroom')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Details
                </button>
              </div>

              <div className="space-y-3.5">
                {classSummary.map((cls, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{cls.name}</span>
                      <span className="font-extrabold text-slate-900">{cls.avg}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cls.color} rounded-full transition-all`}
                        style={{ width: `${cls.avg}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{cls.subject}</span>
                      <span>{cls.students} Students</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                Live Feed
              </h3>

              <div className="space-y-3">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#FF5722] mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-slate-800 font-medium">
                        <strong className="font-bold text-slate-900">{item.user}</strong>: {item.action}
                      </p>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines / Calendar Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Upcoming Tests
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">CBSE Term 1</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-bold text-white">Class 10 Biology Term Exam</p>
                  <p className="text-[11px] text-slate-300">Friday, Oct 30 • 50 Marks</p>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-bold text-white">Class 9 Science Quiz 2</p>
                  <p className="text-[11px] text-slate-300">Monday, Nov 2 • 25 Marks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
