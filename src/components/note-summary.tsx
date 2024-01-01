import type { NoteSummary as NoteSummaryType } from "../types";

import { Listify } from "../components/listify";
import { isEmpty, isNil } from "remeda";

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
    <a
      className={`
        my-4 pl-[calc(theme('spacing.3')-3px)] border-l-[3px] block text-theme-text 
        border-theme-accent hocus:bg-theme-backgroundHighlight hocus:shadow-largeOutline 
        hocus:shadow-theme-backgroundHighlight outline-none transition-all duration-75 ease-in 
        max-md:
      `}
      href={`/notes/${note.slug}`}
      data-category={note.category}
    >
      <h3 className="my-0 text-base">{note.title}</h3>
      <p className="my-0">
        <NoteByline note={note} />
      </p>
    </a>
  );
}
