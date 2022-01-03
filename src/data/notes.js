import _ from "lodash";

/**
 * Transforms a GraphQL node into a new object that can be used in a note component.
 */
export function transformNote({ node }) {
  return {
    title: node.title,
    slug: node.properties["Slug"].value,
    authors: node.properties["Authors"].value.split(",").map(_.trim),
    date: new Date(node.properties["Date"].value.start),
    category: node.properties["Category"].value.name,
    source: node.properties["Source"].value,
    url: node.properties["URL"].value
  };
}
