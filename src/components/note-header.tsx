import { LIVE_TALK_MEDIA, PODCAST_MEDIA, ARTICLE_MEDIA, OTHER_MEDIA } from "../constants";
import { baseURL } from "../utilities/url";
import { Header } from "./header";
import { Listify } from "./listify";
import type { Note } from "../types";

type NoteBylineProps = {
  note: Note;
  sourceText: string;
  authorText: string;
  sourceFirst?: boolean;
};

function NoteByline({ note, sourceText, authorText, sourceFirst = false }: NoteBylineProps) {
  if (
    note.title === note.source &&
    (note.authors.length === 0 || (note.authors.length === 1 && note.authors[0] === note.title))
  ) {
    return null;
  }

  const source = <a href={baseURL(note.url)}>{note.source}</a>;
  const authors = <Listify items={note.authors} />;

  if (note.authors.length === 0 || (note.authors.length === 1 && note.authors[0] === note.source)) {
    return (
      <>
        {sourceText} {source}
      </>
    );
  }

  if (note.title === note.source) {
    return (
      <>
        {authorText} {authors}
      </>
    );
  }

  return (
    <>
      {sourceFirst ? sourceText : authorText} {sourceFirst ? source : authors}
      {(sourceFirst ? authorText : sourceText).startsWith(",") ? "" : " "}
      {sourceFirst ? authorText : sourceText} {sourceFirst ? authors : source}
    </>
  );
}

type NoteSubheadTextProps = {
  note: Note;
};

function NoteSubheadText({ note }: NoteSubheadTextProps) {
  if (note.media === LIVE_TALK_MEDIA) {
    return <NoteByline note={note} authorText="A talk by" sourceText="I attended at" />;
  }

  if (note.media === PODCAST_MEDIA) {
    return <NoteByline note={note} sourceText="From" authorText=", a podcast by" sourceFirst />;
  }

  if (note.media === ARTICLE_MEDIA) {
    return <NoteByline note={note} authorText="An article by" sourceText="from" />;
  }

  if (note.media === OTHER_MEDIA) {
    return <NoteByline note={note} sourceText="From" authorText="by" sourceFirst />;
  }

  return (
    <NoteByline note={note} authorText={`A ${note.media.toLowerCase()} by`} sourceText="from" />
  );
}

type NoteHeaderProps = {
  note: Note;
};

export function NoteHeader({ note }: NoteHeaderProps) {
  return (
    <Header
      superText="My personal notes for"
      title={note.title}
      subText={<NoteSubheadText note={note} />}
      href={note.url}
    />
  );
}
