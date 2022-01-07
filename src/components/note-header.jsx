import _ from "lodash";
import React from "react";

import {
  ARTICLE_CATEGORY,
  BOOK_CATEGORY,
  LIVE_TALK_CATEGORY,
  OTHER_CATEGORY,
  PODCAST_CATEGORY
} from "../data/constants";
import { NotePropType } from "../data/prop-types";
import { baseURL } from "../utilities/url";
import { Listify } from "./listify";

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
      An article by <Listify items={ note.authors } /> from
      { " " }
      <a className="header__link" href={ baseURL(note.url) }>{ note.source }</a>
    </>;
  }

  if (note.category === BOOK_CATEGORY) {
    return <>
      A book by
      { " " }
      <Listify items={ note.authors } />
    </>;
  }

  if (note.category === OTHER_CATEGORY) {
    return <>
      From
      { " " }
      <a className="header__link" to={ baseURL(note.url) }>{ note.source }</a>
      { " " }
      by
      { " " }
      <Listify items={ note.authors } />
    </>;
  }

  return <>
    A { note.category.toLowerCase() } by <Listify items={ note.authors } /> from
    { " " }
    <a className="header__link" to={ baseURL(note.url) }>{ note.source }</a>
  </>;
}

NoteSubheadText.propTypes = {
  note: NotePropType.isRequired
};

export function NoteHeader({ note }) {

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
