import { axiosInstance } from './axiosInstance';
import { AxiosError } from 'axios';
import { ApiError } from './apiError';

export const setupInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
      const apiError: ApiError = {
        status: error.response?.status,
        message:
          error.response?.data?.message ||
          error.message ||
          'Something went wrong',
        code: error.response?.data?.code,
      };

      return Promise.reject(apiError);
    }
  );
};
