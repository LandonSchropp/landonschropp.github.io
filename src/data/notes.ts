import { assertNoteSummary } from "../type-guards";
import type { Note, NoteSummary } from "../types";
import { fetchDatabasePages, fetchPageHtml, optionalValue } from "./notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const NOTES_DATABASE_ID = "da4f9ded813b424e83e5f552b1f41a3e";

function pageObjectResponseToNote(page: PageObjectResponse): NoteSummary {
  const note = {
    id: page.id,
    title: optionalValue(page, "Title", "title"),
    slug: optionalValue(page, "Slug", "rich_text"),
    authors: optionalValue(page, "Authors", "rich_text")?.split(/\s*,\s*/) ?? [],
    date: optionalValue(page, "Date", "date"),
    category: optionalValue(page, "Category", "select"),
    media: optionalValue(page, "Media", "select"),
    source: optionalValue(page, "Source", "rich_text"),
    url: optionalValue(page, "URL", "url"),
    published: optionalValue(page, "Published", "checkbox"),
  };

  assertNoteSummary(note);

  return note;
}

export async function fetchNoteSummaries(): Promise<NoteSummary[]> {
  return (await fetchDatabasePages(NOTES_DATABASE_ID))
    .map(pageObjectResponseToNote)
    .filter((note) => process.env.NODE_ENV === "development" || note.published);
}

export async function fetchNote(slug: string): Promise<Note> {
  let noteSummary = (await fetchNoteSummaries()).find((note) => note.slug === slug);

  if (!noteSummary) {
    throw new Error(`Note with slug "${slug}" not found`);
  }

  return {
    ...noteSummary,
    content: await fetchPageHtml(noteSummary.id),
  };
}
