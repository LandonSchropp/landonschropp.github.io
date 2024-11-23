import { fetchContent, fetchContents } from "./content";
import { assertNote } from "@/assertions";
import { NOTES_PATH } from "@/env";
import { Note } from "@/types";

/**
 * Fetches all notes from the local Obsidian vault.
 * @returns An array of notes.
 */
export async function fetchNotes(): Promise<Note[]> {
  return (await fetchContents(NOTES_PATH)).map(assertNote);
}

/**
 * Fetches a single note from the local Obsidian vault.
 * @param slug The slug of the note.
 * @returns The note with the provided slug.
 */
export async function fetchNote(slug: string): Promise<Note> {
  return assertNote(await fetchContent(NOTES_PATH, slug));
}
