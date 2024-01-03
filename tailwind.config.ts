import { mapValues } from "remeda";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import camelCase from "camelcase";

// @ts-expect-error The tailwind-theme-swapper library is not written in TypeScript. It's not worth
// it to define types since it's only used in this config file.
import themeSwapper from "tailwindcss-theme-swapper";
import {
  BUSINESS_CATEGORY,
  DEVELOPMENT_CATEGORY,
  DESIGN_CATEGORY,
  PSYCHOLOGY_CATEGORY,
  CHESS_CATEGORY,
  OTHER_CATEGORY,
} from "./src/constants";
import plugin from "tailwindcss/plugin";

const SPACING = 1.25;

export const PORTRAIT_MEDIA_QUERY = "(max-aspect-ratio: 1/1)";

const TAILWIND_CONFIG = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.625rem",
      },
      boxShadow: {
        outline: `0 0 0 ${(SPACING * 3) / 16}rem`,
        largeOutline: `0 0 0 ${SPACING * 0.5}rem`,
      },
    },
    spacing: {
      "0.25": `${SPACING / 16}rem`,
      "0.75": `${(SPACING * 3) / 16}rem`,
      "3.6": `${SPACING * 0.9}rem`,
      ...mapValues(defaultTheme.spacing, (value, key) => {
        return isNaN(Number(key)) ? value : `${(Number(key) * SPACING) / 4}rem`;
      }),
    },
    screens: {
      md: "420px",
      lg: "960px",
      xl: "1280px",
      portrait: { raw: PORTRAIT_MEDIA_QUERY },
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      serif: ["Gentium Book Plus", "serif"],
      mono: ["Source Code Pro", "monospace"],
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
    },
  },
} satisfies Config;

const CATEGORY_COLORS = {
  [BUSINESS_CATEGORY]: TAILWIND_CONFIG.theme.colors.cornflower,
  [DEVELOPMENT_CATEGORY]: TAILWIND_CONFIG.theme.colors.purple,
  [DESIGN_CATEGORY]: TAILWIND_CONFIG.theme.colors.amethyst,
  [PSYCHOLOGY_CATEGORY]: TAILWIND_CONFIG.theme.colors.mulberry,
  [CHESS_CATEGORY]: TAILWIND_CONFIG.theme.colors.bittersweet,
  [OTHER_CATEGORY]: TAILWIND_CONFIG.theme.colors.bittersweet,
} as const;

const HOCUS_SELECTORS = ["&:hover", "&:focus-visible"];
const SELECTED_SELECTORS = ["&[aria-checked='true']", "&[aria-current='page']"];

export default {
  ...TAILWIND_CONFIG,
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("hocus", HOCUS_SELECTORS);
      addVariant("selected", SELECTED_SELECTORS);
      addVariant("shocus", [...HOCUS_SELECTORS, ...SELECTED_SELECTORS]);
    }),
    themeSwapper({
      themes: [
        {
          name: "base",
          selectors: [":root"],
          theme: {
            colors: {
              theme: {
                accent: TAILWIND_CONFIG.theme.colors.cornflower,
                background: TAILWIND_CONFIG.theme.colors.white,
                backgroundHighlight: TAILWIND_CONFIG.theme.colors.bleach,
                extraLightText: TAILWIND_CONFIG.theme.colors.gray,
                header: TAILWIND_CONFIG.theme.colors.blackOut,
                lightText: TAILWIND_CONFIG.theme.colors.emperor,
                text: TAILWIND_CONFIG.theme.colors.mineShaft,
              },
            },
          },
        },
        {
          name: "dark",
          mediaQuery: "@media (prefers-color-scheme: dark)",
          theme: {
            colors: {
              theme: {
                background: TAILWIND_CONFIG.theme.colors.blackOut,
                backgroundHighlight: TAILWIND_CONFIG.theme.colors.mineShaft,
                header: TAILWIND_CONFIG.theme.colors.white,
                text: TAILWIND_CONFIG.theme.colors.bleach,
                lightText: TAILWIND_CONFIG.theme.colors.steam,
                extraLightText: TAILWIND_CONFIG.theme.colors.greatFalls,
              },
            },
          },
        },
        ...Object.entries(CATEGORY_COLORS).map(([category, color]) => ({
          name: camelCase(category),
          selectors: [`[data-category="${category}"]`],
          theme: {
            colors: {
              theme: {
                accent: color,
              },
            },
          },
        })),
      ],
    }),
  ],
} satisfies Config;
