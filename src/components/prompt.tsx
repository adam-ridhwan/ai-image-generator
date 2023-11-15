'use client';

import { FormEvent, useState } from 'react';
import { COLORS, DESIGN_KEYWORDS } from '@/constants';
import { LoadingSpinner, Wand, Warning } from '@/icons';
import { useSetAtom } from 'jotai';
import { toast } from 'sonner';

import { PromptSchema } from '@/types/types';
import { cn, getRandomPrompt } from '@/lib/utils';
import usePost from '@/hooks/usePost';
import { useWrappedRequest } from '@/hooks/useWrappedRequest';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { isGeneratedImageDialogOpenAtom } from '@/components/generated-image-dialog';

const Prompt = () => {
  const { post, setPost } = usePost();
  const [style, setStyle] = useState('');
  const [color, setColor] = useState('');
  const [keywords, setKeywords] = useState<String[]>([]);
  const { loading: isGenerating, wrappedRequest } = useWrappedRequest();

  const [promptError, setPromptError] = useState('');
  const [colorError, setColorError] = useState('');
  const [styleError, setStyleError] = useState('');

  const setIsGeneratedImageDialogOpenAtom = useSetAtom(isGeneratedImageDialogOpenAtom);

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE SELECT KEYWORD
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleSelectKeyword = (keyword: string) => {
    setStyleError('');

    if (keywords.includes(keyword)) setKeywords(keywords.filter(value => value !== keyword));
    else setKeywords(keywords => [...keywords, keyword]);
  };

  /** ────────────────────────────────────────────────────────────────────────────────────────────────────
   * HANDLE SUBMIT
   * ────────────────────────────────────────────────────────────────────────────────────────────────── */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await wrappedRequest(async () => {
      // validate
      if (!post.prompt) setPromptError('Please provide a prompt.');
      if (!color) setColorError('Please pick a color.');
      if (!style && keywords.length === 0)
        return setStyleError('Please provide a design style or select at least one keyword below.');

      const userColor = ` I want the primary to be ${color}.`;
      const userStyle = ` Here is the design style ${style}.`;
      const userKeywords = ` Here are some keywords ${keywords.join(', ')}.`;
      const promptWithKeywords = post.prompt.concat(userColor, userStyle, userKeywords);

      // zod validate
      const parsedPrompt = PromptSchema.safeParse(promptWithKeywords);
      if (!parsedPrompt.success) {
        return toast.error('Something went wrong.');
      }

      // generate
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
      revised_prompt: result.data[0].revised_prompt || '',
    }));

    setIsGeneratedImageDialogOpenAtom(true);
  };

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-col gap-8'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex flex-row items-center justify-between gap-2'>
          <Label className='text-md'>Prompt</Label>
          <Button
            type='button'
            disabled={isGenerating}
            variant='outline'
            size='sm'
            onClick={() => {
              setPromptError('');
              setPost(post => ({ ...post, prompt: getRandomPrompt('') }));
            }}
          >
            Try example
          </Button>
        </div>

        <Textarea
          id='prompt'
          disabled={isGenerating}
          placeholder='A cute cat sitting on a plate'
          value={post.prompt}
          onChange={e => {
            setPromptError('');
            setPost(post => ({ ...post, prompt: e.target.value }));
          }}
          // onFocus={() => }
          className={cn(
            `h-20 resize-none border-transparent bg-secondary/80 hover:border hover:border-primary/30`,
            { 'border-destructive': promptError }
          )}
        />

        {promptError && (
          <span className='mt-1 flex flex-row items-center gap-1'>
            <Warning />
            <p className='text-destructive'>{promptError}</p>
          </span>
        )}
      </div>

      <div className='flex w-full flex-col gap-2'>
        <div className='flex flex-row items-center justify-between gap-2'>
          <Label className='text-md'>Pick a primary color</Label>
        </div>

        <div className={cn('flex flex-wrap gap-2')}>
          {COLORS.map(colorObj => {
            const textColor = Object.keys(colorObj)[0];
            const hex = Object.values(colorObj)[0];
            return (
              <Button
                key={textColor}
                type='button'
                size='icon'
                onClick={() => {
                  setColorError('');
                  setColor(textColor);
                }}
                className={cn(`${hex} hover:${hex} opacity-60`, {
                  'opacity-100 ring-2 ring-offset-2': textColor === color,
                })}
              />
            );
          })}
        </div>

        {colorError && (
          <span className='mt-1 flex flex-row items-center gap-1'>
            <Warning />
            <p className='text-destructive'>{colorError}</p>
          </span>
        )}
      </div>

      <div className='flex w-full flex-col gap-2'>
        <div className='flex flex-row items-center justify-between gap-2'>
          <Label className='text-md'>Describe a design style, pick keywords, or both</Label>
        </div>

        <Textarea
          id='style'
          disabled={isGenerating}
          placeholder='Minimalistic style'
          value={style}
          onChange={e => {
            setStyleError('');
            setStyle(e.target.value);
          }}
          className={cn(
            `h-20 resize-none border-transparent bg-secondary/80 hover:border hover:border-primary/30`,
            { 'border-destructive': styleError }
          )}
        />

        {styleError && (
          <span className='mt-1 flex flex-row items-start gap-1'>
            <Warning />
            <p className='leading-5 text-destructive'>{styleError}</p>
          </span>
        )}

        <div className='mt-2 flex flex-wrap justify-center gap-2'>
          {DESIGN_KEYWORDS.map(({ keyword }) => (
            <Button
              key={keyword}
              type='button'
              variant='outline'
              onClick={() => handleSelectKeyword(keyword)}
              className={cn('rounded-full', {
                'bg-primary text-white hover:bg-primary hover:text-white': keywords.includes(keyword),
              })}
            >
              {keyword}
            </Button>
          ))}
        </div>
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
