const { createDataNode } = require("../../gatsby/data-node");

const NOTION_NODE_TYPE = "Notion";

function isNote(node) {
  return node.properties["Type"].value.string === "Note";
}

function isPublished(node) {
  return node.properties["Published"].value === true;
}

function transformNodeToNote(node) {
  return {
    title: node.title,
    slug: node.properties["Slug"].value,
    authors: node.properties["Authors"].value.split(",").map(author => author.trim()),
    date: node.properties["Date"].value.start,
    category: node.properties["Category"].value.name,
    source: node.properties["Source"].value,
    url: node.properties["URL"].value,
    published: node.properties["Published"].value
  };
}

exports.onCreateNode = async ({ node, ...gatsby }) => {

  // Only transform published notes. Filtering published notes here prevents any unpublished notes
  // from accidentally getting included later.
  if (node.internal.type !== NOTION_NODE_TYPE || !isNote(node) || !isPublished(node)) {
    return;
  }

  createDataNode(node, "Note", gatsby, transformNodeToNote(node));
};
