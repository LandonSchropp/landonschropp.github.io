import { ArticleSummaries } from "@/components/article-summaries";
import { fetchArticleSummaries } from "@/data/articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description: "My published writing from all over the web.",
};

export default async function ArticlesPage() {
  const articleSummaries = await fetchArticleSummaries();
  return <ArticleSummaries articleSummaries={articleSummaries} />;
}
