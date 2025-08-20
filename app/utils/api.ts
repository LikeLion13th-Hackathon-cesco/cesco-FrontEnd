import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NUXT_PUBLIC_API_BASE_URL,
  timeout: 30 * 1000,
});

export interface BaseResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}
