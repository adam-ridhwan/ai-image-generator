'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Wand from '@/icons/wand';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SurpriseMeButton from '@/components/surprise-me-button';

const FormField = () => {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ name, prompt });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex w-full flex-col gap-8'>
        <div className='flex w-full flex-col gap-2'>
          <Label htmlFor='name'>Your Name</Label>
          <Input
            type='text'
            id='name'
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className='flex w-full flex-col gap-2'>
          <div className='flex flex-row items-center gap-2 '>
            <Label htmlFor='prompt'>Prompt</Label>
            <SurpriseMeButton setPrompt={setPrompt} />
          </div>

          <Input
            type='text'
            id='prompt'
            placeholder={'Type a prompt'}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
        </div>

        <div className='w-full rounded-md border border-border p-4'>
          <AspectRatio ratio={1}>
            <Image priority src='/preview.png' alt='logo' fill className='object-contain opacity-50' />
          </AspectRatio>
        </div>

        <Button type='submit' variant='outline' className='flex w-full flex-row items-center gap-1'>
          <Wand />
          Generate
        </Button>
      </form>
    </>
  );
};

export default FormField;
