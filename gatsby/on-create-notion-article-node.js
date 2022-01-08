const { buildOnCreateNotionNode } = require("./on-create-notion-node");

function transformNodeToArticle(node) {
  return {
    title: node.title,
    slug: node.properties["Slug"].value,
    date: node.properties["Date"].value.start,
    description: node.properties["Description"].value,
    url: node.properties["URL"].value,
    publisher: node.properties["Publisher"].value.name,
    published: node.properties["Published"].value
  };
}

exports.onCreateNotionArticleNode = buildOnCreateNotionNode("Article", transformNodeToArticle);
