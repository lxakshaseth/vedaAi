# Veda AI — API Reference & Schema Specifications

## Endpoint: `/api/process-assessment`

### Method: `POST`

Handles optical recognition, handwriting mapping, and rubric evaluation.

#### Request Payload (`FormData` or `JSON`):

| Field | Type | Required | Description |
|---|---|---|---|
| `questionPdf` | File (PDF) | Yes | Master question paper with scoring rubrics |
| `answerPdf` | File (PDF) | Yes | Student handwritten answer sheet |
| `studentName` | string | Optional | Name of the student (default: "Unknown Student") |
| `studentId` | string | Optional | Identifier / roll number |
| `apiKey` | string | Optional | Custom Groq / Gemini API key |

#### Response Schema:

```json
{
  "studentName": "Sarah Jenkins",
  "studentId": "STU-2024-88",
  "totalScore": 88,
  "maxScore": 100,
  "percentage": 88.0,
  "questions": [
    {
      "questionNumber": 1,
      "questionText": "Derive the kinematic equation for displacement under constant acceleration.",
      "awardedMarks": 10,
      "maxMarks": 10,
      "studentAnswer": "v^2 = u^2 + 2as. Starting from a = dv/dt, integrating both sides...",
      "feedback": "Flawless step-by-step calculus integration and unit notation.",
      "confidence": 0.96
    }
  ]
}
```
