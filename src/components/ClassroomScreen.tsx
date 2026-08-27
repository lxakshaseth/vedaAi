'use client';
import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Download,
  Filter,
  GraduationCap,
  Award,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Mail,
  FileText,
  Eye,
  X,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface ClassroomScreenProps {
  onEvaluateStudentExam?: (studentName: string) => void;
}

interface Student {
  id: string;
  rollNo: string;
  name: string;
  avatar: string;
  recentScore: number;
  maxScore: number;
  attendance: string;
  status: 'outstanding' | 'ontrack' | 'needs_attention';
  strengths: string[];
  weaknesses: string[];
  aiNote: string;
  lastExamTitle: string;
}

const CLASS_DATA: Record<string, { subject: string; students: Student[] }> = {
  'Class 10-A': {
    subject: 'Biology & Life Sciences',
    students: [
      {
        id: 's-1',
        rollNo: '10A-01',
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        recentScore: 47,
        maxScore: 50,
        attendance: '98%',
        status: 'outstanding',
        strengths: ['Cellular Respiration', 'Organelle Diagrams', 'Structured Explanations'],
        weaknesses: ['Calvin cycle timing'],
        aiNote: 'Consistently exceptional diagrams and biological taxonomy accuracy.',
        lastExamTitle: 'Unit Test: Life Processes & Photosynthesis',
      },
      {
        id: 's-2',
        rollNo: '10A-02',
        name: 'Aarav Patel',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
        recentScore: 39,
        maxScore: 50,
        attendance: '92%',
        status: 'ontrack',
        strengths: ['Definition Recall', 'Nutritional Modes'],
        weaknesses: ['Photolysis Equation', 'Diagram labels'],
        aiNote: 'Strong conceptual understanding; needs practice on chloroplast labeling accuracy.',
        lastExamTitle: 'Unit Test: Life Processes & Photosynthesis',
      },
      {
        id: 's-3',
        rollNo: '10A-03',
        name: 'Ananya Verma',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        recentScore: 45,
        maxScore: 50,
        attendance: '96%',
        status: 'outstanding',
        strengths: ['Chloroplast Structure', 'Enzyme Catalysis', 'Handwriting'],
        weaknesses: ['Time management on Section C'],
        aiNote: 'Excellent handwriting and clear stepwise answers.',
        lastExamTitle: 'Unit Test: Life Processes & Photosynthesis',
      },
      {
        id: 's-4',
        rollNo: '10A-04',
        name: 'Rohan Mehra',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        recentScore: 26,
        maxScore: 50,
        attendance: '82%',
        status: 'needs_attention',
        strengths: ['Basic Definitions'],
        weaknesses: ['Light vs Dark Reactions', 'Stomatal Mechanism', 'Diagrams'],
        aiNote: 'Confused light reaction inputs with Calvin cycle products. Remedial review recommended.',
        lastExamTitle: 'Unit Test: Life Processes & Photosynthesis',
      },
      {
        id: 's-5',
        rollNo: '10A-05',
        name: 'Sneha Kulkarni',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        recentScore: 41,
        maxScore: 50,
        attendance: '94%',
        status: 'ontrack',
        strengths: ['Plant Physiology', 'Transpiration'],
        weaknesses: ['RuBisCO Enzyme terminology'],
        aiNote: 'Good logical answers; minor gaps in technical botanical terms.',
        lastExamTitle: 'Unit Test: Life Processes & Photosynthesis',
      },
      {
        id: 's-6',
        rollNo: '10A-06',
        name: 'Kabir Das',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        recentScore: 24,
        maxScore: 50,
        attendance: '80%',
        status: 'needs_attention',
        strengths: ['Exit Ticket Quizzes'],
        weaknesses: ['Handwriting Clarity', 'Long Answer Formats', 'Formulae'],
        aiNote: 'Handwriting requires contrast tuning; omitted 2 sub-parts in Section B.',
        lastExamTitle: 'Unit Test: Life Processes & Photosynthesis',
      },
    ],
  },
  'Class 10-B': {
    subject: 'General Science',
    students: [
      {
        id: 's-11',
        rollNo: '10B-01',
        name: 'Tanvi Joshi',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
        recentScore: 44,
        maxScore: 50,
        attendance: '95%',
        status: 'outstanding',
        strengths: ['Chemical Equations', 'Balancing'],
        weaknesses: ['Redox Definitions'],
        aiNote: 'Strong in chemistry and numerical problems.',
        lastExamTitle: 'Mid-Term Science Exam',
      },
      {
        id: 's-12',
        rollNo: '10B-02',
        name: 'Devansh Reddy',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        recentScore: 36,
        maxScore: 50,
        attendance: '89%',
        status: 'ontrack',
        strengths: ['Acids & Bases'],
        weaknesses: ['pH Scale Applications'],
        aiNote: 'Consistent performance with steady improvement.',
        lastExamTitle: 'Mid-Term Science Exam',
      },
    ],
  },
  'Class 9-A': {
    subject: 'Physics & Chemistry',
    students: [
      {
        id: 's-21',
        rollNo: '9A-01',
        name: 'Ishaan Gupta',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
        recentScore: 48,
        maxScore: 50,
        attendance: '99%',
        status: 'outstanding',
        strengths: ['Kinematics', 'Newton Laws of Motion'],
        weaknesses: ['Friction Vector Diagrams'],
        aiNote: 'Top ranker in Class 9 physics.',
        lastExamTitle: 'Unit Test: Force and Laws of Motion',
      },
    ],
  },
  'Class 11-A': {
    subject: 'Advanced Bio-Science',
    students: [
      {
        id: 's-31',
        rollNo: '11A-01',
        name: 'Meera Nambiar',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        recentScore: 49,
        maxScore: 50,
        attendance: '97%',
        status: 'outstanding',
        strengths: ['Biomolecules', 'Genetic Code'],
        weaknesses: ['Enzyme Kinetics Michaelis-Menten'],
        aiNote: 'Exceptional analytical biology skills.',
        lastExamTitle: 'Cell Biology & Biomolecules Test',
      },
    ],
  },
};

