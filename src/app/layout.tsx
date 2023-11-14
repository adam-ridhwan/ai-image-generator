import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/providers/auth-provider';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

import { connectToDatabase } from '@/lib/connectToDatabase';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Image Generator',
  description: 'Generate images with ai',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} min-h-[100dvh]`}>
        <AuthProvider>
          <Toaster richColors position='top-center' toastOptions={{ style: { fontSize: '16px' } }} />
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
