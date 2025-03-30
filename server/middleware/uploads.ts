import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  // Check if Google AI API key is configured
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.warn(
      'WARNING: GOOGLE_AI_API_KEY is not set in environment variables!',
    );
  }
});
