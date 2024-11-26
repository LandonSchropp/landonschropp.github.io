"use client";

import { ArticleSummary } from "@/components/articles/article-summary";
import { Header } from "@/components/content/header";
import type { Article } from "@/types";

type ArticleSummariesProps = {
  articleSummaries: Article[];
};

export function ArticleSummaries({ articleSummaries }: ArticleSummariesProps) {
  return (
    <>
      <Header title="Writing" subText="My published articles from all over the web." />

      <section>
        {articleSummaries.map((articleSummary, index) => {
          return (
            <ArticleSummary
              key={articleSummary.slug}
              articleSummary={articleSummary}
              index={index}
              numberOfArticles={articleSummaries.length}
            />
          );
        })}
      </section>
    </>
  );
}
