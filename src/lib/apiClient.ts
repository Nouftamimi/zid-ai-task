// src/lib/api/apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    // Make sure headers exist
    config.headers = config.headers ?? {};

    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`;
    }

    return config;
  },
  error => Promise.reject(error),
);


