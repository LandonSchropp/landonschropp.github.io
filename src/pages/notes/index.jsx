import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

import { NoteSummary } from "../../components/note-summary";
import { Tag } from "../../components/tag";
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
    <Helmet>
      <title>Landon Schropp - Notes</title>
      <description>My personal notes on blog posts, talks, podcasts and books.</description>
    </Helmet>

    <header className="header">
      <h1 className="header__header">
        Notes
      </h1>

      <p className="header__subhead">
        This is my personal collection of notes on entrepreneurship, development and design.
      </p>

      <div className="header__tags">
        <span className="header__tag-group">
          <Tag category="Article" />
          <Tag category="Book" />
          <Tag category="Video" />
        </span>
        <span className="header__tag-group">
          <Tag category="Talk" />
          <Tag category="Podcast" />
        </span>
      </div>
    </header>

    <section className="note-summaries">
      { notes.map(note => <NoteSummary key={ note.slug } note={ note } />) }
    </section>
  </Layout>;
}

NotesPage.propTypes = {
  data: PropTypes.object
};
