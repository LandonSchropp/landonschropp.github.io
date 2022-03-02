
const { onCreateSVGDataNode } = require("./gatsby/on-create-svg-data-node");

const {
  GRAPH_QL_ARTICLE_TYPE,
  resolveArticle,
  resolveArticles
} = require("./gatsby/article-resolver");

const { GRAPH_QL_NOTE_TYPE } = require("./gatsby/note-resolver");
const { createArticlePages } = require("./gatsby/create-article-pages");

// Generate the SVG data for the index page.
exports.onCreateNode = async (...parameters) => {
  await onCreateSVGDataNode(...parameters);
};

// Add the Article and Note GraphQL types.
exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    ${ GRAPH_QL_ARTICLE_TYPE }
    ${ GRAPH_QL_NOTE_TYPE }
  `);
};

// Create the customer resolvers.
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      article: {
        type: "Article",
        resolve: resolveArticle
      },
      articles: {
        type: "[Article]",
        resolve: resolveArticles
      }
    }
  });
};

// Create the dynamic pages.
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  await createArticlePages(graphql, createPage);
};
