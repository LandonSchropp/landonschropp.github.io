import { mapValues } from "remeda";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const SPACING = 1.25;

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    spacing: {
      "0.25": `${SPACING / 16}rem`,
      "0.75": `${(SPACING * 3) / 16}rem`,
      ...mapValues(defaultTheme.spacing, (value, key) => {
        return isNaN(Number(key)) ? value : `${(Number(key) * SPACING) / 4}rem`;
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
      inherit: "inherit",
      blackOut: "#1b1c21",
      mineShaft: "#292b33",
      emperor: "#484a54",
      gray: "#81838f",
      greatFalls: "#a1a4b3",
      cerebral: "#bec1cc",
      steam: "#d3d5de",
      bleach: "#ebecf2",
      white: "#fff",
      cornflower: "#627ff6",
      purple: "#836fdd",
      amethyst: "#955fc2",
      mulberry: "#ca6399",
      bittersweet: "#ff6d71",
      theme: {
        background: "var(--background-color)",
        backgroundHighlight: "var(--background-highlight-color)",
        header: "var(--header-color)",
        text: "var(--text-color)",
        lightText: "var(--light-text-color)",
        extraLightText: "var(--extra-light-text-color)",
        accent: "var(--text-accent-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
