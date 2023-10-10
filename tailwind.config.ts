import type { Config } from 'tailwindcss'

export default {
  prefix: "tw-",
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      gridTemplateRows: {
        blank: "min-content auto min-content",
      },
    },
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      font: "rgba(255, 255, 255, 0.5)",
      border: "rgba(255, 255, 255, 0.1)",
      primary: "var(--tblr-primary)",
      danger: "var(--tblr-danger)",
    },
  },
  plugins: [],
} satisfies Config
