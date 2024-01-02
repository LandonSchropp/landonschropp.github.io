"use client";

import { useCategory } from "@/hooks/use-category";
import { useEffect } from "react";
import type { Note as NoteType } from "../types";
import { NoteHeader } from "./note-header";

type NoteProps = {
  note: NoteType;
};

export function Note({ note }: NoteProps) {
  let [, setCategory] = useCategory();
  useEffect(() => setCategory(note.category), [note.category]);

  return (
    <article className="my-6" data-category={note.category}>
      <NoteHeader note={note} />
      <section dangerouslySetInnerHTML={{ __html: note.content }} />
    </article>
  );
}
