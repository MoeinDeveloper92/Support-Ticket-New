import { useState, useEffect } from 'react';

//we need to defien an abstraction for the funciton input
interface OptionsProps<TBody> {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  headers?: HeadersInit;
  body?: TBody;
}

interface FetchResult<T> {
  data: T | T[] | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T, TBody = any>(
  url: string,
  options?: OptionsProps<TBody>
): FetchResult<T> => {
  const [data, setData] = useState<T | T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resposne = await fetch(url, {
          method: options?.method,
          body: options?.body ? JSON.stringify(options.body) : null,
          headers: { ...options?.headers },
        });
        if (resposne.ok) {
          const reselt: T | T[] = await resposne.json();

          setData(reselt);
          setLoading(false);
        }
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options?.body)]);

  return {
    data,
    loading,
    error,
  };
};
