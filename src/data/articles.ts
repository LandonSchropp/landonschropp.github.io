import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Article, ArticleSummary } from "../types";
import { fetchDatabasePages, fetchPageHtml, optionalValue } from "./notion";
import { assertArticleSummary } from "../type-guards";

const articleS_DATABASE_ID = "c68575f91f534048bb15c54f0f230882";

function pageObjectResponseToArticle(page: PageObjectResponse): ArticleSummary {
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
  return (await fetchDatabasePages(articleS_DATABASE_ID))
    .map(pageObjectResponseToArticle)
    .filter((article) => process.env.NODE_ENV === "development" || article.published);
}

export async function fetchArticle(slug: string): Promise<Article> {
  let articleSummary = (await fetchArticleSummaries()).find((article) => article.slug === slug);

  if (!articleSummary) {
    throw new Error(`Article with slug "${slug}" not found`);
  }

  return {
    ...articleSummary,
    content: await fetchPageHtml(articleSummary.id),
  };
}
