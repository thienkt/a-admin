import fs from 'fs';
import path from 'path';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  const uploadsDir = path.resolve(process.cwd(), 'server/uploads');

  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Check if Google AI API key is configured
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.warn(
      'WARNING: GOOGLE_AI_API_KEY is not set in environment variables!',
    );
  } else {
    console.log('Google AI API key is configured.');
  }
});
