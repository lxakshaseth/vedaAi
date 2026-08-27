'use client';
import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  Download,
  Share2,
  Sparkles,
  X,
  FileCheck,
  Users,
  Award,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface AssignmentsScreenProps {
  onGradeAssignment: (assignmentId: string) => void;
  onOpenToolkit: () => void;
}

interface Assignment {
  id: string;
  title: string;
  class: string;
  subject: string;
  dueDate: string;
  totalMarks: number;
  submittedCount: number;
  totalStudents: number;
  gradedCount: number;
  avgScore?: number;
  status: 'active' | 'scheduled' | 'completed';
  tags: string[];
}

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Class 10 Biology - Unit Test: Life Processes & Photosynthesis',
    class: 'Class 10-A',
    subject: 'Biology',
    dueDate: 'Oct 28, 2026',
    totalMarks: 50,
    submittedCount: 32,
    totalStudents: 34,
    gradedCount: 32,
    avgScore: 78.4,
    status: 'active',
    tags: ['CBSE Aligned', 'Handwritten Answers', 'Diagrams Included'],
  },
  {
    id: 'asg-2',
    title: 'Chemical Reactions & Balanced Chemical Equations Practice',
    class: 'Class 10-B',
    subject: 'Chemistry',
    dueDate: 'Nov 02, 2026',
    totalMarks: 25,
    submittedCount: 28,
    totalStudents: 32,
    gradedCount: 14,
    avgScore: 71.0,
    status: 'active',
    tags: ['Equation Balancing', 'Redox Reactions'],
  },
  {
    id: 'asg-3',
    title: 'Force, Acceleration and Newton Laws Problem Worksheet',
    class: 'Class 9-A',
    subject: 'Physics',
    dueDate: 'Nov 05, 2026',
    totalMarks: 30,
    submittedCount: 16,
    totalStudents: 38,
    gradedCount: 0,
    status: 'active',
    tags: ['Numerical Problems', 'Vectors'],
  },
  {
    id: 'asg-4',
    title: 'Cell Organelles & Electron Microscope Structures Lab Report',
    class: 'Class 11-A',
    subject: 'Biology',
    dueDate: 'Nov 12, 2026',
    totalMarks: 40,
    submittedCount: 0,
    totalStudents: 38,
    gradedCount: 0,
    status: 'scheduled',
    tags: ['Term 1 Practical', 'Rubric Ready'],
  },
  {
    id: 'asg-5',
    title: 'Mendelian Genetics, Monohybrid and Dihybrid Cross Assessment',
    class: 'Class 10-A',
    subject: 'Biology',
    dueDate: 'Oct 15, 2026',
    totalMarks: 50,
    submittedCount: 34,
    totalStudents: 34,
    gradedCount: 34,
    avgScore: 86.5,
    status: 'completed',
    tags: ['Graded & Returned', 'Parent Report Sent'],
  },
];

