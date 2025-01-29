export interface PageResult<T> {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  content: T[];
}
