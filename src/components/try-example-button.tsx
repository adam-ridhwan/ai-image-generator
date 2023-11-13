import { getRandomPrompt } from '@/lib/utils';
import usePost from '@/hooks/usePost';
import { Button } from '@/components/ui/button';

type Props = {
  isGenerating: boolean;
};

const TryExampleButton = ({ isGenerating }: Props) => {
  const { setPost } = usePost();

  return (
    <Button
      type='button'
      disabled={isGenerating}
      variant='outline'
      size='sm'
      onClick={() => setPost(post => ({ ...post, prompt: getRandomPrompt('') }))}
    >
      Try example
    </Button>
  );
};

export default TryExampleButton;
