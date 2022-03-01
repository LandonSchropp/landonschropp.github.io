const { onCreateSVGDataNode } = require("./gatsby/on-create-svg-data-node");

const { GRAPH_QL_ARTICLE_TYPE, resolveArticle } = require("./gatsby/article-resolver");
const { GRAPH_QL_NOTE_TYPE } = require("./gatsby/note-resolver");

exports.onCreateNode = async (...parameters) => {
  await onCreateSVGDataNode(...parameters);
};

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    ${ GRAPH_QL_ARTICLE_TYPE }
    ${ GRAPH_QL_NOTE_TYPE }
  `);
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      article: {
        type: "Article",
        resolve: resolveArticle
      }
    }
  });
};
