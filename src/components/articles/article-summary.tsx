import tailwindConfig from "../../../tailwind.config";
import { Summary } from "../content/summary";
import type { Article } from "@/types";
import React from "react";
import { isNil } from "remeda";

const CORNFLOWER = tailwindConfig.theme.colors.cornflower;
const BITTERSWEET = tailwindConfig.theme.colors.bittersweet;

type ArticleSummaryProps = {
  articleSummary: Article;
  index: number;
  numberOfArticles: number;
};

export function ArticleSummary({ articleSummary, index, numberOfArticles }: ArticleSummaryProps) {
  const href = isNil(articleSummary.url) ? `/articles/${articleSummary.slug}` : articleSummary.url;

  const percent = `${(index / (numberOfArticles - 1)) * 100}%`;
  const style = {
    borderColor: `color-mix(in oklab, ${BITTERSWEET} ${percent}, ${CORNFLOWER})`,
  };

  return (
    <Summary title={articleSummary.title} url={href} style={style}>
      {articleSummary.description}
    </Summary>
  );
}
