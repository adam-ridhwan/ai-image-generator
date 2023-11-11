import Link from 'next/link';
import ImageFill from '@/icons/image-fill';

import { Button } from '@/components/ui/button';

const Header = () => (
  <header className='flex h-20 flex-row items-center justify-between px-[1rem]'>
    <Link href='/' className='flex flex-row items-center gap-1'>
      <ImageFill />
      <span className='text-xl font-semibold text-primary'>PixelCraft</span>
    </Link>

    <Button size='xl' asChild className='text-lg font-light'>
      <Link href={'/create-post'}>Create</Link>
    </Button>
  </header>
);

export default Header;
