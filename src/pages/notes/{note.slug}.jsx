import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import PropTypes from "prop-types";
import React from "react";

import { Layout } from "../../layout/layout";

// NOTE: I'm using $slug here instead of ID because the transformed note node is no longer tied to
export const query = graphql`
  query Note($slug: String) {
    mdx(frontmatter: {Slug: {eq: $slug}}) {
      body
    }
    note(slug: {eq: $slug}) {
      authors
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
  let { note } = data;

  return <Layout navigation={ false } className="notes-page">
    <h1>{ note.title }</h1>
    <MDXRenderer>
      { data.mdx.body }
    </MDXRenderer>
  </Layout>;
}

NotePage.propTypes = {
  data: PropTypes.object
};
