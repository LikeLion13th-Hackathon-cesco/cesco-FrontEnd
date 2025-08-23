import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "https://api.setbangsari.com/api/",
  timeout: 30 * 1000,
});

export interface BaseResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}
