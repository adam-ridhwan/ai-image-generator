'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { PostSchemaModel } from '@/types/client-types';
import { connectToDatabase } from '@/lib/connectToDatabase';
import { plainify } from '@/lib/utils';

export async function getPosts() {
  const { postCollection } = await connectToDatabase();

  // await postCollection.deleteMany({});

  const fetchedPosts = await postCollection.find().toArray();

  const parsedFetchedPosts = z.array(PostSchemaModel).safeParse(plainify(fetchedPosts));
  if (!parsedFetchedPosts.success) throw new Error(parsedFetchedPosts.error.message);

  const posts = parsedFetchedPosts.data;

  return { posts };
}
