import axios from 'axios';
import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url().optional()
});

const parsedEnv = envSchema.safeParse(import.meta.env);

const baseURL = parsedEnv.success && parsedEnv.data.VITE_API_BASE_URL ? parsedEnv.data.VITE_API_BASE_URL : '/api';

export const httpClient = axios.create({
  baseURL,
  timeout: 8000
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API error', error.response.status, error.response.data);
    } else {
      console.error('Network error', error.message);
    }
    return Promise.reject(error);
  }
);
