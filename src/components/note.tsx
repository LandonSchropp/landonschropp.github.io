import "../styles/content/anchors.css";
import "../styles/content/audios.css";
import "../styles/content/blockquotes.css";
import "../styles/content/cite.css";
import "../styles/content/code.css";
import "../styles/content/headers.css";
import "../styles/content/hr.css";
import "../styles/content/image.css";
import "../styles/content/lists.css";
import "../styles/content/paragraphs.css";
import "../styles/content/pre.css";

import type { Note as NoteType } from "../types";

import { NoteHeader } from "./note-header";

type NoteProps = {
  note: NoteType;
};

export function Note({ note }: NoteProps) {
  return (
    <article className="my-6" data-category={note.category}>
      <NoteHeader note={note} />
      <section dangerouslySetInnerHTML={{ __html: note.content }} />
    </article>
  );
}
