import { useLocation } from "@reach/router";
import { graphql, navigate } from "gatsby";
import { Header } from "landon-schropp-gatsby-theme";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { Layout } from "../components/layout";
import { NoteSummary } from "../components/note-summary";
import { Tag } from "../components/tag";
import {
  BUSINESS_CATEGORY,
  DESIGN_CATEGORY,
  DEVELOPMENT_CATEGORY,
  OTHER_CATEGORY,
  PSYCHOLOGY_CATEGORY
} from "../data/constants";

export const query = graphql`
  query Notes {
    allNote(sort: {fields: [date], order: DESC}) {
      nodes {
        authors
        category
        media
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

  const { href } = useLocation();
  let [ category, setCategory ] = useState(null);

  // If the URL contains a category, remove it and store it in the state.
  useEffect(() => {
    const url = new URL(href);

    if (url.searchParams.has("category")) {
      setCategory(url.searchParams.get("category"));
      url.searchParams.delete("category");
      navigate(`${ url.pathname }${ url.search }${ url.hash }`, { replace: true });
    }
  }, [ href ]);

  // Filter the notes if a category is selected.
  // NOTE: I'm using includes here to accomodate the `Live Talk` category, which should be included
  // by `Talk`.
  let notes = _.isNil(category)
    ? data.allNote.nodes
    : data.allNote.nodes.filter(article => article.category.includes(category));

  // TODO: Remove this once the example post is removed.
  notes = notes.filter(note => note.title !== "Example");

  function toggleCategory(updatedCategory) {
    setCategory(category === updatedCategory ? null : updatedCategory);
  }

  return <Layout
    title="Landon Schropp - Notes"
    description="My personal notes on blog posts, talks, podcasts and books."
  >
    <Header
      title="Notes"
      subText="This is my personal collection of notes on entrepreneurship, development and design."
    >
      <div className="note-header__tags">
        <span className="note-header__tag-group">
          <Tag
            category={ BUSINESS_CATEGORY }
            onClick={ () => toggleCategory(BUSINESS_CATEGORY) }
            selected={ category === BUSINESS_CATEGORY }
          />
          <Tag
            category={ DEVELOPMENT_CATEGORY }
            onClick={ () => toggleCategory(DEVELOPMENT_CATEGORY) }
            selected={ category === DEVELOPMENT_CATEGORY }
          />
          <Tag
            category={ DESIGN_CATEGORY }
            onClick={ () => toggleCategory(DESIGN_CATEGORY) }
            selected={ category === DESIGN_CATEGORY }
          />
        </span>
        <span className="note-header__tag-group">
          <Tag
            category={ PSYCHOLOGY_CATEGORY }
            onClick={ () => toggleCategory(PSYCHOLOGY_CATEGORY) }
            selected={ category === PSYCHOLOGY_CATEGORY }
          />
          <Tag
            category={ OTHER_CATEGORY }
            onClick={ () => toggleCategory(OTHER_CATEGORY) }
            selected={ category === OTHER_CATEGORY }
          />
        </span>
      </div>
    </Header>

    <section className="note-summaries">
      { notes.map(note => <NoteSummary key={ note.slug } note={ note } />) }
    </section>
  </Layout>;
}

NotesPage.propTypes = {
  data: PropTypes.object
};
