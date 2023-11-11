import { Input } from '@/components/ui/input';

const SearchInput = () => {
  return (
    <>
      <Input
        placeholder='Search something...'
        className='fox h-full border-none shadow-none focus-visible:ring-0'
      />
    </>
  );
};

export default SearchInput;
