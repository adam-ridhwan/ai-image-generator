import { NextResponse } from 'next/server';
import { getPosts } from '@/actions/get-posts';

export async function GET() {
  const { posts } = await getPosts();

  return NextResponse.json(posts, { status: 200 });
}
