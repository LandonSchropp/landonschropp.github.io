import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { Note } from "../../components/note";
import { Layout } from "../../layout/layout";

// NOTE: I'm using $slug here instead of ID because the transformed note node is no longer tied to
// the MDX node.
export const query = graphql`
  query Note($slug: String) {
    mdx(frontmatter: {Slug: {eq: $slug}}) {
      body
    }
    note(slug: {eq: $slug}) {
      authors
      category
      date
      published
      slug
      source
      title
      url
    }
  }
`;

export default function NotePage({ data }) {
  return <Layout
    title={ `Landon Schropp - Notes - ${ data.note.title }` }
    description={ `My personal notes for ${ data.note.title }` }
    category={ data.note.category }
  >
    <Note note={ data.note } content={ data.mdx.body } />
  </Layout>;
}

NotePage.propTypes = {
  data: PropTypes.object
};
