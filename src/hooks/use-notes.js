import { graphql, useStaticQuery } from "gatsby";

import { transformNote } from "../data/notes";

const QUERY = graphql`
  query Notes {
    allNotion(
      filter: {properties: {Published: {value: {eq: true}}, Type: {value: {string: {eq: "Note"}}}}}
    ) {
      edges {
        node {
          title
          properties {
            Slug { value }
            Authors { value }
            Date { value { start } }
            Category { value { name } }
            Source { value }
            URL { value }
          }
        }
      }
    }
  }
`;

/**
 * Returns the index page image data.
 */
export function useNotes() {
  return useStaticQuery(QUERY).allNotion.edges.map(transformNote);
}
