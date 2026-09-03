# Veda AI — System Architecture & Technical Specifications

## 1. System Overview

Veda AI is an automated pedagogical assessment and handwriting evaluation platform designed to bridge physical handwritten examinations with modern AI-assisted diagnostic evaluation.

```
┌───────────────────────────────┐
│     Teacher / Examiner UI    │
│  (Next.js 14 App Router + TS) │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│    Assessment Upload & Prep   │
│ (pdfjs-dist Canvas Rendering) │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   Optical & Multimodal Vision │
│  (Gemini 2.5 Flash / Vision)  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   Pedagogical Grading Engine  │
│(Groq LLaMA 3.3 70B / Fallback)│
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   Interactive Review & Diff   │
│(Audit Trail, Analytics, Export│
└───────────────────────────────┘
```

## 2. Core Subsystems

### A. Optical Recognition & Multimodal Vision
- **PDF Page Rasterizer**: Converts multi-page student exam scripts and master question papers into high-resolution RGB frames with density-preserving scale factors.
- **Bounding Box & Answer Segmentation**: Maps discrete handwriting responses to corresponding numbered rubric criteria.

### B. Dual-Engine LLM Fallback Pipeline
- **Primary Engine**: Ultra-fast inference via Groq LLaMA-3.3-70B-Versatile for structured rubric evaluation and JSON schema adherence.
- **Vision Engine**: Google Gemini 2.5 Flash for optical handwritten character extraction, mathematical diagrams, and symbol interpretation.

### C. Evaluation & Calibration
- **Rubric Schema Compliance**: Every evaluated item contains `awardedMarks`, `maxMarks`, `studentAnswer`, `feedback`, `confidenceScore`, and `boundingBox`.
- **Manual Teacher Override**: Instructors retain final authority with an integrated audit log recording manual adjustments.

## 3. Security & Data Protection
- Zero persistent PII storage by default.
- Client-side key encryption for custom API tokens.
- Composable export pipelines (CSV, JSON, PDF).
