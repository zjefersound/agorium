import { Dictionary } from "lodash";
import { useCallback, useRef } from "react";

export function useCache<T>() {
  const CACHE_LIMIT = 10;
  const dataCacheRef = useRef<Dictionary<T>>({});
  const cacheOrderRef = useRef<string[]>([]);

  const add = useCallback((key: string, value: T) => {
    if (!dataCacheRef.current[key]) {
      // If key is new, update insertion order
      cacheOrderRef.current.push(key);
    }

    dataCacheRef.current[key] = value;

    if (cacheOrderRef.current.length > CACHE_LIMIT) {
      const oldestKey = cacheOrderRef.current.shift(); // Remove oldest entry
      if (oldestKey) delete dataCacheRef.current[oldestKey];
    }
  }, []);

  const get = useCallback((key: string): T | undefined => {
    return dataCacheRef.current[key];
  }, []);

  return { data: dataCacheRef.current, add, get };
}
