import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_NODE_ENV: str(),

  MONGODB_URI: str(),
  MONGODB_DATABASE: str(),
  POST_COLLECTION: str(),

  OPENAI_API_KEY: str(),
  OPENAI_ORG: str(),

  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
});

export default env;
