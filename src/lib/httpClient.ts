import { apiClient } from './apiClient';
import { AxiosRequestConfig } from 'axios';

export class HttpClient {
  static get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return apiClient.get<T>(url, config).then(res => res.data);
  }

  static post<T, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return apiClient.post<T>(url, body, config).then(res => res.data);
  }

  static put<T, B = unknown>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return apiClient.put<T>(url, body, config).then(res => res.data);
  }

  static delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return apiClient.delete<T>(url, config).then(res => res.data);
  }
}
