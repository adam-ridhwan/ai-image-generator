import { Dispatch, SetStateAction } from 'react';
import { atom, useSetAtom } from 'jotai';

import { getRandomPrompt } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { promptAtom } from '@/components/prompt';

type Props = {
  isGenerating: boolean;
};

const TryExampleButton = ({ isGenerating }: Props) => {
  const setPrompt = useSetAtom(promptAtom);
  return (
    <>
      <Button
        type='button'
        disabled={isGenerating}
        variant='outline'
        size='sm'
        onClick={() => setPrompt(getRandomPrompt(''))}
      >
        Try example
      </Button>
    </>
  );
};

export default TryExampleButton;
