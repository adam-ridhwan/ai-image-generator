import { useCallback, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { toast } from 'sonner';

const globalLoadingAtom = atom(false);

export function useWrappedRequest() {
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useAtom(globalLoadingAtom);

  const wrappedRequest = useCallback(
    async <T extends any = void>(promise: () => Promise<T>): Promise<T | null> => {
      try {
        setLoading(true);
        const result = await promise();
        return result;
      } catch (error) {
        toast.error(`${error}`);
        // console.error(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, wrappedRequest, globalLoading, setGlobalLoading };
}
