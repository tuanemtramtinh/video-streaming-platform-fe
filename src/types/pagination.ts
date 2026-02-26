export interface IPagination {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  lastPage: number;
  page: number;
  limit: number;
}
