'use server';

import { z } from 'zod';

import { PostSchemaModel } from '@/types/client-types';
import { connectToDatabase } from '@/lib/connectToDatabase';
import { plainify } from '@/lib/utils';

export async function getPosts() {
  const { postCollection } = await connectToDatabase();

  const fetchedPosts = await postCollection.find().sort({ _id: -1 }).toArray();

  const parsedFetchedPosts = z.array(PostSchemaModel).safeParse(plainify(fetchedPosts));
  if (!parsedFetchedPosts.success) throw new Error(parsedFetchedPosts.error.message);

  return parsedFetchedPosts.data;
}
