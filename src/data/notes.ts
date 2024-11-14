import { fetchContent, fetchContents } from "./content";
import { assertNote, Note } from "@/schema";
import { join } from "path";

if (!process.env.OBSIDIAN_VAULT) {
  throw new Error("You must set the $OBSIDIAN_VAULT environment variable!");
}

const NOTES_PATH = join(process.env.OBSIDIAN_VAULT, "Resources/Notes");

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
