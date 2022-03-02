const { createContentDigest } = require("gatsby-core-utils");

const NOTE_TYPE = "Note";

function transformNotionNodeToNote(notionNode) {

  // Split apart the authors string.
  let authors = notionNode.properties["Authors"].value.trim() === ""
    ? []
    : notionNode.properties["Authors"].value.split(",").map(author => author.trim());

  // Build the data for the node.
  let data = {
    id: `${ notionNode.id } >>> ${ NOTE_TYPE }`,
    title: notionNode.title,
    slug: notionNode.properties["Slug"].value,
    authors,
    date: notionNode.properties["Date"].value.start,
    category: notionNode.properties["Category"].value.name,
    media: notionNode.properties["Media"].value.name,
    source: notionNode.properties["Source"].value,
    url: notionNode.properties["URL"].value,
    published: notionNode.properties["Published"].value
  };

  // Create the Gatsby Node structure using the data.
  return {
    parent: null,
    children: [],
    internal: {
      type: NOTE_TYPE,
      contentDigest: createContentDigest(data)
    },
    ...data
  };
}
exports.GRAPH_QL_NOTE_TYPE = `
  type Note implements Node {
    id: ID!
    parent: Node!
    children: [Node!]!
    internal: Internal!

    title: String!,
    slug: String!,
    authors: [String!]!,
    date: Date!,
    category: String!,
    media: String!,
    source: String!,
    url: String!,
    published: Boolean!
  }
`;

exports.resolveNote = async (source, args, context) => {
  const notionNode = await context.nodeModel.findOne({
    query: {
      filter: {
        properties: {
          Slug: { value: { eq: args.slug.eq } },
          Type: { value: { string: { eq: NOTE_TYPE } } }
        }
      }
    },
    type: "Notion"
  });

  return transformNotionNodeToNote(notionNode);
};

exports.resolveNotes = async (source, args, context) => {
  const { entries } = await context.nodeModel.findAll({
    query: {
      filter: {
        properties: {
          Type: { value: { string: { eq: NOTE_TYPE } } },
          Published: { value: { eq: true } }
        }
      },
      sort: {
        fields: [ "properties.Date.value.start" ],
        order: [ "DESC" ]
      }
    },
    type: "Notion"
  });

  return entries.map(transformNotionNodeToNote);
};
