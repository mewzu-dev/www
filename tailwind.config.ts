import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "var(--brand-blue)",
          orange: "var(--brand-orange)",
          green: "var(--brand-green)",
          cream: "var(--brand-cream)",
          natural: "var(--brand-natural)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
