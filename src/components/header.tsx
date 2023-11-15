import Link from 'next/link';
import Crown from '@/icons/crown';
import ImageFill from '@/icons/image-fill';
import Wand from '@/icons/wand';
import { getServerSession } from 'next-auth';

import { Button } from '@/components/ui/button';
import AvatarButton from '@/components/avatar-button';
import SignInButton from '@/components/sign-in-button';

const Header = async () => {
  const session = await getServerSession();

  return (
    <header className='flex h-20 flex-row items-center justify-between px-[1rem]'>
      <Link href='/' className='flex flex-row items-center gap-1'>
        <ImageFill />
        <span className='text-xl font-semibold text-primary'>PixelCraft</span>
      </Link>

      <div className='flex flex-row items-center gap-2'>
        {session ? (
          <div className='flex flex-row items-center gap-4'>
            {/*<Button size='lg' asChild className='px-5 py-6 text-lg font-light'>*/}
            {/*  <Link href={'/buy'} className='flex flex-row items-center gap-2 font-semibold'>*/}
            {/*    <Crown />*/}
            {/*    Buy credits*/}
            {/*  </Link>*/}
            {/*</Button>*/}

            <Button size='icon' asChild className='text-lg font-light'>
              <Link href={'/create'} className='flex flex-row items-center gap-2 font-semibold'>
                <Wand />
                {/*Create*/}
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
