export interface IRequestError {
  type: string,
  title: string,
  status: number,
  detail: string,
  instance: string,
  errors?: Record<string, string[]>,
}

export type AdapterResponse<T> = {
  data?: T,
  hasError?: boolean,
  errorMessage?: string
};

export type Adapter<P, R> = (params: P) => Promise<AdapterResponse<R> & Partial<IRequestError>>;
