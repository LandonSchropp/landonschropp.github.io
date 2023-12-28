import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NoteSummary } from "../types";
import { fetchDatabasePages, optionalValue } from "./notion";

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

  for (const [key, value] of Object.entries(note)) {
    if (value === undefined) {
      throw new Error(`The downloaded note '${note.id}' is missing the '${key}' property.`);
    }
  }

  return note as NoteSummary;
}

export async function fetchNoteSummaries(): Promise<NoteSummary[]> {
  return (await fetchDatabasePages(NOTES_DATABASE_ID)).map(pageObjectResponseToNote);
}
