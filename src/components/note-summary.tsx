import type { NoteSummary as NoteSummaryType } from "../types";

import { Listify } from "../components/listify";
import { isEmpty, isNil } from "remeda";
import { Summary } from "./summary";

type NoteBylineProps = {
  note: NoteSummaryType;
};

function NoteByline({ note }: NoteBylineProps) {
  if (isEmpty(note.authors) && isNil(note.source)) {
    return null;
  }

  const authors = (
    <span key="authors" className="max-md:block">
      <Listify items={note.authors} />
    </span>
  );

  const source = (
    <span key="source" className="max-md:italic">
      {note.source}
    </span>
  );

  if (isEmpty(note.authors)) {
    return source;
  }

  if (isNil(note.source)) {
    return authors;
  }

  return (
    <>
      {authors} <span className="max-md:hidden">∙</span> {source}
    </>
  );
}

type NoteSummaryProps = {
  note: NoteSummaryType;
};

export function NoteSummary({ note }: NoteSummaryProps) {
  return (
    <Summary url={`/notes/${note.slug}`} title={note.title} category={note.category}>
      <NoteByline note={note} />
    </Summary>
  );
}
