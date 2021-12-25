const globImporter = require('node-sass-glob-importer');

module.exports = {
  siteMetadata: {
    siteUrl: "https://landonschropp.github.io",
    title: "Landon Schropp",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sass",
      options: {
        icon: "src/images/icon.png",
        importer: globImporter()
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "297702848"
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
