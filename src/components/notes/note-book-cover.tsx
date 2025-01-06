import { BOOK_MEDIA } from "@/constants";
import type { Note } from "@/types";

type NoteBookCoverProps = {
  note: Note;
};

export function NoteBookCover({ note }: NoteBookCoverProps) {
  if (note.media !== BOOK_MEDIA) {
    return null;
  }

  return (
    <figure className="mx-auto my-6 max-w-[25ch]">
      <img className="shadow-lg" src={`/isbn/${note.isbn}`} alt={`${note.title} book cover`} />
      <figcaption className="mt-1 text-center text-xs italic text-theme-extraLightText">
        Cover image courtesy of{" "}
        <a className="text-theme-extraLightText underline" href="https://openlibrary.org/">
          Open Library
        </a>
      </figcaption>
    </figure>
  );
}
