import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { PostSchemaDTO } from '@/types/server-types';
import { CloudinaryUploadDataSchema } from '@/types/types';
import { connectToDatabase } from '@/lib/connectToDatabase';
import env from '@/lib/env';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY } = env;

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const { postCollection } = await connectToDatabase();

  const body = await request.json();
  const { name, prompt, revised_prompt, image } = body;
  if (!name || !prompt || !image) return NextResponse.json('Missing parameters.', { status: 400 });

  const formData = new FormData();
  formData.append('file', image);
  formData.append('api_key', CLOUDINARY_API_KEY);
  formData.append('timestamp', ((Date.now() / 1000) | 0).toString());
  formData.append('upload_preset', 'dvxn2qft');

  // upload to cloudinary
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) return NextResponse.json(`Cloudinary error: ${response.statusText}`, { status: 400 });

  // validate cloudinary response object
  const parseResult = CloudinaryUploadDataSchema.safeParse(await response.json());
  if (!parseResult.success) return NextResponse.json('Failed to parse response data', { status: 400 });

  // validate post
  const parsedNewPost = PostSchemaDTO.safeParse({
    name,
    prompt,
    revised_prompt,
    image: parseResult.data.secure_url,
  });
  if (!parsedNewPost.success) return NextResponse.json('Failed to parse new post', { status: 400 });

  // add new post to database
  const insertResult = await postCollection.insertOne(parsedNewPost.data);
  if (!insertResult.acknowledged) return NextResponse.json('Failed to parse new post', { status: 400 });

  revalidatePath('/');

  return NextResponse.json({ uploadData: parseResult.data }, { status: 200 });
  // return NextResponse.json('Fake error', { status: 400 });
}
