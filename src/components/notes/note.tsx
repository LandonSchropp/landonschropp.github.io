"use client";

import { NoteHeader } from "@/components/notes/note-header";
import { useCategory } from "@/hooks/use-category";
import type { Note as NoteType } from "@/types";
import { useEffect } from "react";

type NoteProps = {
  note: NoteType;
};

export function Note({ note }: NoteProps) {
  const [, setCategory] = useCategory();
  useEffect(() => setCategory(note.category), [note.category, setCategory]);

  return (
    <article className="my-6" data-category={note.category}>
      <NoteHeader note={note} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Using markdown compiled to HTML. */}
      <section dangerouslySetInnerHTML={{ __html: note.content }} />
    </article>
  );
}
