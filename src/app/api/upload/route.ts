import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { PostSchemaDTO } from '@/types/server-types';
import { CloudinaryUploadDataSchema } from '@/types/types';
import { connectToDatabase } from '@/lib/connectToDatabase';
import env from '@/lib/env';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY } = env;

export async function GET(request: Request) {}

export async function POST(request: Request) {
  try {
    const { postCollection } = await connectToDatabase();

    const body = await request.json();
    const { name, prompt, image } = body;

    if (!name) throw new Error('Name field is not provided.');
    if (!prompt) throw new Error('Prompt field is not provided.');
    if (!image) throw new Error('Image URL field is not provided.');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('timestamp', ((Date.now() / 1000) | 0).toString());
    formData.append('upload_preset', 'dvxn2qft');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error(`Cloudinary error: ${response.statusText}`);

    const parseResult = CloudinaryUploadDataSchema.safeParse(await response.json());
    if (!parseResult.success) throw new Error('Failed to parse response data');

    const parsedNewPost = PostSchemaDTO.safeParse({
      name,
      prompt,
      image: parseResult.data.secure_url,
    });
    if (!parsedNewPost.success) throw new Error('Failed to parse new post');

    const insertResult = await postCollection.insertOne(parsedNewPost.data);
    if (!insertResult.acknowledged) throw new Error('Document insertion failed.');

    return NextResponse.json({ uploadData: parseResult.data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
