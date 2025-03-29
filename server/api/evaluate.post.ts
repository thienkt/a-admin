import { GoogleGenerativeAI } from '@google/generative-ai';
import { defineEventHandler, readBody } from 'h3';

interface Evaluation {
  score: number;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Now accepts bulk evaluation requests
    // For backward compatibility, handle both single and multiple questions
    const { questions, answers, jd, jdText, language = 'en' } = body;
    const jobDescription = jd || jdText || '';

    if (!jobDescription) {
      return { error: 'Job description is required (as jd or jdText)' };
    }

    // If we have an array of questions and answers
    if (
      questions &&
      Array.isArray(questions) &&
      answers &&
      typeof answers === 'object'
    ) {
      // Validate that we have all required data
      if (questions.length === 0) {
        return { error: 'At least one question is required' };
      }

      // Check that all questions have a corresponding answer
      for (const question of questions) {
        const questionId = question.id;
        if (!answers[questionId] || !answers[questionId].trim()) {
          return {
            error: `Answer for question ${questionId} is missing or empty`,
          };
        }
      }

      // Process all evaluations concurrently for better performance
      const evaluationPromises = questions.map((question) =>
        evaluateResponse(
          question.question,
          answers[question.id],
          jobDescription,
          language,
        ),
      );

      const evaluationResults = await Promise.all(evaluationPromises);

      // Create a map of question ID to evaluation
      const evaluations: Record<number, Evaluation> = {};
      questions.forEach((question, index) => {
        evaluations[question.id] = evaluationResults[index];
      });

      return { evaluations };
    }
    // Legacy single question/answer mode
    else {
      const { question, answer } = body;

      if (!question) {
        return { error: 'Question is required' };
      }

      if (!answer) {
        return { error: 'Answer is required' };
      }

      const evaluation = await evaluateResponse(
        question,
        answer,
        jobDescription,
        language,
      );
      return { evaluation };
    }
  } catch (error) {
    console.error('Evaluation error:', error);
    return {
      error: 'Something went wrong',
      details: error instanceof Error ? error.message : String(error),
    };
  }
});

async function evaluateResponse(
  question: string,
  answer: string,
  jd: string,
  language: string,
): Promise<Evaluation> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemma-3-27b-it' });

    const prompt = `
I need you to evaluate a candidate's answer to an interview question based on a job description.

Job Description:
${jd}

Interview Question:
${question}

Candidate's Answer:
${answer}

Please analyze how well the answer addresses the question and aligns with the job requirements.
Provide your evaluation in the following JSON format only, with no additional text:

{
  "score": [a number from 1-10, where 1 is poor and 10 is excellent],
  "feedback": "[detailed feedback explaining the overall assessment]",
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "recommendation": "[a brief recommendation for improvement]"
}

Answer in Language: ${language}
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
      score: 5,
      feedback: text,
      strengths: [],
      weaknesses: [],
      recommendation: 'Please provide a more detailed response.',
    };
  } catch (error) {
    console.error('Error evaluating response:', error);
    throw new Error('Failed to evaluate interview response');
  }
}
