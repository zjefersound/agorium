import { Dictionary } from "lodash";
import { useCallback, useRef } from "react";

export function useCache<T>() {
  const CACHE_LIMIT = 10;
  const dataCacheRef = useRef<Dictionary<T>>({});

  const add = useCallback((key: string, value: T) => {
    dataCacheRef.current[key] = value;
    if (Object.values(dataCacheRef.current).length > CACHE_LIMIT) {
      dataCacheRef.current = Object.entries(dataCacheRef.current)
        .filter((_, index) => index != 1)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    }
  }, []);
  return { data: dataCacheRef.current, add };
}
