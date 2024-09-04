export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}
