export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  // pagination: PaginationParams;
}

export interface ListParams {
  orderBy?: string;

  [key: string]: any;
}

