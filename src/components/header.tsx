import Image from 'next/image';
import Link from 'next/link';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

const Header = () => (
  <header className='flex h-20 flex-row items-center justify-between px-[1rem]'>
    <Link href='/' className='w-[100px]'>
      <AspectRatio ratio={16 / 9}>
        <Image priority src='/logo.svg' alt='logo' fill className='object-contain' />
      </AspectRatio>
    </Link>

    <Button size='xl' asChild className='text-lg font-light'>
      <Link href={'/create-post'}>Create</Link>
    </Button>
  </header>
);

export default Header;
