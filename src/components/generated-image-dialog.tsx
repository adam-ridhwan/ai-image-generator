'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LoadingSpinner, Rocket } from '@/icons';
import { atom, useAtom } from 'jotai';
import { toast } from 'sonner';

import { PostSchemaModel } from '@/types/client-types';
import { cn } from '@/lib/utils';
import usePost from '@/hooks/usePost';
import { useWrappedRequest } from '@/hooks/useWrappedRequest';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const isGeneratedImageDialogOpenAtom = atom(false);

const GeneratedImageDialog = () => {
  const { post, setPost } = usePost();
  const [isPublished, setIsPublished] = useState(false);
  const { loading: isPublishing, wrappedRequest } = useWrappedRequest();
  const [error, setError] = useState('');

  const [isGeneratedImageDialogOpen, setIsGeneratedImageDialogOpenAtom] = useAtom(
    isGeneratedImageDialogOpenAtom
  );

  const handleCloseDialog = () => {
    setIsGeneratedImageDialogOpenAtom(false);
    setError('');
    setPost(post => ({ ...post, name: '' }));
    setIsPublished(false);
  };

  const handlePublish = async () => {
    const result = await wrappedRequest(async () => {
      const parsedPost = PostSchemaModel.safeParse(post);
      if (!parsedPost.success) return setError(parsedPost.error.issues[0].message);

      const response = await fetch(`/api/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedPost.data),
      });

      if (!response.ok) throw new Error(await response.text());

      toast.success('Published to community');
      return response.json();
    });

    if (result) setIsPublished(true);
  };

  return (
    <Dialog open={isGeneratedImageDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent onOpenAutoFocus={e => e.preventDefault()} className='pt-16'>
        <DialogHeader>
          <DialogTitle>{post.prompt}</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-8'>
          <AspectRatio ratio={1}>
            <Image
              priority
              src={post.image || '/preview.png'}
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
              value={post.name}
              onChange={e => setPost(post => ({ ...post, name: e.target.value }))}
              onFocus={() => setError('')}
              disabled={isPublished || isPublishing}
              className='border-transparent bg-secondary/80 hover:border hover:border-primary/30'
            />

            <p className='text-destructive'>{error}</p>
          </div>

          <Button
            type='button'
            size='xl'
            onClick={handlePublish}
            disabled={isPublished || isPublishing}
            className='flex w-full flex-row items-center gap-1'
          >
            {isPublished ? 'Published' : renderLabel(isPublishing)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
