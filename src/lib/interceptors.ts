import { apiClient } from './apiClient';
import { AxiosError } from 'axios';
import { ApiError } from './apiError';

export const setupInterceptors = () => {
  apiClient.interceptors.response.use(
    response => response,
    (error: AxiosError<any>) => {
      const apiError: ApiError = {
        status: error.response?.status,
        message:
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          error.message ||
          'Something went wrong',
        code: error.response?.data?.error?.code,
      };

      return Promise.reject(apiError);
    }
  );
};
