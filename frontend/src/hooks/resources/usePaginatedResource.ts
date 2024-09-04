import { useCallback, useRef, useState } from "react";
import { ISearchableOptions } from "../../models/ISearchableOptions";
import {
  IPaginatedResponse,
  PaginationResponse,
} from "../../models/IPaginatedResponse";
import { IPaginatedResource } from "../../models/IPaginatedResource";
import { AxiosResponse } from "axios";

const CACHE_LIMIT = 10;
interface DataCache<T> {
  [key: string]: {
    data: T[];
    updatedAt: Date;
    pagination: PaginationResponse;
  };
}
export function usePaginatedResource<T>({
  fetch,
  expiresIn = Infinity,
}: {
  fetch: (
    options?: ISearchableOptions,
  ) => Promise<AxiosResponse<IPaginatedResponse<T>>>;
  expiresIn?: number;
}): IPaginatedResource<T> {
  const dataCacheRef = useRef<DataCache<T>>({});
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse>({
    currentPage: 0,
    total: 0,
    perPage: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (options?: ISearchableOptions) => {
    const cacheKey = JSON.stringify(options);
    if (
      dataCacheRef.current[cacheKey] &&
      Math.abs(
        Number(new Date()) - Number(dataCacheRef.current[cacheKey].updatedAt),
      ) <= expiresIn
    ) {
      setData(dataCacheRef.current[cacheKey].data);
      setPagination(dataCacheRef.current[cacheKey].pagination);
      return;
    }

    setLoading(true);
    return fetch(options)
      .then((res) => {
        setData(res.data.data);
        setPagination(res.data.pagination);
        dataCacheRef.current[cacheKey] = {
          data: res.data.data,
          pagination: res.data.pagination,
          updatedAt: new Date(),
        };
        if (Object.values(dataCacheRef.current).length > CACHE_LIMIT) {
          dataCacheRef.current = Object.entries(dataCacheRef.current)
            .filter((_, index) => index != 1)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
        }
      })
      .catch((error) => console.error("Failed to fetch", error))
      .finally(() => setLoading(false));
  }, []);

  return { data, pagination, fetchData, loading };
}
