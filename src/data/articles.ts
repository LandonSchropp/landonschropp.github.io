import { fetchContent, fetchContents } from "./content";
import { ARTICLES_PATH } from "@/env";
import { parseArticle } from "@/schema";
import { Article } from "@/types";

/**
 * Fetches all articles.
 * @returns An array of articles.
 */
export async function fetchArticles(): Promise<Article[]> {
  return (await fetchContents(ARTICLES_PATH)).map(parseArticle);
}

/**
 * Fetches a single article.
 * @param slug The slug of the article.
 * @returns The article with the provided slug.
 */
export async function fetchArticle(slug: string): Promise<Article> {
  return parseArticle(await fetchContent(ARTICLES_PATH, slug));
}
