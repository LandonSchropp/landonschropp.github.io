import { ArticleSummaries } from "@/components/articles/article-summaries";
import { fetchArticles } from "@/data/articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description: "My published writing from all over the web.",
};

export default async function ArticlesPage() {
  const articles = await fetchArticles();
  return <ArticleSummaries articles={articles} />;
}