export const ClassroomScreen: React.FC<ClassroomScreenProps> = ({
  onEvaluateStudentExam,
}) => {
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'outstanding' | 'ontrack' | 'needs_attention'>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const currentClassData = CLASS_DATA[selectedClass] || CLASS_DATA['Class 10-A'];
  const studentsList = currentClassData.students;

  const filteredStudents = studentsList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const totalStudents = studentsList.length;
  const avgScore =
    Math.round(
      (studentsList.reduce((acc, s) => acc + (s.recentScore / s.maxScore) * 100, 0) /
        totalStudents) *
        10
    ) / 10;
  const topPerformersCount = studentsList.filter((s) => s.status === 'outstanding').length;
  const needsHelpCount = studentsList.filter((s) => s.status === 'needs_attention').length;

  return (
    <div className="flex-1 bg-slate-50 flex flex-col overflow-y-auto">
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header with Title & Batch Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Classrooms
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Delhi Public School • Manage student rosters, gradebooks, and performance analytics
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-all">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-sm transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* Class Selection Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {Object.keys(CLASS_DATA).map((clsName) => {
            const isActive = selectedClass === clsName;
            return (
              <button
                key={clsName}
                onClick={() => {
                  setSelectedClass(clsName);
                  setSelectedStudent(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#FFEFE7] text-[#FF5722] border border-orange-300 shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>{clsName}</span>
                <span className="text-[10px] bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded-full font-semibold">
                  {CLASS_DATA[clsName].students.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Classroom Summary KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Subject / Course</span>
            <p className="text-sm font-extrabold text-slate-900 truncate mt-1">{currentClassData.subject}</p>
            <span className="text-[11px] text-slate-400">Class Incharge: Madhur Rastogi</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Class Average</span>
            <div className="flex items-baseline gap-1 mt-1">
              <p className="text-2xl font-extrabold text-slate-900">{avgScore}%</p>
              <span className="text-[11px] font-bold text-emerald-600">Unit Test 1</span>
            </div>
            <span className="text-[11px] text-slate-400">Target: 80%+</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Top Tier (&gt;85%)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <p className="text-2xl font-extrabold text-emerald-600">{topPerformersCount}</p>
              <span className="text-[11px] text-slate-400">students</span>
            </div>
            <span className="text-[11px] text-slate-400">Outstanding mastery</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Remedial Focus</span>
            <div className="flex items-baseline gap-1 mt-1">
              <p className="text-2xl font-extrabold text-amber-600">{needsHelpCount}</p>
              <span className="text-[11px] text-slate-400">students</span>
            </div>
            <span className="text-[11px] text-amber-600 font-semibold">Suggested practice set ready</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student by name or roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-slate-50"
            />
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All ({studentsList.length})
            </button>
            <button
              onClick={() => setStatusFilter('outstanding')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                statusFilter === 'outstanding'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
              }`}
            >
              Top Tier ({topPerformersCount})
            </button>
            <button
              onClick={() => setStatusFilter('needs_attention')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                statusFilter === 'needs_attention'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-700'
              }`}
            >
              Needs Help ({needsHelpCount})
            </button>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Roll No</th>
                  <th className="py-3.5 px-4">Recent Test Score</th>
                  <th className="py-3.5 px-4">Attendance</th>
                  <th className="py-3.5 px-4">Performance Tier</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => {
                    const scorePct = Math.round((student.recentScore / student.maxScore) * 100);
                    return (
                      <tr
                        key={student.id}
                        onClick={() => setSelectedStudent(student)}
                        className="hover:bg-orange-50/40 transition-colors cursor-pointer group"
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm"
                            />
                            <div>
                              <p className="font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors">
                                {student.name}
                              </p>
                              <p className="text-[11px] text-slate-400">{student.lastExamTitle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">
                          {student.rollNo}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <span className="font-extrabold text-slate-900">
                              {student.recentScore}/{student.maxScore}
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold">
                              ({scorePct}%)
                            </span>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                              <div
                                className={`h-full rounded-full ${
                                  scorePct >= 85
                                    ? 'bg-emerald-500'
                                    : scorePct >= 60
                                    ? 'bg-blue-500'
                                    : 'bg-amber-500'
                                }`}
                                style={{ width: `${scorePct}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">
                          {student.attendance}
                        </td>
                        <td className="py-3.5 px-4">
                          {student.status === 'outstanding' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Award className="w-3 h-3 text-emerald-600" />
                              Outstanding
                            </span>
                          )}
                          {student.status === 'ontrack' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              <CheckCircle2 className="w-3 h-3 text-blue-600" />
                              On Track
                            </span>
                          )}
                          {student.status === 'needs_attention' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              Needs Focus
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudent(student);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">Profile</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                      No students found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Profile Drawer Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold">{selectedStudent.name}</h3>
                      <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-orange-300">
                        {selectedStudent.rollNo}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {selectedClass} • {currentClassData.subject} • Attendance {selectedStudent.attendance}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Score Banner */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Recent Exam Performance</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedStudent.lastExamTitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#FF5722]">
                      {selectedStudent.recentScore}
                      <span className="text-sm text-slate-400 font-semibold">/{selectedStudent.maxScore}</span>
                    </span>
                    <p className="text-[11px] font-bold text-emerald-600">
                      {Math.round((selectedStudent.recentScore / selectedStudent.maxScore) * 100)}% Grade A
                    </p>
                  </div>
                </div>

                {/* AI Pedagogical Note */}
                <div className="bg-orange-50/80 p-4 rounded-2xl border border-orange-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-900">
                    <Sparkles className="w-4 h-4 text-[#FF5722]" />
                    <span>AI Teacher Diagnostic Note</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {selectedStudent.aiNote}
                  </p>
                </div>

                {/* Strengths and Focus Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/40 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Topic Strengths
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {selectedStudent.strengths.map((str, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-amber-50/40 space-y-2">
                    <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Recommended Practice
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {selectedStudent.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setSelectedStudent(null);
                    if (onEvaluateStudentExam) onEvaluateStudentExam(selectedStudent.name);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md transition-all"
                >
                  <span>View Handwritten Answer Sheet</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
