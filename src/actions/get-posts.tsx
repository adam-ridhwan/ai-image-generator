'use server';

import env from '@/lib/env';

const { NEXT_PUBLIC_NODE_ENV } = env;

export async function getPosts() {
  const url =
    NEXT_PUBLIC_NODE_ENV === 'production' ? 'https://pixel-craft-rust.vercel.app/' : 'http://localhost:3000/';
  const response = await fetch(`${url}/api/posts`, {
    method: 'POST',
    cache: 'no-store',
  });

  const posts = await response.json();

  return posts;
}
