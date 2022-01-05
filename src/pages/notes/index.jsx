import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { NoteSummary } from "../../components/note-summary";
import { Tag } from "../../components/tag";
import {
  ARTICLE_CATEGORY,
  BOOK_CATEGORY,
  PODCAST_CATEGORY,
  TALK_CATEGORY,
  VIDEO_CATEGORY
} from "../../data/constants";
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

  return <Layout
    title="Landon Schropp - Notes"
    description="My personal notes on blog posts, talks, podcasts and books."
  >

    <header className="header">
      <h1 className="header__header">
        Notes
      </h1>

      <p className="header__subhead">
        This is my personal collection of notes on entrepreneurship, development and design.
      </p>

      <div className="header__tags">
        <span className="header__tag-group">
          <Tag category={ ARTICLE_CATEGORY } />
          <Tag category={ BOOK_CATEGORY } />
          <Tag category={ VIDEO_CATEGORY } />
        </span>
        <span className="header__tag-group">
          <Tag category={ TALK_CATEGORY } />
          <Tag category={ PODCAST_CATEGORY } />
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
