import { Dispatch, SetStateAction } from 'react';

import { getRandomPrompt } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
  setPrompt: Dispatch<SetStateAction<string>>;
};

const SurpriseMeButton = ({ setPrompt }: Props) => {
  const handleSetRandomPrompt = () => {
    setPrompt(getRandomPrompt(''));
  };

  return (
    <Button
      type='button'
      onClick={handleSetRandomPrompt}
      className='inline-flex h-max items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs
      font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80'
    >
      Surprise Me
    </Button>
  );
};

export default SurpriseMeButton;