export const AssignmentsScreen: React.FC<AssignmentsScreenProps> = ({
  onGradeAssignment,
  onOpenToolkit,
}) => {
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [tabFilter, setTabFilter] = useState<'all' | 'active' | 'scheduled' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Assignment Form State
  const [newTitle, setNewTitle] = useState('');
  const [newClass, setNewClass] = useState('Class 10-A');
  const [newSubject, setNewSubject] = useState('Biology');
  const [newDueDate, setNewDueDate] = useState('Nov 10, 2026');
  const [newMarks, setNewMarks] = useState('50');
  const [newInstructions, setNewInstructions] = useState('');

  const filteredAssignments = assignments.filter((asg) => {
    const matchesTab = tabFilter === 'all' || asg.status === tabFilter;
    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Assignment = {
      id: `asg-${Date.now()}`,
      title: newTitle,
      class: newClass,
      subject: newSubject,
      dueDate: newDueDate,
      totalMarks: Number(newMarks) || 50,
      submittedCount: 0,
      totalStudents: 34,
      gradedCount: 0,
      status: 'active',
      tags: ['AI Evaluation Ready', 'Newly Created'],
    };

    setAssignments([created, ...assignments]);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewInstructions('');
  };

  const handleAutofillWithAI = () => {
    setNewTitle('Class 10 Biology: Human Circulatory & Excretory Systems');
    setNewSubject('Biology');
    setNewClass('Class 10-A');
    setNewMarks('50');
    setNewInstructions(
      'Section A: 5 MCQs on Nephron and Double Circulation (5 marks)\nSection B: 4 Short Answers with labeled Heart Diagram (15 marks)\nSection C: Dialysis mechanism & Blood Pressure regulation (30 marks)'
    );
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col overflow-y-auto">
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Assignments &amp; Assessments
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Create, distribute, and grade assignments with optical handwriting mapping
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenToolkit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFEFE7] text-[#FF5722] border border-orange-200 hover:bg-orange-100 text-xs font-bold transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Question Synthesizer</span>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Assignment</span>
            </button>
          </div>
        </div>

        {/* Tab Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setTabFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                tabFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All ({assignments.length})
            </button>
            <button
              onClick={() => setTabFilter('active')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                tabFilter === 'active'
                  ? 'bg-[#FF5722] text-white shadow-sm'
                  : 'bg-orange-50 hover:bg-orange-100 text-[#FF5722]'
              }`}
            >
              Active ({assignments.filter((a) => a.status === 'active').length})
            </button>
            <button
              onClick={() => setTabFilter('scheduled')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                tabFilter === 'scheduled'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
              }`}
            >
              Scheduled ({assignments.filter((a) => a.status === 'scheduled').length})
            </button>
            <button
              onClick={() => setTabFilter('completed')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                tabFilter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
              }`}
            >
              Completed ({assignments.filter((a) => a.status === 'completed').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-slate-50"
            />
          </div>
        </div>

        {/* Assignments Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAssignments.map((assignment) => {
            const submissionProgress = Math.round(
              (assignment.submittedCount / assignment.totalStudents) * 100
            );
            const isFullyGraded =
              assignment.submittedCount > 0 &&
              assignment.gradedCount >= assignment.submittedCount;

            return (
              <div
                key={assignment.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-orange-300 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                {/* Card Top */}
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {assignment.class}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-orange-50 text-[#FF5722] border border-orange-200">
                          {assignment.subject}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          {assignment.totalMarks} Marks
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {assignment.title}
                      </h3>
                    </div>

                    {assignment.status === 'completed' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                        Graded
                      </span>
                    )}
                    {assignment.status === 'active' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-orange-100 text-[#FF5722] border border-orange-200 shrink-0">
                        Active
                      </span>
                    )}
                    {assignment.status === 'scheduled' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 shrink-0">
                        Scheduled
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {assignment.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submissions & Progress Bar */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">
                      Submissions: <strong className="text-slate-900">{assignment.submittedCount}/{assignment.totalStudents}</strong>
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {assignment.gradedCount} Graded with AI
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isFullyGraded ? 'bg-emerald-500' : 'bg-[#FF5722]'
                      }`}
                      style={{ width: `${submissionProgress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due: {assignment.dueDate}
                    </span>
                    {assignment.avgScore && (
                      <span className="font-bold text-slate-800">
                        Class Avg: <span className="text-emerald-600">{assignment.avgScore}%</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-100">
                  <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 p-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Question Paper PDF</span>
                  </button>

                  <button
                    onClick={() => onGradeAssignment(assignment.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Evaluate with AI</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Assignment Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-400/40 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold">Create New Assignment</h3>
                    <p className="text-xs text-slate-300">Set assessment parameters &amp; AI rubrics</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleCreateAssignment} className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* AI Autofill Prompt Suggestion */}
                <div className="bg-orange-50 p-3.5 rounded-xl border border-orange-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF5722]" />
                    <span className="text-xs font-bold text-orange-950">
                      Need inspiration? Use AI generator template
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutofillWithAI}
                    className="px-2.5 py-1 bg-white hover:bg-orange-100 text-[#FF5722] border border-orange-300 text-[11px] font-bold rounded-lg transition-colors shrink-0"
                  >
                    1-Click Autofill
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Assignment Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Unit Test: Periodic Table & Chemical Bonding"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Class Section</label>
                    <select
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                    >
                      <option value="Class 10-A">Class 10-A (Biology)</option>
                      <option value="Class 10-B">Class 10-B (Science)</option>
                      <option value="Class 9-A">Class 9-A (Physics)</option>
                      <option value="Class 11-A">Class 11-A (Bio)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Subject</label>
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Due Date</label>
                    <input
                      type="text"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Total Marks</label>
                    <input
                      type="number"
                      value={newMarks}
                      onChange={(e) => setNewMarks(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Question Paper Details / Instructions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter questions, sections, or instructions for students..."
                    value={newInstructions}
                    onChange={(e) => setNewInstructions(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md transition-all"
                  >
                    Publish Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
