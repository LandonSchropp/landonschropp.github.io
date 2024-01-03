"use client";

import type { ArticleSummary as ArticleSummaryType } from "../types";

import { Header } from "../components/header";
import { ArticleSummary } from "./article-summary";
import { Callout } from "./callout";

type ArticleSummariesProps = {
  articleSummaries: ArticleSummaryType[];
};

export function ArticleSummaries({ articleSummaries }: ArticleSummariesProps) {
  return (
    <>
      <Header
        title="Writing"
        subText={<>Here are my published articles from all over the web.</>}
      />

      <Callout>
        In 2015 I wrote the book <a href="https://unravelingflexbox.com">Unraveling Flexbox</a>, the
        ultimate guide to building modern CSS layouts with flexbox.
      </Callout>

      <section className="note-summaries">
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
