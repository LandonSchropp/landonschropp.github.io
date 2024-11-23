"use client";

import { ArticleSummary } from "@/components/articles/article-summary";
import { Callout } from "@/components/articles/callout";
import { Header } from "@/components/content/header";
import type { Article } from "@/types";

type ArticleSummariesProps = {
  articleSummaries: Article[];
};

export function ArticleSummaries({ articleSummaries }: ArticleSummariesProps) {
  return (
    <>
      <Header title="Writing" subText="My published articles from all over the web." />

      <Callout>
        In 2015 I wrote the book <a href="https://unravelingflexbox.com">Unraveling Flexbox</a>, the
        ultimate guide to building modern CSS layouts with flexbox.
      </Callout>

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
