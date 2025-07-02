import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        if (isMounted) {
          setData(json as T);
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Unknown error");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return { data, error, loading };
}
