'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SignInButton = () => {
  return (
    <>
      <Button size='xl' onClick={() => signIn('google')} className='px-4 py-6 text-lg'>
        Sign in
      </Button>
    </>
  );
};

export default SignInButton;
