import { z } from 'zod';

import { PostSchema } from '@/types/types';

export const PostSchemaModel = PostSchema.extend({ _id: z.string().optional() });
export type PostModel = z.infer<typeof PostSchemaModel>;
