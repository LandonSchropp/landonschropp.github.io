import { baseURL, Header, Listify } from "landon-schropp-gatsby-theme";
import PropTypes from "prop-types";
import React from "react";

import {
  ARTICLE_MEDIA,
  LIVE_TALK_MEDIA,
  OTHER_MEDIA,
  PODCAST_MEDIA
} from "../data/constants";
import { NotePropType } from "../data/prop-types";

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
  if (note.media === LIVE_TALK_MEDIA) {
    return <NoteByline note={ note } authorText="A talk by" sourceText="I attended at" />;
  }

  if (note.media === PODCAST_MEDIA) {
    return <NoteByline note={ note } sourceText="From" authorText=", a podcast by" sourceFirst />;
  }

  if (note.media === ARTICLE_MEDIA) {
    return <NoteByline note={ note } authorText="An article by" sourceText="from" />;
  }

  if (note.media === OTHER_MEDIA) {
    return <NoteByline note={ note } sourceText="From" authorText="by" sourceFirst />;
  }

  return <NoteByline
    note={ note }
    authorText={ `A ${ note.media.toLowerCase() } by` }
    sourceText="from"
  />;
}

NoteSubheadText.propTypes = {
  note: NotePropType.isRequired
};

export function NoteHeader({ note }) {
  return <Header
    className="note-header"
    superText="My personal notes for"
    title={ note.title }
    subText={ <NoteSubheadText note={ note } /> }
    href={ note.url }
  />;
}

NoteHeader.propTypes = {
  note: NotePropType.isRequired
};
