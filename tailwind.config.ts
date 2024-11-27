import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        antonio: ["var(--font-antonio)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          500: "#838391",
          800: "#38384F",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
