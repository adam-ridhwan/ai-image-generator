import { ObjectId } from 'mongodb';
import { z } from 'zod';

import { PostSchema } from '@/types/types';

export const PostSchemaDTO = PostSchema.extend({ _id: z.instanceof(ObjectId).optional() });

export type PostDTO = z.infer<typeof PostSchemaDTO>;
