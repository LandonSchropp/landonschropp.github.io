import { MDXRenderer } from "gatsby-plugin-mdx";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import { ARTICLE_CATEGORY, BOOK_CATEGORY, PODCAST_CATEGORY } from "../data/constants";
import { NotePropType } from "../data/prop-types";
import { baseURL } from "../utilities/url";
import { Listify } from "./listify";

const LIVE_TALK_CATEGORY = "";

function NoteHeaderText({ note }) {
  if (_.isNil(note.url)) {
    return note.title;
  }

  return <a className="header__title-link" href={ note.url }>{ note.title }</a>;
}

NoteHeaderText.propTypes = {
  note: NotePropType.isRequired
};

function NoteSubheadText({ note }) {
  if (note.category === LIVE_TALK_CATEGORY) {
    return <>
      A talk by <Listify items={ note.authors } /> I attended at { note.source }
    </>;
  }

  if (note.category === PODCAST_CATEGORY) {
    return <>
      From
      { " " }
      <a className="header__link" href={ baseURL(note.url) }>{ note.source }</a>,
      { " " }
      a podcast by <Listify items={ note.authors } />
    </>;
  }

  if (note.category === ARTICLE_CATEGORY) {
    return <>
      An { note.category.toLowerCase() } by <Listify items={ note.authors } /> from
      <a className="header__link" href={ baseURL(note.url) }>{ note.source }</a>
    </>;
  }

  if (note.category === BOOK_CATEGORY) {
    return <>
      A book by
      { " " }
      <a className="header__link" href={ note.url }><Listify items={ note.authors } /></a>
    </>;
  }

  return <>
    A { note.category.toLowerCase() } by <Listify items={ note.authors } /> on
    { " " }
    <a className="header__link" href={ baseURL(note.url) }>{ note.source }</a>
  </>;
}

NoteSubheadText.propTypes = {
  note: NotePropType.isRequired
};

function NoteHeader({ note }) {

  return <header className="header">
    <p className="header__suphead">
      My personal notes for
    </p>

    <h1 className="header__header">
      <NoteHeaderText note={ note } />
    </h1>
    <p className="header__subhead">
      <NoteSubheadText note={ note } />
    </p>
  </header>;
}

NoteHeader.propTypes = {
  note: NotePropType.isRequired
};

export function Note({ note, content }) {
  return <article className="note" data-category={ note.category }>
    <NoteHeader note={ note } />
    <MDXRenderer>
      { content }
    </MDXRenderer>
  </article>;
}

Note.propTypes = {
  note: NotePropType.isRequired,
  content: PropTypes.string.isRequired
};
