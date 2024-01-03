/** @type {import('next').NextConfig} */
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
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /raw/,
      type: "asset/source",
    });

    return config;
  },
};
