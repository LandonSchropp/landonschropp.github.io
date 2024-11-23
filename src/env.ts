import { join } from "path";

if (typeof process.env.OBSIDIAN_VAULT !== "string") {
  throw new Error("The OBSIDIAN_VAULT environment variable must be set.");
}

/** The path to the Obsidian vault. */
export const OBSIDIAN_VAULT = process.env.OBSIDIAN_VAULT;

/** The path to the notes directory in the Obsidian vault. */
export const NOTES_PATH = join(OBSIDIAN_VAULT, "Resources/Notes");

/** The path to the notes directory in the Obsidian vault. */
export const ARTICLES_PATH = join(OBSIDIAN_VAULT, "Resources/Articles");
