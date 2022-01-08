const { onCreateNotionNoteNode } = require("./gatsby/on-create-notion-note-node");

// Add custom onCreateNode callbacks to Gatsby.
exports.onCreateNode = async (...parameters) => {
  await onCreateNotionNoteNode(...parameters);
};
