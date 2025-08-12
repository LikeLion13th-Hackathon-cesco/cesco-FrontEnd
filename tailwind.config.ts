import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "accent-1": "var(--accent-1)",
        "accent-2": "var(--accent-2)",
        destructive: "var(--destructive)",
        "gray-fe": "var(--gray-fe)",
        background: "var(--background)",
        "gray-f5": "var(--gray-f5)",
        "gray-d9": "var(--gray-d9)",
        "gray-b4": "var(--gray-b4)",
        "gray-8f": "var(--gray-8f)",
        "gray-66": "var(--gray-66)",
        "gray-1a": "var(--gray-1a)",
        foreground: "var(--foreground)",
      },
    },
  },
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
