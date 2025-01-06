import { NoteBookCover } from "./note-book-cover";
import { Note } from "@/types";

type NoteEmbedProps = {
  note: Note;
};

export function NoteEmbed({ note }: NoteEmbedProps) {
  return (
    <>
      <NoteBookCover note={note} />
    </>
  );
}
