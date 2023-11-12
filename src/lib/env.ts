import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_NODE_ENV: str(),

  MONGODB_URI: str(),
  MONGODB_DATABASE: str(),

  POST_COLLECTION: str(),

  NEXTAUTH_SECRET: str(),
  NEXTAUTH_URL: str(),

  GOOGLE_ID: str(),
  GOOGLE_SECRET: str(),

  OPENAI_API_KEY: str(),
});

export default env;
