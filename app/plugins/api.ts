export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    timeout: 30 & 10000,
  });
  return { provide: { api } };
});
