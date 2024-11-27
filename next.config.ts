import type { NextConfig } from "next";

/* 
eslint-disable @typescript-eslint/no-unsafe-call -- This can't be re-enabled until I can drop the
Webpack configuraiton from Next.js.
*/

/* 
eslint-disable @typescript-eslint/no-unsafe-member-access -- This can't be re-enabled until I can
drop the Webpack configuraiton from Next.js.
*/

export default {
  output: "export",
  distDir: "dist",
  webpack(config) {
    if (!(config.module?.rules instanceof Array)) {
      throw new Error("Invalid Webpack Configuration");
    }

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /react/,
      use: {
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [
              { name: "cleanupIds" },
              { name: "removeDimensions" },
              { name: "removeAttrs", params: { attrs: "(stroke|fill|stroke-width)" } },
            ],
          },
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /raw/,
      type: "asset/source",
    });

    return config;
  },
} satisfies NextConfig;
