import '@/types/types';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <main className='mb-20 flex flex-col items-center gap-8 p-4'>
      <Image src='/robot.png' alt='robot' width={640} height={640} className='rounded-lg' />

      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-center text-4xl font-extrabold text-primary md:text-left md:text-6xl'>
          Generate images with AI
        </h1>
        <p className='text-center text-xl font-light text-muted-foreground md:text-left md:text-3xl'>
          Simplicity in design
        </p>
        <Button asChild size='lg' className='mt-4 text-lg md:w-max'>
          <Link href={'/create'}>Try now</Link>
        </Button>
      </div>
    </main>
  );
}
