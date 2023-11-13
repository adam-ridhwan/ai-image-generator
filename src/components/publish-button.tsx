'use client';

import LoadingSpinner from '@/icons/loading-spinner';
import Rocket from '@/icons/rocket';
import { useAtomValue } from 'jotai';
import { toast } from 'sonner';

import '@/types/types';

import { PostSchemaModel } from '@/types/client-types';
import { useWrappedRequest } from '@/hooks/useWrappedRequest';
import { Button } from '@/components/ui/button';
import { imageAtom, nameAtom, promptAtom } from '@/components/prompt';

const PublishButton = () => {
  const { loading: isPublishing, wrappedRequest, globalLoading, setGlobalLoading } = useWrappedRequest();
  const name = useAtomValue(nameAtom);
  const prompt = useAtomValue(promptAtom);
  const image = useAtomValue(imageAtom);

  const handlePublish = async () => {
    await wrappedRequest(async () => {
      const parsedPost = PostSchemaModel.safeParse({ name, prompt, image });
      if (!parsedPost.success) throw new Error(`${parsedPost.error.issues[0].message}`);

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
    <Button
      type='button'
      size='xl'
      onClick={handlePublish}
      disabled={globalLoading || isPublishing}
      className='flex w-full flex-row items-center gap-1'
    >
      {renderLabel(isPublishing)}
    </Button>
  );
};

const renderLabel = (isPublishing: boolean) => {
  const Icon = isPublishing ? LoadingSpinner : Rocket;
  const Text = isPublishing ? 'Publishing...' : 'Publish';
  return (
    <>
      <Icon className='stroke-secondary' />
      {Text}
    </>
  );
};

export default PublishButton;
