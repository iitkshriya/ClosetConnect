import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface UseInfiniteScrollOptions<T> {
  selector: (state: RootState) => T[];
  limit: number;
  uniqueKey: string;
}

export function useInfiniteScroll<T>(options: UseInfiniteScrollOptions<T>) {
  const fullList = useSelector(options.selector);
  const [items, setItems] = useState<T[]>([]);
  const [offset, setOffset] = useState(0);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setIsResetting(true);
    setItems([]);
    setOffset(0);
    setCanLoadMore(true);
    setLoading(true);
  }, [fullList, fullList.length]);

  useEffect(() => {
    if (isResetting && offset === 0) {
      setIsResetting(false);
      setCanLoadMore(true);
    }
  }, [isResetting, offset]);

  useEffect(() => {
    if (isResetting || !fullList.length) return;
    const nextChunk = fullList.slice(offset, offset + options.limit);

    setItems((prev) => (offset === 0 ? nextChunk : [...prev, ...nextChunk]));

    if (nextChunk.length < options.limit) {
      setCanLoadMore(false);
    }
    setLoading(false);
  }, [fullList, isResetting, offset, options.limit]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        canLoadMore
      ) {
        setLoading(true);
        setOffset((prev) => prev + options.limit);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, canLoadMore, options.limit]);

  return { items, loading };
}
