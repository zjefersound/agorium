import { PaginationResponse } from "./IPaginatedResponse";
import { ISearchableOptions } from "./ISearchableOptions";

export interface IPaginatedResource<T> {
  data: T[];
  fetchData: (options?: ISearchableOptions) => Promise<unknown>;
  pagination: PaginationResponse;
  loading: boolean;
}
