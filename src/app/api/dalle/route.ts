import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: 'org-CmGnkEx9vPItQClCXzpU6n2E',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body.prompt;
    console.log(prompt);

    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
    });

    return NextResponse.json({ image: image.data[0] }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
