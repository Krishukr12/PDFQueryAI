require('dotenv').config();

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const callAIModel = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return response.choices?.[0]?.message?.content?.trim() || 'No response.';
  } catch (error: any) {
    console.error('❌ Groq API error:', error?.message || error);
    return 'Failed to generate a response from Groq.';
  }
};
