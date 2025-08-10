import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: { extend: {} },
  content: {
    files: [
      "app/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "components/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "layouts/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "plugins/**/*.{js,ts,mjs}",
      "composables/**/*.{js,ts,mjs}",
      "utils/**/*.{js,ts,mjs}",
      "app.config.{js,ts,mjs}",
      "app/spa-loading-template.html",
    ],
  },
  plugins: [],
};
