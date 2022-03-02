const { createContentDigest } = require("gatsby-core-utils");

const ARTICLE_TYPE = "Article";

function transformNotionNodeToArticle(notionNode) {

  // Build the data for the node.
  let data = {
    id: `${ notionNode.id } >>> ${ ARTICLE_TYPE }`,
    title: notionNode.title,
    slug: notionNode.properties["Slug"].value,
    date: notionNode.properties["Date"].value.start,
    description: notionNode.properties["Description"].value,
    url: notionNode.properties["URL"]?.value,
    publisher: notionNode.properties["Publisher"]?.value?.name,
    published: notionNode.properties["Published"].value
  };

  // Create the Gatsby Node structure using the data.
  return {
    parent: null,
    children: [],
    internal: {
      type: ARTICLE_TYPE,
      contentDigest: createContentDigest(data)
    },
    ...data
  };
}

exports.GRAPH_QL_ARTICLE_TYPE = `
  type ${ ARTICLE_TYPE } implements Node {
    id: ID!
    parent: Node!
    children: [Node!]!
    internal: Internal!

    title: String!
    slug: String!
    date: Date!
    description: String!
    url: String
    publisher: String
    published: Boolean!
  }
`;

exports.resolveArticle = async (source, args, context) => {
  const notionNode = await context.nodeModel.findOne({
    query: {
      filter: {
        properties: {
          Slug: { value: { eq: args.slug.eq } },
          Type: { value: { string: { eq: ARTICLE_TYPE } } }
        }
      }
    },
    type: "Notion"
  });

  return transformNotionNodeToArticle(notionNode);
};

exports.resolveArticles = async (source, args, context) => {
  const { entries } = await context.nodeModel.findAll({
    query: {
      filter: {
        properties: {
          Type: { value: { string: { eq: ARTICLE_TYPE } } },
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

  return entries.map(transformNotionNodeToArticle);
};

