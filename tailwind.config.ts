import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "accent-1": "rgb(var(--accent-1) / <alpha-value>)",
        "accent-2": "rgb(var(--accent-2) / <alpha-value>)",
        destructive: "rgb(var(--destructive) / <alpha-value>)",
        "gray-fe": "rgb(var(--gray-fe) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        "gray-f5": "rgb(var(--gray-f5) / <alpha-value>)",
        "gray-d9": "rgb(var(--gray-d9) / <alpha-value>)",
        "gray-b4": "rgb(var(--gray-b4) / <alpha-value>)",
        "gray-8f": "rgb(var(--gray-8f) / <alpha-value>)",
        "gray-66": "rgb(var(--gray-66) / <alpha-value>)",
        "gray-1a": "rgb(var(--gray-1a) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
      },
    },
  },
  content: [
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
  plugins: [],
};
