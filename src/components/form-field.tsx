'use client';

import { FormEvent } from 'react';
import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SurpriseMeButton from '@/components/surprise-me-button';

const FormField = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='container flex flex-col items-center gap-8 sm:w-[500px]'>
      <div className='flex w-full flex-col gap-2'>
        <Label htmlFor='name'>Your Name</Label>
        <Input type='text' id='name' placeholder='Name' />
      </div>

      <div className='flex w-full flex-col gap-2'>
        <div className='flex flex-row items-center gap-2 '>
          <Label htmlFor='prompt'>Prompt</Label>
          <SurpriseMeButton />
        </div>
        <Input type='text' id='prompt' placeholder={''} />
      </div>

      <div className='w-full rounded-md border border-border p-4 '>
        <AspectRatio ratio={1}>
          <Image priority src='/preview.png' alt='logo' fill className='object-contain opacity-50' />
        </AspectRatio>
      </div>

      <Button type='submit' className='w-full'>
        Generate
      </Button>
    </form>
  );
};

export default FormField;
