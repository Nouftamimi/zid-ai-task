import { axiosInstance } from './axiosInstance';
import { AxiosRequestConfig } from 'axios';

export class HttpClient {
  static get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.get<T>(url, config).then(res => res.data);
  }

  static post<T, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return axiosInstance.post<T>(url, body, config).then(res => res.data);
  }

  static put<T, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return axiosInstance.put<T>(url, body, config).then(res => res.data);
  }

  static delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return axiosInstance.delete<T>(url, config).then(res => res.data);
  }
}
