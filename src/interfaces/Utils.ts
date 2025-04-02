export interface CancelTokenInterface {
  id: number;
  token: string;
  remove: (id: number) => {};
}

export interface ApiResponseType<T> {
  id: number;
  data?: T;
  status?: number;
}

export interface PaginateType<T> {
  items: T[];
  totalItems: number;
}