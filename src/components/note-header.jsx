import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import {
  ARTICLE_MEDIA,
  LIVE_TALK_MEDIA,
  OTHER_MEDIA,
  PODCAST_MEDIA
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

function NoteByline({ note, sourceText, authorText, sourceFirst }) {
  if (note.title === note.source && note.authors.length === 1 && note.authors[0] === note.title) {
    return null;
  }

  let source = <a className="header__link" href={ baseURL(note.url) }>{ note.source }</a>;
  let authors = <Listify items={ note.authors } />;

  if (note.authors.length === 1 && note.authors[0] === note.source) {
    return <>{ sourceText } { source }</>;
  }

  if (note.title === note.source) {
    return <>{ authorText } { authors }</>;
  }

  return <>
    { sourceFirst ? sourceText : authorText }
    { " " }
    { sourceFirst ? source : authors }
    { (sourceFirst ? authorText : sourceText).startsWith(",") ? "" : " " }
    { sourceFirst ? authorText : sourceText }
    { " " }
    { sourceFirst ? authors : source }
  </>;
}

NoteByline.defaultProps = {
  sourceFirst: false
};

NoteByline.propTypes = {
  note: NotePropType.isRequired,
  sourceText: PropTypes.node.isRequired,
  authorText: PropTypes.node.isRequired,
  sourceFirst: PropTypes.bool
};

function NoteSubheadText({ note }) {
  if (note.category === LIVE_TALK_MEDIA) {
    return <NoteByline note={ note } authorText="A talk by" sourceText="I attended at" />;
  }

  if (note.category === PODCAST_MEDIA) {
    return <NoteByline note={ note } sourceText="From" authorText=", a podcast by" sourceFirst />;
  }

  if (note.category === ARTICLE_MEDIA) {
    return <NoteByline note={ note } authorText="An article by" sourceText="from" />;
  }

  if (note.category === OTHER_MEDIA) {
    return <NoteByline note={ note } sourceText="From" authorText="by" sourceFirst />;
  }

  return <NoteByline
    note={ note }
    authorText={ `A ${ note.category.toLowerCase() } by` }
    sourceText="from"
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
