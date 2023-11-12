import { SVGProps } from '@/types/types';
import { cn } from '@/lib/utils';

const LoadingSpinner = ({ className }: SVGProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('h-5 w-5 animate-spin fill-none stroke-secondary stroke-2', className)}
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  );
};

export default LoadingSpinner;
