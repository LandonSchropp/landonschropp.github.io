import { ArticleSummaries } from "@/components/article-summaries";
import { fetchArticleSummaries } from "@/data/articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landon Schropp - Writing",
  description: "My published writing from all over the web.",
};

export default async function ArticlesPage() {
  let articleSummaries = await fetchArticleSummaries();
  return <ArticleSummaries articleSummaries={articleSummaries} />;
}
