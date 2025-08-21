import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://setbangsari.shop:8080/api/",
  timeout: 30 * 1000,
});

export interface BaseResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}
