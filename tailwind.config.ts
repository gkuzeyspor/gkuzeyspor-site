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
          dark:  "#0a1628",
          mid:   "#1a2a4a",
          light: "#0d3b7a",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light:   "#e8c96a",
          dim:     "#8a6e30",
        },
      },
      fontFamily: {
        cinzel:  ["var(--font-cinzel)", "serif"],
        raleway: ["var(--font-raleway)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
