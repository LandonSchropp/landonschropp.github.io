import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import svgr from "vite-plugin-svgr";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    plugins: [
      svgr({
        svgrOptions: {
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
          svgoConfig: {
            plugins: [
              "preset-default",
              "removeTitle",
              "removeDesc",
              "removeDoctype",
              "cleanupIds",
              { name: "removeAttrs", params: { attrs: "(stroke|fill|stroke-width)" } },
            ],
          },
        },
      }),
    ],
  },
});
