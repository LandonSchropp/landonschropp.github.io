import { mapValues } from "remeda";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const SPACING = 1.25;

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    spacing: {
      "0.25": `${SPACING / 16}rem`,
      "0.75": `${(SPACING * 3) / 16}rem`,
      ...mapValues(defaultTheme.spacing, (value, key) => {
        return isNaN(Number(key)) ? value : `${Number(key) * SPACING}rem`;
      }),
    },
    screens: {
      md: "420px",
      lg: "960px",
      xl: "1280px",
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      serif: ["Gentium Book Basic", "serif"],
      mono: ["Source Code Pro", "serif"],
    },
    colors: {
      white: "#fff",
      black: "#1b1c21",
      gray: {
        "50": "#f6f7f9",
        "100": "#ededf1",
        "200": "#d7d9e0",
        "300": "#b4b9c5",
        "400": "#8b93a5",
        "500": "#6d758a",
        "600": "#575e72",
        "700": "#474c5d",
        "800": "#3d424f",
        "900": "#363944",
        "950": "#292b33",
      },
      cornflower: "#627ff6",
      medium: "#836fdd",
      amethyst: "#955fc2",
      mulberry: "#ca6399",
      bittersweet: "#ff6d71",
    },
  },
  plugins: [],
} satisfies Config;
