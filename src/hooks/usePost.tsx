import { atom, useAtom } from 'jotai/index';

import { Post } from '@/types/types';

export const postAtom = atom<Post>({
  name: '',
  prompt: '',
  revised_prompt: '',
  image: '',
});

const usePost = () => {
  const [post, setPost] = useAtom(postAtom);

  return { post, setPost };
};

export default usePost;
