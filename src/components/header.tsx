import Image from 'next/image';
import Link from 'next/link';
import { Crown } from '@/icons';
import { getServerSession } from 'next-auth';

import { Button } from '@/components/ui/button';
import AvatarButton from '@/components/avatar-button';
import Navbar from '@/components/nav-bar';
import SignInButton from '@/components/sign-in-button';

const Header = async () => {
  const session = await getServerSession();

  return (
    <header className='flex h-20 flex-row items-center justify-between px-[1rem]'>
      <div className='flex-1'>
        <Link href='/' className='flex w-max  flex-row items-center gap-1'>
          <div className='relative aspect-square w-12'>
            <Image src='/logo.png' alt='logo' fill className='rounded-lg object-cover' />
          </div>

          <span className='hidden text-xl font-semibold text-primary'>PixelCraft</span>
        </Link>
      </div>

      <div className='hidden flex-1 flex-row items-center justify-center gap-2 md:flex'>
        <Navbar session={session} />
      </div>

      <div className='flex flex-1 flex-row items-center justify-end gap-2'>
        {session ? (
          <div className=' flex flex-row items-center gap-4'>
            <Button size='lg' asChild className='hidden px-5 py-6 text-lg font-light md:flex'>
              <Link href={'/buy'} className='flex flex-row items-center gap-2 font-semibold'>
                <Crown />
                <span className='whitespace-nowrap'>Buy credits</span>
              </Link>
            </Button>

            <AvatarButton session={session} />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  );
};

export default Header;
