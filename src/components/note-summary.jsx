import { Link } from "gatsby";
import React from "react";

import { Listify } from "../components/listify";
import { NotePropType } from "../data/prop-types";

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
      <span className="note-summary__authors">
        <Listify items={ note.authors } />
      </span>
      <span className="note-summary__separator">∙</span>
      <span className="note-summary__source">
        { note.sourceName }
      </span>
    </p>
  </Link>;
}

NoteSummary.propTypes = {
  note: NotePropType.isRequired
};
