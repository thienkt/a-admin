import { GoogleGenerativeAI } from '@google/generative-ai';
import { defineEventHandler, readBody } from 'h3';

interface Question {
  id: number;
  question: string;
  category: string;
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Accept either 'jd' or 'jdText' parameter for flexibility
    const { jd, jdText, previousQA = [], language = 'en' } = body;
    const jobDescription = jd || jdText || '';

    if (!jobDescription) {
      return { error: 'Job description is required (as jd or jdText)' };
    }

    const nextQuestion = await generateNextQuestion(
      jobDescription,
      previousQA,
      language,
    );
    return { nextQuestion };
  } catch (error) {
    console.error('Next question error:', error);
    return {
      error: 'Something went wrong',
      details: error instanceof Error ? error.message : String(error),
    };
  }
});

async function generateNextQuestion(
  jd: string,
  previousQA: Array<{ question: string; answer: string }>,
  language: string,
): Promise<Question> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemma-3-27b-it' });

    // Build context from previous Q&A
    let previousQAText = '';
    if (previousQA.length > 0) {
      previousQAText = 'Previous questions and answers:\n';
      previousQA.forEach((qa, index) => {
        previousQAText += `Question ${index + 1}: ${qa.question}\n`;
        previousQAText += `Answer ${index + 1}: ${qa.answer}\n\n`;
      });
    }

    const prompt = `
I need you to generate the next most appropriate interview question based on a job description and previous Q&A.

Job Description:
${jd}

${previousQAText}

Please create a question that would best evaluate the candidate's suitability for this role.
The question should cover areas not yet discussed or explore topics where previous answers suggest deeper investigation.

Return your response in the following JSON format only, with no additional text:

{
  "id": ${previousQA.length + 1},
  "question": "[your carefully crafted interview question here]",
  "category": "[technical or behavioral or general]"
}

The interview question should be in ${language} language.
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/s);
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      try {
        const parsed = JSON.parse(jsonStr);
        return parsed;
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        // Continue to fallback
      }
    }

    // Fallback if the model doesn't return proper JSON
    return {
      id: previousQA.length + 1,
      question: text.split('\n')[0].replace(/^\d+\.\s*/, ''),
      category: 'general',
    };
  } catch (error) {
    console.error('Error generating next question:', error);
    throw new Error('Failed to generate next interview question');
  }
}
