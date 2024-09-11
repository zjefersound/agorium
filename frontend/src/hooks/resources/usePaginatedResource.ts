import { useCallback, useRef, useState } from "react";
import { ISearchableOptions } from "../../models/ISearchableOptions";
import {
  IPaginatedResponse,
  PaginationResponse,
} from "../../models/IPaginatedResponse";
import { IPaginatedResource } from "../../models/IPaginatedResource";
import { AxiosResponse } from "axios";
import { useCache } from "../useCache";
import { isDateExpired } from "../../utils/isDateExpired";

interface PaginatedCache<T> {
  data: T[];
  updatedAt: Date;
  pagination: PaginationResponse;
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
  const pagination = useRef<PaginationResponse>({
    currentPage: 1,
    total: 0,
    perPage: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);

  const revalidate = useCallback(async () => {
    setValid(false);
  }, []);
  const fetchData = useCallback(
    async (options?: ISearchableOptions) => {
      const cacheKey = !options
        ? "default"
        : JSON.stringify({
            term: options.term,
            sortBy: options.sortBy,
            sortOrder: options.sortOrder,
            limit: options.limit,
            page: options.page,
          });
      const cachedValue = cache.get(cacheKey);
      if (cachedValue) {
        setData(cachedValue.data);
        pagination.current = cachedValue.pagination;
      }

      const isNotExpired =
        cachedValue && !isDateExpired(cachedValue.updatedAt, expiresIn);

      // if it's valid and not expired skip fetch
      if (valid && isNotExpired) return;

      setLoading(true);
      return fetch(options)
        .then((res) => {
          const isLoadingNextPage =
            res.data.pagination.currentPage ===
            pagination.current.currentPage + 1;

          if (isLoadingNextPage) {
            setData((prev) => {
              cache.add(cacheKey, {
                data: [...prev, ...res.data.data],
                pagination: res.data.pagination,
                updatedAt: new Date(),
              });
              return [...prev, ...res.data.data];
            });
          } else {
            setData(res.data.data);
            cache.add(cacheKey, {
              data: res.data.data,
              pagination: res.data.pagination,
              updatedAt: new Date(),
            });
          }
          pagination.current = res.data.pagination;
          setValid(true);
        })
        .catch((error) => console.error("Failed to fetch " + alias, error))
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [valid],
  );

  return {
    data,
    pagination: pagination.current,
    fetchData,
    loading,
    revalidate,
  };
}
