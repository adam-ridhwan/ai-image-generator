'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  session: Session;
};

const AvatarButton = ({ session }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button className='relative aspect-square rounded-full py-5'>
          <Image
            src={`${session.user?.image}`}
            alt='user avatar'
            fill
            className='rounded-full object-cover'
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-[16rem] px-5 py-3'>
        <DropdownMenuLabel className='flex flex-col'>
          <span className='text-xl'>{session.user?.name}</span>
          <span className='text-lg font-normal'>{session.user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Button variant='outline' onClick={() => signOut()} className='mt-4 w-full'>
          Sign out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarButton;
