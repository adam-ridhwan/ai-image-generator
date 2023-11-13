import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { PromptSchema } from '@/types/types';
import env from '@/lib/env';
import { delay } from '@/lib/utils';

const { OPENAI_API_KEY, OPENAI_ORG } = env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORG,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body.prompt;

    const parsedPrompt = PromptSchema.safeParse(prompt);
    if (!parsedPrompt.success) throw new Error(parsedPrompt.error.message);

    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: parsedPrompt.data,
      n: 1,
      size: '1024x1024',
    });

    return NextResponse.json({ image: image }, { status: 200 });

    // await delay(3000);

    // return NextResponse.json({ message: 'TESTING: hello from dall-e' }, { status: 200 });
  } catch (err) {
    const { status, error }: any = err;
    console.log(err);
    return NextResponse.json({ message: error.message }, { status });
  }
}
