import { mapValues } from 'remeda'
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme'

const SPACING = 1.25

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      spacing: mapValues(defaultTheme.spacing, (value, key) => {
        return isNaN(Number(key)) ? value : `${Number(key) * SPACING}rem`
      })
    },
  },
  plugins: [],
} satisfies Config;
