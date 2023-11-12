'use client';

import Image from 'next/image';
import LoadingSpinner from '@/icons/loading-spinner';
import { atom, useAtom, useAtomValue } from 'jotai';

import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { imageAtom, nameAtom, promptAtom } from '@/components/prompt';
import PublishButton from '@/components/publish-button';

export const isGeneratedImageDialogOpenAtom = atom(false);

const GeneratedImageDialog = () => {
  const [name, setName] = useAtom(nameAtom);
  const prompt = useAtomValue(promptAtom);
  const image = useAtomValue(imageAtom);
  const [isGeneratedImageDialogOpen, setIsGeneratedImageDialogOpenAtom] = useAtom(
    isGeneratedImageDialogOpenAtom
  );

  return (
    <>
      <Dialog open={isGeneratedImageDialogOpen} onOpenChange={setIsGeneratedImageDialogOpenAtom}>
        <DialogContent onOpenAutoFocus={e => e.preventDefault()} className='pt-12'>
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
                className='border-transparent bg-secondary/80 hover:border hover:border-primary/30'
              />
            </div>

            <PublishButton />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GeneratedImageDialog;
