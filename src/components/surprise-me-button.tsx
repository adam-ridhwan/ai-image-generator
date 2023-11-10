'use client';

import { Button } from '@/components/ui/button';

const SurpriseMeButton = () => {
  return (
    <Button
      className='inline-flex h-max items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs
      font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
    >
      Surprise Me
    </Button>
  );
};

export default SurpriseMeButton;
