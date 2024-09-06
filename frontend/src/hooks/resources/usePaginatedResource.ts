import { useCallback, useRef, useState } from "react";
import { ISearchableOptions } from "../../models/ISearchableOptions";
import {
  IPaginatedResponse,
  PaginationResponse,
} from "../../models/IPaginatedResponse";
import { IPaginatedResource } from "../../models/IPaginatedResource";
import { AxiosResponse } from "axios";
import { Dictionary } from "lodash";

interface PaginatedCache<T> {
  data: T[];
  updatedAt: Date;
  pagination: PaginationResponse;
}

function useCache<T>() {
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

export function usePaginatedResource<T>({
  alias,
  fetch,
  expiresIn = Infinity,
}: {
  alias: string;
  fetch: (
    options?: ISearchableOptions,
  ) => Promise<AxiosResponse<IPaginatedResponse<T>>>;
  expiresIn?: number;
}): IPaginatedResource<T> {
  const cache = useCache<PaginatedCache<T>>();
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse>({
    currentPage: 0,
    total: 0,
    perPage: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);

  const revalidate = useCallback(async () => {
    setValid(false);
  }, []);
  const fetchData = useCallback(
    async (options?: ISearchableOptions) => {
      const cacheKey = JSON.stringify(options);
      const cachedValue = cache.data[cacheKey];
      if (cachedValue) {
        setData(cachedValue.data);
        setPagination(cachedValue.pagination);
      }

      const isNotExpired =
        Math.abs(Number(new Date()) - Number(cachedValue?.updatedAt)) <
        expiresIn;

      // if it's valid and not expired skip fetch
      if (valid && isNotExpired) return;

      setLoading(true);
      return fetch(options)
        .then((res) => {
          setData(res.data.data);
          setPagination(res.data.pagination);
          cache.add(cacheKey, {
            data: res.data.data,
            pagination: res.data.pagination,
            updatedAt: new Date(),
          });
          setValid(true);
        })
        .catch((error) => console.error("Failed to fetch " + alias, error))
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [valid],
  );

  return { data, pagination, fetchData, loading, revalidate };
}
