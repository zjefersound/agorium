export type PaginationResponse = {
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: PaginationResponse;
}
