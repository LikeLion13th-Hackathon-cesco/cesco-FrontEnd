import type { UseFetchOptions } from "nuxt/app";

export default function useAPI<T>(url: string, options?: UseFetchOptions<T>) {
  return useFetch(url, { ...options, $fetch: useNuxtApp().$api });
}
