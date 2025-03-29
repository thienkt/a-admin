import { readFile } from 'fs/promises';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';
// @ts-expect-error - No types available for pdf-parse
import pdf from 'pdf-parse/lib/pdf-parse';
import { defineEventHandler, readBody, getRequestHeaders } from 'h3';
import path from 'path';

interface Question {
  id: number;
  question: string;
  category: string;
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(process.cwd(), 'server/uploads'),
    filename: (
      req: unknown,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export default defineEventHandler(async (event) => {
  try {
    const contentType = getRequestHeaders(event)['content-type'] || '';

    // Handle file upload if multipart/form-data
    if (contentType.includes('multipart/form-data')) {
      return new Promise((resolve, reject) => {
        const multerMiddleware = upload.single('file');
        // @ts-expect-error - multer types don't match exactly with h3's event
        multerMiddleware(event.node.req, event.node.res, async (err) => {
          if (err) {
            console.error('Multer error:', err);
            reject({ error: 'File upload failed', details: err.message });
            return;
          }

          try {
            // @ts-expect-error - multer adds file to request
            const file = event.node.req.file;

            if (!file) {
              reject({ error: 'No file uploaded' });
              return;
            }

            // Process PDF file
            if (file.mimetype === 'application/pdf') {
              const fileBuffer = await readFile(file.path);

              // Get language from the form data if available
              // @ts-expect-error - accessing body field from the request
              const language = event.node.req.body.language || 'en';

              const pdfData = await pdf(fileBuffer);
              const jdText = pdfData.text;

              const questions = await generateInterviewQuestions(
                jdText,
                language,
              );
              resolve({
                questions,
                pdfContent: jdText, // Return the PDF text content
              });
            } else {
              reject({
                error: 'Unsupported file type. Please upload a PDF file.',
              });
            }
          } catch (error) {
            reject({
              error: 'Failed to process file',
              details: error instanceof Error ? error.message : String(error),
            });
          }
        });
      });
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
I need you to create 5 interview questions based on the following job description.

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
