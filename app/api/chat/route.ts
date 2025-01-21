import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const model = 'deepseek-chat';
const apiKey = process.env.DEEPSEEK_API_KEY;

const openai = createOpenAI({
  baseURL: 'https://api.deepseek.com/beta',
  apiKey,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai(model),
    system: 'you are a helpful assistant, but answer only "YES" or "NO", with no other words, and if question has answer, answer "HAHA"',
    messages,
  });

  return result.toDataStreamResponse();
}

