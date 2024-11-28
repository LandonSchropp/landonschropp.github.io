import { fetchContent, fetchContents } from "./content";
import { assertNote, assertNotes } from "@/assertions";
import { NOTES_PATH } from "@/env";
import { Note } from "@/types";

/**
 * Fetches all notes.
 * @returns An array of notes.
 */
export async function fetchNotes(): Promise<Note[]> {
  const notes = await fetchContents(NOTES_PATH);
  assertNotes(notes);
  return notes;
}

/**
 * Fetches a single note.
 * @param slug The slug of the note.
 * @returns The note with the provided slug.
 */
export async function fetchNote(slug: string): Promise<Note> {
  const note = await fetchContent(NOTES_PATH, slug);
  assertNote(note);
  return note;
}
