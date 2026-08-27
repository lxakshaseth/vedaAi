import { NextRequest, NextResponse } from 'next/server';
import { processAssessmentWithGroq } from '@/lib/groq-extractor';
import { processAssessmentWithGemini } from '@/lib/gemini-extractor';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionPaperImages, answerSheetImages, userApiKey, provider } = body;

    if (!questionPaperImages || !answerSheetImages) {
      return NextResponse.json(
        { error: 'Missing required questionPaperImages or answerSheetImages' },
        { status: 400 }
      );
    }

    let result;
    if (provider === 'gemini') {
      result = await processAssessmentWithGemini(
        questionPaperImages,
        answerSheetImages,
        userApiKey
      );
    } else {
      // Default to Groq
      result = await processAssessmentWithGroq(
        questionPaperImages,
        answerSheetImages,
        userApiKey
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error processing assessment:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error during assessment processing' },
      { status: 500 }
    );
  }
}
