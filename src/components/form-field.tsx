'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Wand from '@/icons/wand';
import { toast } from 'sonner';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SurpriseMeButton from '@/components/surprise-me-button';

const FormField = () => {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return toast.error('Name field cannot be empty.', { position: 'top-center' });
    if (!prompt) return toast.error('Prompt field cannot be empty.', { position: 'top-center' });

    try {
      const response = await fetch(`/api/dalle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        if (response.status === 504)
          throw new Error('The server took too long to respond. Please try again later.');
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      if (data.image) setImage(data.image.data[0].url);
    } catch (error) {
      toast.error(`Error generating image: ${error}`, { position: 'top-center' });
      console.error(error);
    }
  };

  return (
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

        <Textarea
          id='prompt'
          placeholder='Type a prompt'
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className='h-20 resize-none'
        />
      </div>

      <div className='w-full rounded-md border border-border p-4'>
        <AspectRatio ratio={1}>
          <Image
            priority
            src={image || '/preview.png'}
            alt='logo'
            fill
            sizes='(max-width: 640px) 558px, 434px'
            className='rounded-sm object-contain'
          />
        </AspectRatio>
      </div>

      <Button type='submit' variant='outline' className='flex w-full flex-row items-center gap-1'>
        <Wand />
        Generate
      </Button>
    </form>
  );
};

export default FormField;
