exports.GRAPH_QL_ARTICLE_TYPE = `
  type Article implements Node {
    id: ID!
    parent: Node!
    children: [Node!]!
    internal: Internal!

    title: String!
    slug: String!
    date: Date!
    description: String!
    url: String!
    publisher: String!
    published: Boolean!
    content: String!
  }
`;
