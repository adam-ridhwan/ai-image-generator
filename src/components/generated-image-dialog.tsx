'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoadingSpinner from '@/icons/loading-spinner';
import Rocket from '@/icons/rocket';
import { atom, useAtom, useAtomValue } from 'jotai';
import { toast } from 'sonner';

import { PostSchema, PromptSchema } from '@/types/types';
import { cn } from '@/lib/utils';
import { useWrappedRequest } from '@/hooks/useWrappedRequest';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { imageAtom, nameAtom, promptAtom } from '@/components/prompt';
import PublishButton from '@/components/publish-button';

export const isGeneratedImageDialogOpenAtom = atom(false);

const GeneratedImageDialog = () => {
  const { loading: isPublishing, wrappedRequest, globalLoading, setGlobalLoading } = useWrappedRequest();
  const [name, setName] = useAtom(nameAtom);
  const prompt = useAtomValue(promptAtom);
  const image = useAtomValue(imageAtom);
  const [isGeneratedImageDialogOpen, setIsGeneratedImageDialogOpenAtom] = useAtom(
    isGeneratedImageDialogOpenAtom
  );

  const [error, setError] = useState('');

  const handleCloseDialog = () => {
    setIsGeneratedImageDialogOpenAtom(false);
    setError('');
    setName('');
  };

  const handlePublish = async () => {
    await wrappedRequest(async () => {
      const parsedPost = PostSchema.safeParse({ name, prompt, image });
      if (!parsedPost.success) return setError(parsedPost.error.issues[0].message);

      const response = await fetch(`/api/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedPost.data),
      });

      if (response.status !== 200) throw new Error('Something went wrong.');

      toast.success('Published to community');
      return response.json();
    });
  };

  return (
    <>
      <Dialog open={isGeneratedImageDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent onOpenAutoFocus={e => e.preventDefault()} className='pt-16'>
          <DialogHeader>
            <DialogTitle>{prompt}</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col gap-8'>
            <AspectRatio ratio={1}>
              <Image
                priority
                src={image || '/preview.png'}
                alt='logo'
                fill
                sizes='(max-width: 640px) 558px, 434px'
                className={cn('rounded-sm object-contain')}
              />
            </AspectRatio>

            <div className='flex w-full flex-col gap-2'>
              <Label>Your Name</Label>
              <Input
                type='text'
                id='name'
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setError('')}
                className='border-transparent bg-secondary/80 hover:border hover:border-primary/30'
              />

              <p className='text-destructive'>{error}</p>
            </div>

            <Button
              type='button'
              size='xl'
              onClick={handlePublish}
              disabled={globalLoading || isPublishing}
              className='flex w-full flex-row items-center gap-1'
            >
              {renderLabel(isPublishing)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const renderLabel = (isPublishing: boolean) => {
  const Icon = isPublishing ? LoadingSpinner : Rocket;
  const Text = isPublishing ? 'Publishing...' : 'Publish to community';
  return (
    <>
      <Icon className='stroke-secondary' />
      {Text}
    </>
  );
};

export default GeneratedImageDialog;
