import axios, { AxiosInstance, AxiosResponse } from "axios";

export type Fetcher = AxiosInstance;
export type FetcherResponse<T> = AxiosResponse<T>;

export class FetcherFactory {
  static create(): Fetcher {
    return axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });
  }
}
