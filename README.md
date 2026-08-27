# VedaAI - Next-Gen AI Grading & Teacher Copilot Platform

A full-stack, enterprise-grade AI assessment and optical grading platform built for **VedaAI**. It pairs printed question papers with handwritten student answer sheets, performs sub-second optical bounding-box mapping, generates step-wise rubric marks, and delivers comprehensive classroom analytics alongside an AI Teacher's Toolkit.

---

## 🚀 Live Repository & Demo
- **GitHub Repository**: [https://github.com/lxakshaseth/vedaAi](https://github.com/lxakshaseth/vedaAi)
- **Tech Stack**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Groq Vision API (`llama-3.2-90b-vision-preview`), Google Gemini API (`@google/generative-ai`), Lucide Icons.

---

## 🌟 Comprehensive Feature Modules

### 1. 🌐 Professional SaaS Product Website (`LandingWebsite.tsx`)
- **Modern Glassmorphic Hero**: Highlighting sub-second optical evaluation, CBSE & ICSE curriculum alignment, and trusted institution badges (DPS, Kendriya Vidyalaya, DAV, Ryan).
- **Live Optical Mapping Visualizer**: Side-by-side interactive demo showcasing question paper prompts alongside handwritten student answer scripts with real-time green/coral bounding boxes.
- **Core Platform Features**: Sub-second OCR, Scrambled Answer Realignment, Step-wise Partial Marking, Class Gap Heatmaps, and Enterprise FERPA/DPDP privacy.
- **Interactive Faculty ROI Calculator**: Calculates teacher hours saved and 10x grading turnaround speedups based on student counts and test frequency.
- **Transparent Pricing Tiers**: Educator Free, Pro Teacher, and Institutional Campus plans.

### 2. 🏠 Teacher Home Dashboard (`HomeScreen.tsx`)
- **Key Metrics**: 142 Enrolled Students, 328 Papers Graded (99.2% accuracy), 3 Active Exams, 48.5 hrs Teacher Time Saved.
- **AI Diagnostic Insights**: Real-time pedagogical recommendations (e.g. *68% students struggled with Photolysis & Thylakoid structure on Q4*).
- **Recent Assessments & Class Health**: Real-time status for Class 10-A, 10-B, 9-A, 11-A with subject mastery progress bars.
- **Live Activity Feed & Upcoming Test Deadlines**.

### 3. 👥 My Classroom Manager (`ClassroomScreen.tsx`)
- **Class Section Switcher**: Class 10-A (Biology), Class 10-B (General Science), Class 9-A (Physics), Class 11-A (Bio-Science).
- **Interactive Student Roster**: Search by student name or roll number, filter by status tier (Top Tier >85%, On Track, Needs Attention).
- **Student Profile Drawer**: Deep-dive into student strengths, recommended remedial practice, recent scores, and direct link to handwritten answer sheets.

### 4. 📝 Assignments & Homework Tracker (`AssignmentsScreen.tsx`)
- **Status Filters**: Active, Scheduled, and Completed assessments.
- **Submission Progress**: Visual progress bars (`32/34 submitted`, `32 graded with AI`), due dates, and average scores.
- **Interactive Assignment Builder**: Modal with 1-click AI prompt generator, mark allocations, and question instructions.
- **Direct Optical Grading Integration**: 1-click launch into the AI Answer Mapping engine.

### 5. 📚 My Library Repository (`LibraryScreen.tsx`)
- **Resource Categories**: Question Banks, Past Exam Papers, AI Rubrics, and 45-Minute Lesson Plans.
- **Subject & Grade Filters**: CBSE Class 9, 10, 11, and 12 across Biology, Physics, and Chemistry.
- **Document Quick Preview**: Modal with 1-click **Copy Text** and **Load into Exam Evaluator**.

### 6. ✨ AI Teacher's Toolkit (`AIToolkitModal.tsx`)
- **4-Tier Rubric Maker**: Generates standardized criteria for light reactions, diagrams, and formulas.
- **CBSE Question Synthesizer**: Generates balanced multi-section test papers with mark allocations.
- **45-Min Lesson Plan Outline**: Structured timing, interactive hooks, direct instruction, and exit tickets.
- **Personalized Student Feedback Draft**: High-performer praises and targeted remedial instructions.

### 7. 🔍 Optical Answer Mapping & Grading Engine (`MappingScreen.tsx`)
- **Sub-part Splitting**: Automatically splits compound questions (e.g. `Q11 (a)` and `Q11 (b)`).
- **Normalized Bounding Box Highlights**: Overlays optical coordinates on handwritten pages with solid color indicators.
- **Bidirectional Synchronization**: Clicking any question jumps to the handwritten box; clicking an answer box highlights the corresponding question card.
- **Out-of-Order & Scratchwork Handling**: Identifies scrambled answers across different pages.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Vision AI Engine**:
  - Groq Llama-3.2 90B Vision (`llama-3.2-90b-vision-preview`) via `@groq-sdk`
  - Google Gemini 1.5 Flash (`gemini-1.5-flash`) via `@google/generative-ai`
  - Client-side PDF page rasterization with `pdfjs-dist`
- **Design System**: Warm Coral `#FF5722`, Soft Peach `#FFEFE7`, Slate Grays, and Emerald Accents.

---

## 📦 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lxakshaseth/vedaAi.git
   cd vedaAi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📄 License
MIT License © VedaAI Inc.
