import { assertArticleSummary } from "../type-guards";
import type { Article, ArticleSummary } from "../types";
import { fetchContentSummaries, fetchContent } from "./content";
import { optionalValue } from "./notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const ARTICLES_DATABASE_ID = "c68575f91f534048bb15c54f0f230882";

function pageObjectResponseToArticleSummary(page: PageObjectResponse): ArticleSummary {
  const article = {
    id: page.id,
    title: optionalValue(page, "Title", "title"),
    slug: optionalValue(page, "Slug", "rich_text"),
    date: optionalValue(page, "Date", "date"),
    description: optionalValue(page, "Description", "rich_text"),
    url: optionalValue(page, "URL", "url") ?? null,
    publisher: optionalValue(page, "Publisher", "select") ?? null,
    published: optionalValue(page, "Published", "checkbox"),
  };

  assertArticleSummary(article);

  return article;
}

export async function fetchArticleSummaries(): Promise<ArticleSummary[]> {
  return await fetchContentSummaries(ARTICLES_DATABASE_ID, pageObjectResponseToArticleSummary);
}

export async function fetchArticle(slug: string): Promise<Article> {
  return await fetchContent(ARTICLES_DATABASE_ID, pageObjectResponseToArticleSummary, slug);
}
