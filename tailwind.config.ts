import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        "secondary-btn": "var(--secondary-btn)",
        "secondary-btn-text": "var(--secondary-btn-text)",
        "primary-btn": "var(--primary-btn)",
        "primary-btn-text": "var(--primary-btn-text)",
      },
      borderColor: {
        DEFAULT: "var(--border-color)", // Use a separate var for border color
      },
      borderWidth: {
        DEFAULT: "0px 1px", // Define default border width
      },
    },
  },
  plugins: [],
} satisfies Config;
