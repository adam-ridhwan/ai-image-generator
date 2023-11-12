import { useCallback, useState } from 'react';

export function useWrappedRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const wrappedRequest = useCallback(
    async <T extends any = void>(promise: () => Promise<T>): Promise<T | null> => {
      try {
        setLoading(true);
        const result = await promise();
        return result;
      } catch (error) {
        setError(error as string);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setError]
  );

  return { loading, wrappedRequest, error };
}
