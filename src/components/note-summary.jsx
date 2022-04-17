import { Link } from "gatsby";
import _ from "lodash";
import React from "react";

import { Listify } from "../components/listify";
import { NotePropType } from "../data/prop-types";

function NoteByline({ note }) {
  if (_.isEmpty(note.authors) && _.isNil(note.source)) {
    return null;
  }

  let authors = <span key="authors" className="note-summary__authors">
    <Listify items={ note.authors } />
  </span>;

  let source = <span key="source" className="note-summary__source">
    { note.source }
  </span>;

  if (_.isEmpty(note.authors)) {
    return source;
  }

  if (_.isNil(note.source)) {
    return authors;
  }

  return <>
    { authors }
    { " " }
    <span className="note-summary__separator">∙</span>
    { " " }
    { source }
  </>;

}

NoteByline.propTypes = {
  note: NotePropType.isRequired
};

export function NoteSummary({ note }) {

  return <Link
    className="note-summary"
    to={ `/notes/${ note.slug }` }
    data-category={ note.category }
  >
    <h3 className="note-summary__title">
      { note.title }
    </h3>
    <p className="note-summary__about">
      <NoteByline note={ note } />
    </p>
  </Link>;
}

NoteSummary.propTypes = {
  note: NotePropType.isRequired
};
