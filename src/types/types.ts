import { z } from 'zod';

export type SVGProps = {
  className?: string;
};

export const CloudinaryUploadDataSchema = z.object({
  asset_id: z.string(),
  public_id: z.string(),
  version: z.number(),
  version_id: z.string(),
  signature: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  resource_type: z.string(),
  created_at: z.string(),
  tags: z.array(z.string()),
  bytes: z.number(),
  type: z.string(),
  etag: z.string(),
  placeholder: z.boolean(),
  url: z.string(),
  secure_url: z.string(),
  folder: z.string(),
  access_mode: z.string(),
  original_filename: z.string(),
});

export const PromptSchema = z.string().min(3, 'Prompt must be at least 3 characters long.');
export const NameSchema = z.string().min(1, 'Name cannot be empty.');

export const PostSchema = z.object({
  _id: z.string().optional(),
  name: NameSchema,
  prompt: PromptSchema,
  image: z.string().min(3, 'Image URL must be at least 3 characters long.'),
});
