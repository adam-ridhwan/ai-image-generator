'use client';

import { FormEvent, useState } from 'react';
import LoadingSpinner from '@/icons/loading-spinner';
import Wand from '@/icons/wand';
import { atom, useAtom, useSetAtom } from 'jotai';
import { z } from 'zod';

import { PromptSchema } from '@/types/types';
import { cn } from '@/lib/utils';
import { useWrappedRequest } from '@/hooks/useWrappedRequest';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { isGeneratedImageDialogOpenAtom } from '@/components/generated-image-dialog';
import TryExampleButton from '@/components/try-example-button';

export const nameAtom = atom('');
export const promptAtom = atom('');
export const imageAtom = atom('');

const Prompt = () => {
  const { loading: isGenerating, wrappedRequest } = useWrappedRequest();

  const [prompt, setPrompt] = useAtom(promptAtom);
  const [image, setImage] = useAtom(imageAtom);

  const setIsGeneratedImageDialogOpenAtom = useSetAtom(isGeneratedImageDialogOpenAtom);

  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await wrappedRequest(async () => {
      const parsedPrompt = z.string().min(3, 'Prompt must be at least 3 characters long.').safeParse(prompt);
      if (!parsedPrompt.success) return setError(parsedPrompt.error.issues[0].message);

      const response = await fetch(`/api/dall-e`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: parsedPrompt.data }),
      });

      if (!response.ok) {
        if (response.status === 504) throw new Error('The server took too long to respond.');
        const error = await response.text();
        throw new Error(error);
      }

      return response.json();
    });

    if (!result) return;

    setImage(result.image.data[0].url);
    setIsGeneratedImageDialogOpenAtom(true);

    // setImage(
    //   'https://res.cloudinary.com/denswhkem/image/upload/v1699817734/pixel-craft/pgbp4lfypwk2ws9hij5w.png'
    // );
  };

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-col gap-8'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex flex-row items-center justify-between gap-2'>
          <Label className='text-md'>Prompt</Label>
          <TryExampleButton isGenerating={isGenerating} />
        </div>

        <Textarea
          id='prompt'
          disabled={isGenerating}
          placeholder='A cute cat sitting on a plate'
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onFocus={() => setError('')}
          className={cn(
            `h-20 resize-none border-transparent bg-secondary/80 hover:border hover:border-primary/30`,
            { 'border-destructive': error }
          )}
        />

        <p className='text-destructive'>{error}</p>
      </div>

      <Button type='submit' size='xl' disabled={isGenerating} className='flex gap-1'>
        {renderLabel(isGenerating)}
      </Button>
    </form>
  );
};

const renderLabel = (isGenerating: boolean) => {
  const Icon = isGenerating ? LoadingSpinner : Wand;
  const Text = isGenerating ? 'Generating...' : 'Generate';
  return (
    <>
      <Icon />
      {Text}
    </>
  );
};

export default Prompt;
