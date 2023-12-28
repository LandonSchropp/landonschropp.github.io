import { Client, collectPaginatedAPI, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";

const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;
const NOTES_DATABASE_ID = "da4f9ded813b424e83e5f552b1f41a3e";

if (!NOTION_API_TOKEN) {
  throw new Error("You must set the NOTION_API_TOKEN environment variable.");
}

const notion = new Client({ auth: NOTION_API_TOKEN });
const notionToMarkdown = new NotionToMarkdown({ notionClient: notion });

type NoteWithoutContent = {
  id: string;
  title: string;
  slug: string;
  authors: string[];
  date: Date;
  category: string;
  media: string;
  source: string;
  url: string;
  published: boolean;
};

export interface NoteWithContent extends NoteWithoutContent {
  content: string;
}

export function pageObjectResponseToNote(page: PageObjectResponse): NoteWithoutContent {
  if (
    page.properties.Title?.type !== "title" ||
    page.properties.Slug?.type !== "rich_text" ||
    page.properties.Authors?.type !== "rich_text" ||
    page.properties.Date?.type !== "date" ||
    page.properties.Category?.type !== "select" ||
    page.properties.Media?.type !== "select" ||
    page.properties.Source?.type !== "rich_text" ||
    page.properties.URL?.type !== "url" ||
    page.properties.Published?.type !== "checkbox"
  ) {
    throw new Error("The notes database schema differs from the expected schema.");
  }

  const note = {
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text,
    slug: page.properties.Slug.rich_text[0]?.plain_text,
    authors: page.properties.Authors.rich_text[0]?.plain_text.split(/\s*,\s*/) ?? [],
    date: page.properties.Date.date ? new Date(page.properties.Date.date.start) : undefined,
    category: page.properties.Category.select?.name,
    media: page.properties.Media.select?.name,
    source: page.properties.Source.rich_text[0]?.plain_text,
    url: page.properties.URL.url ?? undefined,
    published: page.properties.Published.checkbox,
  };

  for (const [key, value] of Object.entries(note)) {
    if (value === undefined) {
      throw new Error(`The downloaded note '${note.id}' is missing the '${key}' property.`);
    }
  }

  return note as NoteWithoutContent;
}

export async function fetchNotes(): Promise<NoteWithoutContent[]> {
  return (await collectPaginatedAPI(notion.databases.query, { database_id: NOTES_DATABASE_ID }))
    .filter(isFullPage)
    .map(pageObjectResponseToNote);
}

export async function fetchNote(slug: string): Promise<NoteWithContent> {
  const response = await notion.databases.query({
    database_id: NOTES_DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = response.results[0]!;

  if (response.results.length !== 1 || !isFullPage(page)) {
    throw new Error(`The note with slug '${slug}' does not exist.`);
  }

  const note = pageObjectResponseToNote(page);
  const content = notionToMarkdown.toMarkdownString(
    await notionToMarkdown.pageToMarkdown(page.id),
  ).parent;

  if (content === undefined) {
    throw new Error(`The note with slug '${slug}' does not have any content.`);
  }

  return { ...note, content };
}
