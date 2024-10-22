import type { NextConfig } from "next";

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
