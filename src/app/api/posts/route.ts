import { NextResponse } from 'next/server';
import { getPosts } from '@/actions/get-posts';
import { z } from 'zod';

import { PostSchemaModel } from '@/types/client-types';
import { connectToDatabase } from '@/lib/connectToDatabase';
import { plainify } from '@/lib/utils';

export async function POST() {
  const { postCollection } = await connectToDatabase();

  // await postCollection.deleteMany({});

  const fetchedPosts = await postCollection.find().sort({ _id: -1 }).toArray();

  const parsedFetchedPosts = z.array(PostSchemaModel).safeParse(plainify(fetchedPosts));
  if (!parsedFetchedPosts.success) throw new Error(parsedFetchedPosts.error.message);

  const posts = parsedFetchedPosts.data;

  return NextResponse.json(posts, { status: 200 });
}
