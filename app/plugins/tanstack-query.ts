import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: "always",
      },
    },
  });

  nuxtApp.vueApp.use(VueQueryPlugin, {
    queryClient,
    enableDevtoolsV6Plugin: true,
  });

  nuxtApp.provide("queryClient", queryClient);
});
