const BLOG_NOTION_ID = "c68575f91f534048bb15c54f0f230882";
const NOTES_NOTION_ID = "da4f9ded813b424e83e5f552b1f41a3e";

module.exports = {
  siteMetadata: {
    siteUrl: "https://landonschropp.github.io",
    title: "Landon Schropp"
  },
  plugins: [
    "gatsby-transformer-index-page-image",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "297702848"
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/flannel.png"
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /icons/
        }
      }
    },
    {
      resolve: "gatsby-source-notion-api",
      options: {
        token: process.env.NOTION_API_TOKEN,
        databaseId: NOTES_NOTION_ID,
        lowerTitleLevel: true
      }
    },
    {
      resolve: "gatsby-source-notion-api",
      options: {
        token: process.env.NOTION_API_TOKEN,
        databaseId: BLOG_NOTION_ID,
        lowerTitleLevel: true
      }
    }
  ]
};
