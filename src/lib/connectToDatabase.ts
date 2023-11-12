import { clientPromise } from '@/mongodb';

import env from '@/lib/env';

const { MONGODB_DATABASE, POST_COLLECTION } = env;

export const connectToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db(MONGODB_DATABASE);

  const postCollection = db.collection(POST_COLLECTION);

  return { postCollection };
};
