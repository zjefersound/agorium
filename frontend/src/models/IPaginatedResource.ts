import { PaginationResponse } from "./IPaginatedResponse";
import { ISearchableOptions } from "./ISearchableOptions";

export interface IPaginatedResource<
  T,
  O extends ISearchableOptions = ISearchableOptions,
> {
  data: T[];
  fetchData: (options?: O) => Promise<unknown>;
  pagination: PaginationResponse;
  loading: boolean;
  revalidate: () => void;
}
