'use client';

import { FormEvent, useState } from 'react';
import LoadingSpinner from '@/icons/loading-spinner';
import Wand from '@/icons/wand';
import { atom, useAtom, useSetAtom } from 'jotai';

import { Post, PromptSchema } from '@/types/types';
import { cn } from '@/lib/utils';
import usePost from '@/hooks/usePost';
import { useWrappedRequest } from '@/hooks/useWrappedRequest';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { isGeneratedImageDialogOpenAtom } from '@/components/generated-image-dialog';
import TryExampleButton from '@/components/try-example-button';

const Prompt = () => {
  const { post, setPost } = usePost();
  const { loading: isGenerating, wrappedRequest } = useWrappedRequest();
  const [error, setError] = useState('');

  const setIsGeneratedImageDialogOpenAtom = useSetAtom(isGeneratedImageDialogOpenAtom);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await wrappedRequest(async () => {
      const parsedPrompt = PromptSchema.safeParse(post.prompt);
      if (!parsedPrompt.success) return setError(parsedPrompt.error.issues[0].message);

      const response = await fetch(`/api/dall-e`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: parsedPrompt.data }),
      });

      if (!response.ok) throw new Error(await response.text());

      return response.json();
    });

    if (!result) return;

    setPost(post => ({
      ...post,
      image: result.data[0].url,
      revised_prompt: result.data[0].revised_prompt,
    }));

    setIsGeneratedImageDialogOpenAtom(true);
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
          value={post.prompt}
          onChange={e => setPost(post => ({ ...post, prompt: e.target.value }))}
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
