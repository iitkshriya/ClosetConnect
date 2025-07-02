import { useEffect, useMemo } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";

type CachedDataProps<T> = {
  baseUrl: string;
  method: string;
  action: string;
  selector: (state: RootState) => T;
};

type CachedFetchState<T> = {
  data: T;
  error: string | null;
  loading: boolean;
};

export function useCachedFetch<T>(
  options: CachedDataProps<T>
): CachedFetchState<T> {
  const totalList = useSelector(options.selector);
  const optionsObject = useMemo(
    () => ({
      method: options.method,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    [options.method]
  );
  const { data, loading, error } = useFetch<T>(options.baseUrl, optionsObject);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && !loading && !totalList) {
      dispatch({ type: options.action, payload: data });
    }
  }, [data, dispatch, loading, options.action, totalList]);

  return { data: totalList, loading, error };
}
