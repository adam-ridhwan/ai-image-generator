import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import env from '@/lib/env';

const { GOOGLE_ID, GOOGLE_SECRET } = env;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
