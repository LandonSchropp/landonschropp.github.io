import { MDXRenderer } from "gatsby-plugin-mdx";
import PropTypes from "prop-types";
import React from "react";

import { NotePropType } from "../data/prop-types";
import { NoteHeader } from "./note-header";

export function Note({ note, content }) {
  return (
    <article className="note" data-category={note.category}>
      <NoteHeader note={note} />
      <MDXRenderer>{content}</MDXRenderer>
    </article>
  );
}

Note.propTypes = {
  note: NotePropType.isRequired,
  content: PropTypes.string.isRequired,
};
