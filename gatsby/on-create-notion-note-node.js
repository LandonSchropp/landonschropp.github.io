const { buildOnCreateNotionNode } = require("./on-create-notion-node");

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

exports.onCreateNotionNoteNode = buildOnCreateNotionNode("Note", transformNodeToNote);
