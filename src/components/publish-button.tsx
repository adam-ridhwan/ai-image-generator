'use client';

import LoadingSpinner from '@/icons/loading-spinner';
import Rocket from '@/icons/rocket';
import { toast } from 'sonner';

import '@/types/types';

import { PostSchemaModel } from '@/types/client-types';
import usePost from '@/hooks/usePost';
import { useWrappedRequest } from '@/hooks/useWrappedRequest';
import { Button } from '@/components/ui/button';

const PublishButton = () => {
  const { post } = usePost();
  const { loading: isPublishing, wrappedRequest } = useWrappedRequest();

  const handlePublish = async () => {
    const result = await wrappedRequest(async () => {
      const parsedPost = PostSchemaModel.safeParse(post);
      if (!parsedPost.success) throw new Error(`${parsedPost.error.issues[0].message}`);

      const response = await fetch(`/api/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedPost.data),
      });

      if (!response.ok) throw new Error(await response.text());

      toast.success('Published to community');
      console.log(response);
      return response.json();
    });

    console.log(result);
  };

  return (
    <Button
      type='button'
      size='xl'
      onClick={handlePublish}
      disabled={isPublishing}
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
