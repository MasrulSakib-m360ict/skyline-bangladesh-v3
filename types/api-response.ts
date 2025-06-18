
export type TPagination = {
  page: number;
  limit: number;
  nextPage: number | null;
  previousPage: number | null;
  total: number;
};

export interface IHttpResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  statusCode: number,
  token?: string;
  pagination?: TPagination;
  count?: number;
  search_id?: string;
}


export type IGenericError = {
  path: string | number
  message: string
}
export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericError[]
}
