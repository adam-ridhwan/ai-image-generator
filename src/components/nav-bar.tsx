'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';

import { Button } from '@/components/ui/button';

type Props = {
  session: Session | null;
};

const Navbar = ({ session }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <Button
        asChild
        variant={pathname === '/create' ? 'secondary' : 'ghost'}
        className='px-2 py-4 text-lg font-light md:px-4 md:py-6'
      >
        <Link href={'/create'} className='flex flex-row items-center gap-2 font-semibold'>
          <span className='hidden md:flex'>Create</span>
        </Link>
      </Button>

      <Button
        asChild
        variant={pathname === '/community' ? 'secondary' : 'ghost'}
        className='px-2 py-4 text-lg font-light md:px-4 md:py-6'
      >
        <Link href={'/community'} className='flex flex-row items-center gap-2 font-semibold'>
          <span className='hidden md:flex'>Community</span>
        </Link>
      </Button>

      {session && (
        <Button
          asChild
          variant={pathname === '/collections' ? 'secondary' : 'ghost'}
          className='px-2 py-4 text-lg font-light md:px-4 md:py-6'
        >
          <Link href={'/collections'} className='flex flex-row items-center gap-2 font-semibold'>
            <span className='hidden md:flex'>Collections</span>
          </Link>
        </Button>
      )}
    </>
  );
};

export default Navbar;
