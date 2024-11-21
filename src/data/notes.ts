import { fetchContent, fetchContents } from "./content";
import { assertNote } from "@/assertions";
import { NOTES_PATH } from "@/env";
import { Note } from "@/types";

/**
 * Fetches all notes from the local Obsidian vault.
 * @returns An array of notes.
 */
export async function fetchNotes(): Promise<Note[]> {
  const notes = await fetchContents(NOTES_PATH);

  for (const note of notes) {
    assertNote(note);
  }

  return notes as Note[];
}

/**
 * Fetches a single note from the local Obsidian vault.
 * @param slug The slug of the note.
 * @returns The note with the provided slug.
 */
export async function fetchNote(slug: string): Promise<Note> {
  const note = await fetchContent(NOTES_PATH, slug);
  assertNote(note);
  return note;
}
