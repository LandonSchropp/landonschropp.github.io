import { fetchDatabasePages, fetchPageHtml } from "./notion";
import { Content, ContentSummary } from "@/types";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { sortBy } from "remeda";

export async function fetchContentSummaries<T extends ContentSummary>(
  databaseId: string,
  pageObjectResponseToContentSummary: (page: PageObjectResponse) => T,
): Promise<T[]> {
  const objects = (await fetchDatabasePages(databaseId))
    .map(pageObjectResponseToContentSummary)
    .filter((object) => process.env.NODE_ENV === "development" || object.published);

  return sortBy(objects, (object) => -object.date.getTime());
}

export async function fetchContent<T extends ContentSummary>(
  databaseId: string,
  pageObjectResponseToContentSummary: (page: PageObjectResponse) => T,
  slug: string,
): Promise<T & Content> {
  const contentSummaries = await fetchContentSummaries(
    databaseId,
    pageObjectResponseToContentSummary,
  );

  const contentSummary = contentSummaries.find((contentSummary) => contentSummary.slug === slug);

  if (!contentSummary) {
    throw new Error(`Page with slug "${slug}" not found`);
  }

  return {
    ...contentSummary,
    content: await fetchPageHtml(contentSummary.id),
  };
}
