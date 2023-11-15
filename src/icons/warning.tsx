import { SVGProps } from '@/types/types';
import { cn } from '@/lib/utils';

const Warning = ({ className }: SVGProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      className={cn('h-5 w-5 fill-destructive', className)}
    >
      <path d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z'></path>
    </svg>
  );
};

export default Warning;
