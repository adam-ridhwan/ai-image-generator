'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

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
