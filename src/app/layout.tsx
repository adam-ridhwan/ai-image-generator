import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

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
        <Toaster richColors />
        <Header />
        {children}
      </body>
    </html>
  );
}
