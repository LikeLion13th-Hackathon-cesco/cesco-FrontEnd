// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/devtools",
    "@nuxt/image",
    "@nuxt/fonts",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "nuxt-svgo",
    "motion-v/nuxt",
  ],
  imports: {
    autoImport: true,
    scan: true,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL!,
      kakaoJavascriptKey: process.env.KAKAO_JAVASCRIPT_KEY,
    },
  },
});
