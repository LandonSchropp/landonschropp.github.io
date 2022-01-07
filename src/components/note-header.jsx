import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import {
  ARTICLE_CATEGORY,
  LIVE_TALK_CATEGORY,
  OTHER_CATEGORY,
  PODCAST_CATEGORY
} from "../data/constants";
import { NotePropType } from "../data/prop-types";
import { baseURL } from "../utilities/url";
import { Listify } from "./listify";

function NoteTitleText({ note }) {
  if (_.isNil(note.url)) {
    return note.title;
  }

  return <a className="header__title-link" href={ note.url }>{ note.title }</a>;
}

NoteTitleText.propTypes = {
  note: NotePropType.isRequired
};

function NoteByline({ note, startText, middleText, sourceFirst }) {
  if (note.title === note.source && note.authors.length === 1 && note.authors[0] === note.title) {
    return null;
  }

  let source = <a className="header__link" href={ baseURL(note.url) }>{ note.source }</a>;
  let authors = <Listify items={ note.authors } />;

  return <>
    { startText }
    { " " }
    { sourceFirst ? source : authors }
    { middleText.startsWith(",") ? "" : " " }
    { middleText }
    { " " }
    { sourceFirst ? authors : source }
  </>;
}

NoteByline.defaultProps = {
  sourceFirst: false
};

NoteByline.propTypes = {
  note: NotePropType.isRequired,
  startText: PropTypes.node.isRequired,
  middleText: PropTypes.node.isRequired,
  sourceFirst: PropTypes.bool
};

function NoteSubheadText({ note }) {
  if (note.category === LIVE_TALK_CATEGORY) {
    return <NoteByline note={ note } startText="A talk by" middleText="I attended at" />;
  }

  if (note.category === PODCAST_CATEGORY) {
    return <NoteByline note={ note } startText="From" middleText=", a podcast by" sourceFirst />;
  }

  if (note.category === ARTICLE_CATEGORY) {
    return <NoteByline note={ note } startText="An article by" middleText="from" />;
  }

  if (note.category === OTHER_CATEGORY) {
    return <NoteByline note={ note } startText="From" middleText="by" sourceFirst />;
  }

  return <NoteByline
    note={ note }
    startText={ `A ${ note.category.toLowerCase() } by` }
    middleText="from"
  />;
}

NoteSubheadText.propTypes = {
  note: NotePropType.isRequired
};

export function NoteHeader({ note }) {

  return <header className="header">

    <h1 className="header__header">
      <span className="header__suphead">
        My personal notes for
      </span>
      { " " }
      <span className="header__title">
        <NoteTitleText note={ note } />
      </span>
    </h1>
    <div className="header__subhead" data-test-id="subhead">
      <NoteSubheadText note={ note } />
    </div>
  </header>;
}

NoteHeader.propTypes = {
  note: NotePropType.isRequired
};
