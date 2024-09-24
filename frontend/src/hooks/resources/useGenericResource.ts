import { useCallback, useRef, useState } from "react";
import { AxiosResponse } from "axios";
import { useCache } from "../useCache";
import { isDateExpired } from "../../utils/isDateExpired";
import { IGenericResource } from "../../models/IGenericResource";

interface GenericCache<T> {
  data: T;
  updatedAt: Date;
}

export function useGenericResource<T, O = undefined>({
  alias,
  fetch,
  expiresIn = Infinity,
}: {
  alias: string;
  fetch: O extends undefined
    ? () => Promise<AxiosResponse<T>>
    : (options: O) => Promise<AxiosResponse<T>>;
  expiresIn?: number;
}): IGenericResource<T, O> {
  const cache = useCache<GenericCache<T>>();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const validRef = useRef(true);

  const revalidate = useCallback(async () => {
    validRef.current = false;
  }, []);

  const fetchData = useCallback(
    async (options: O) => {
      const cacheKey = !options ? "default" : JSON.stringify(options);
      const cachedValue = cache.get(cacheKey);
      if (cachedValue) {
        setData(cachedValue.data);
      }

      const isNotExpired =
        cachedValue && !isDateExpired(cachedValue.updatedAt, expiresIn);

      if (validRef.current && isNotExpired) return cachedValue.data;

      setLoading(true);
      return fetch(options)
        .then((res) => {
          setData(res.data);
          cache.add(cacheKey, {
            data: res.data,
            updatedAt: new Date(),
          });
          validRef.current = true; // Update ref value to true
          return res.data;
        })
        .catch((error) => console.error("Failed to fetch " + alias, error))
        .finally(() => setLoading(false));
    },
    [fetch, expiresIn, cache, alias],
  );

  return {
    data,
    fetchData: fetchData as O extends undefined
      ? () => Promise<T>
      : (options: O) => Promise<T>,
    loading,
    revalidate,
  };
}
