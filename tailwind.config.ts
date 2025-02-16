import {
  BUSINESS_CATEGORY,
  DEVELOPMENT_CATEGORY,
  PSYCHOLOGY_CATEGORY,
  OTHER_CATEGORY,
  RUBY_TECHNOLOGY,
  GIT_TECHNOLOGY,
  HEALTH_CATEGORY,
  NEOVIM_TECHNOLOGY,
  SHELL_TECHNOLOGY,
  TYPESCRIPT_TECHNOLOGY,
} from "./src/constants";
import camelCase from "camelcase";
import { mapValues } from "remeda";
import type { Config } from "tailwindcss";
// @ts-expect-error The tailwind-theme-swapper library is not written in TypeScript.
import themeSwapper from "tailwindcss-theme-swapper";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import { PluginAPI } from "tailwindcss/types/config";

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
      "max-md": { max: "419px" },
      "max-lg": { max: "959px" },
      "max-xl": { max: "1279px" },
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
  [PSYCHOLOGY_CATEGORY]: TAILWIND_CONFIG.theme.colors.amethyst,
  [HEALTH_CATEGORY]: TAILWIND_CONFIG.theme.colors.mulberry,
  [OTHER_CATEGORY]: TAILWIND_CONFIG.theme.colors.bittersweet,
} as const;

const TECHNOLOGY_COLORS = {
  [TYPESCRIPT_TECHNOLOGY]: TAILWIND_CONFIG.theme.colors.cornflower,
  [RUBY_TECHNOLOGY]: TAILWIND_CONFIG.theme.colors.purple,
  [GIT_TECHNOLOGY]: TAILWIND_CONFIG.theme.colors.amethyst,
  [NEOVIM_TECHNOLOGY]: TAILWIND_CONFIG.theme.colors.mulberry,
  [SHELL_TECHNOLOGY]: TAILWIND_CONFIG.theme.colors.bittersweet,
} as const;

const HOCUS_SELECTORS = ["&:hover", "&:focus-visible"];
const SELECTED_SELECTORS = ["&[aria-checked='true']", "&[aria-current='page']"];

export default {
  ...TAILWIND_CONFIG,
  plugins: [
    plugin(({ addVariant }: PluginAPI) => {
      addVariant("hocus", HOCUS_SELECTORS);
      addVariant("selected", SELECTED_SELECTORS);
      addVariant("shocus", [...HOCUS_SELECTORS, ...SELECTED_SELECTORS]);
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
        ...Object.entries(TECHNOLOGY_COLORS).map(([technology, color]) => ({
          name: camelCase(technology),
          selectors: [`[data-technology="${technology}"]`],
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
