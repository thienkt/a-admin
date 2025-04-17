import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRequire } from 'module';
import {
  defineEventHandler,
  readBody,
  getRequestHeaders,
  readMultipartFormData,
} from 'h3';

interface Question {
  id: number;
  question: string;
  category: string;
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export default defineEventHandler(async (event) => {
  try {
    const contentType = getRequestHeaders(event)['content-type'] || '';

    // Handle file upload if multipart/form-data
    if (contentType.includes('multipart/form-data')) {
      const formData = await readMultipartFormData(event);

      if (!formData || formData.length === 0) {
        return { error: 'No form data received' };
      }

      // Find the file part in the form data
      const filePart = formData.find((part) => part.name === 'file');
      const languagePart = formData.find((part) => part.name === 'language');
      const language =
        languagePart && languagePart.data
          ? new TextDecoder().decode(languagePart.data)
          : 'en';

      if (!filePart || !filePart.data) {
        return { error: 'No file uploaded' };
      }

      // Check file type by looking at filename or content-type
      const filename = filePart.filename || '';
      const isPdf =
        filePart.type === 'application/pdf' ||
        filename.toLowerCase().endsWith('.pdf');

      if (!isPdf) {
        return { error: 'Unsupported file type. Please upload a PDF file.' };
      }

      try {
        // Process the PDF directly from the buffer
        const pdf = createRequire(import.meta.url)('pdf-parse');
        const pdfData = await pdf(filePart.data);
        const jdText = pdfData.text;

        const questions = await generateInterviewQuestions(jdText, language);
        return {
          questions,
          pdfContent: jdText, // Return the PDF text content
        };
      } catch (error) {
        return {
          error: 'Failed to process file',
          details: error instanceof Error ? error.message : String(error),
        };
      }
    } else {
      // Handle direct JD text input
      const body = await readBody(event);
      const { jdText, language = 'en' } = body;

      if (!jdText) {
        return { error: 'Job description text is required' };
      }

      const questions = await generateInterviewQuestions(jdText, language);
      return {
        questions,
        pdfContent: jdText, // Return the text content for consistency
      };
    }
  } catch (error) {
    return {
      error: 'Something went wrong',
      details: error instanceof Error ? error.message : String(error),
    };
  }
});

async function generateInterviewQuestions(
  jdText: string,
  language: string,
): Promise<Question[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemma-3-27b-it' });

    const prompt = `
I need you to create 15 interview questions based on the following job description.

Job Description:
${jdText}

Please generate questions that would help evaluate if a candidate is suitable for this role.
Include a mix of technical questions to assess skills and behavioral questions to assess fit.

Return your response in the following JSON format only, with no additional text:

[
  {
    "id": 1,
    "question": "[first interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 2,
    "question": "[second interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 3,
    "question": "[third interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 4,
    "question": "[fourth interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 5,
    "question": "[fifth interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 6,
    "question": "[sixth interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 7,
    "question": "[seventh interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 8,
    "question": "[eighth interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 9,
    "question": "[ninth interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 10,
    "question": "[tenth interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 11,
    "question": "[eleventh interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 12,
    "question": "[twelfth interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 13,
    "question": "[thirteenth interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 14,
    "question": "[fourteenth interview question]",
    "category": "[technical or behavioral or general]"
  },
  {
    "id": 15,
    "question": "[fifteenth interview question]",
    "category": "[technical or behavioral or general]"
  }
]

Answer in ${language}.
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\[.*\]/s);
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

    // Fallback parsing if the model doesn't return proper JSON
    return [
      {
        id: 1,
        question: text.split('\n')[0].replace(/^\d+\.\s*/, ''),
        category: 'general',
      },
    ];
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate interview questions');
  }
}
