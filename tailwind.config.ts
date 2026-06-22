import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deep:  "#050d1a",
          dark:  "#003381",
          mid:   "#1a2a4a",
          light: "#0d3b7a",
        },
        sky: {
          DEFAULT: "#00eaff",
          light:   "#98cef0",
          dim:     "#2e6da3",
        },
      },
      fontFamily: {
        cinzel:   ["var(--font-cinzel)", "serif"],
        raleway:  ["var(--font-raleway)", "sans-serif"],
        worksans: ["var(--font-worksans)", "sans-serif"],
        shadows:  ["var(--font-shadows)", "cursive"],
        inter:    ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
