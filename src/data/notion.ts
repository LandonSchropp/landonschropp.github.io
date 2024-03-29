import { markdownToHtml } from "../utilities/markdown";
import { downloadFile } from "./download";
import { Client, collectPaginatedAPI, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import NodeFetchCache, { FileSystemCache } from "node-fetch-cache";
import { NotionToMarkdown } from "notion-to-md";
import { fromPairs } from "remeda";

const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;

if (!NOTION_API_TOKEN) {
  throw new Error("You must set the NOTION_API_TOKEN environment variable.");
}

// A function that implements the same API as fetch but caches requests to the disk.
const fetch = NodeFetchCache.create({
  cache: new FileSystemCache({
    cacheDirectory: "cache",
    ttl: 1000 * 60 * 60 * 24,
  }),
});

const notion = new Client({ auth: NOTION_API_TOKEN, fetch });
const notionToMarkdown = new NotionToMarkdown({ notionClient: notion });

export function optionalValue(
  page: PageObjectResponse,
  name: string,
  type: "title" | "rich_text" | "select" | "url",
): string | undefined;

export function optionalValue(
  page: PageObjectResponse,
  name: string,
  type: "date",
): Date | undefined;

export function optionalValue(page: PageObjectResponse, name: string, type: "checkbox"): boolean;

export function optionalValue(page: PageObjectResponse, name: string, type: string) {
  const property = page.properties[name];

  if (property === undefined) {
    throw new Error(`The page '${page.id}' is missing the '${name}' property.`);
  }

  if (property.type !== type) {
    throw new Error(
      `The page '${page.id}' has a '${name}' property of type '${property.type}' instead of the ` +
        `expected type '${type}'.`,
    );
  }

  if (property.type === "title") {
    return property.title[0]?.plain_text;
  }

  if (property.type === "rich_text") {
    return property.rich_text[0]?.plain_text;
  }

  if (property.type === "date") {
    return property.date ? new Date(property.date.start) : undefined;
  }

  if (property.type === "select") {
    return property.select?.name;
  }

  if (property.type === "url") {
    return property.url ?? undefined;
  }

  if (property.type === "checkbox") {
    return property.checkbox;
  }

  throw new Error(
    `The page '${page.id}' has a '${name}' property of type '${property.type}', which is unsupported.`,
  );
}

export async function fetchDatabasePages(databaseId: string): Promise<PageObjectResponse[]> {
  return (await collectPaginatedAPI(notion.databases.query, { database_id: databaseId })).filter(
    isFullPage,
  );
}

export async function fetchPageMarkdown(id: string): Promise<string> {
  const content = notionToMarkdown.toMarkdownString(
    await notionToMarkdown.pageToMarkdown(id),
  ).parent;

  if (content === undefined) {
    throw new Error(`The downloaded note '${id}' is missing its content.`);
  }

  return content;
}

const IMAGE_REGEX = /(?<=!\[.*?\]\().*?(?=\))/g;

/**
 * Downloads all the images in the markdown and stores them in the `public` folder.
 */
export async function downloadImages(markdown: string): Promise<string> {
  // Download the images and generate a map of the URLs to the image names.
  const filePaths = fromPairs(
    await Promise.all(
      Array.from(markdown.matchAll(IMAGE_REGEX)).map(async ([url]) => {
        return [url, await downloadFile(url)];
      }),
    ),
  );

  // Replace the URLs in the markdown file with their new file paths.
  return markdown.replaceAll(IMAGE_REGEX, (url) => filePaths[url]);
}

/**
 * Fetches the HTML for a Notion page, downloading any references images along the way.
 */
export async function fetchPageHtml(databaseID: string): Promise<string> {
  const markdown = await downloadImages(await fetchPageMarkdown(databaseID));

  const html = markdownToHtml(markdown);

  return html;
}
