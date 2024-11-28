import { fetchContent, fetchContents } from "./content";
import { assertArticle, assertArticles } from "@/assertions";
import { ARTICLES_PATH } from "@/env";
import { Article } from "@/types";

/**
 * Fetches all articles.
 * @returns An array of articles.
 */
export async function fetchArticles(): Promise<Article[]> {
  const articles = await fetchContents(ARTICLES_PATH);
  assertArticles(articles);
  return articles;
}

/**
 * Fetches a single article.
 * @param slug The slug of the article.
 * @returns The article with the provided slug.
 */
export async function fetchArticle(slug: string): Promise<Article> {
  const article = await fetchContent(ARTICLES_PATH, slug);
  assertArticle(article);
  return article;
}
