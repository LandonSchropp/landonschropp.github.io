import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { Layout } from "../../layout/layout";

export const query = graphql`
  query Notes {
    allNote {
      nodes {
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
  }
`;

export default function NotesPage({ data }) {
  let notes = data.allNote.nodes;

  return <Layout className="notes-page">
    <h1>Notes</h1>

    {
      notes.map(({ title, slug }) => <h2 key={ slug }>{ title }</h2>)
    }
  </Layout>;
}

NotesPage.propTypes = {
  data: PropTypes.object
};
