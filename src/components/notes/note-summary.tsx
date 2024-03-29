import { Listify } from "@/components/base/listify";
import { Summary } from "@/components/content/summary";
import { BOOK_MEDIA } from "@/constants";
import type { NoteSummary as NoteSummaryType } from "@/types";
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

  if (isNil(note.source) || note.media === BOOK_MEDIA) {
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
    <Summary
      url={`/notes/${note.slug}`}
      title={note.title}
      tag={note.category}
      tagAttribute="category"
    >
      <NoteByline note={note} />
    </Summary>
  );
}
