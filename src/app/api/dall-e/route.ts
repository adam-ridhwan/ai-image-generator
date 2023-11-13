import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { PromptSchema } from '@/types/types';
import env from '@/lib/env';

const { OPENAI_API_KEY, OPENAI_ORG } = env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORG,
});

export async function POST(request: Request) {
  // await delay(3000);
  // return NextResponse.json({ message: 'TESTING: hello from dall-e' }, { status: 200 });

  const body = await request.json();
  const prompt = body.prompt;

  const parsedPrompt = PromptSchema.safeParse(prompt);
  if (!parsedPrompt.success) return NextResponse.json(parsedPrompt.error.message, { status: 400 });

  // dall-e image generation
  try {
    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: parsedPrompt.data,
      n: 1,
      size: '1024x1024',
    });

    return NextResponse.json(image, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(String(error.error.message), { status: error.status });
  }
}
