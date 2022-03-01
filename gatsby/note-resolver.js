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
    content: String!
  }
`;
