import React, { CSSProperties } from "react";
import type { ArticleSummary as ArticleSummaryType } from "../types";
import { isNil } from "remeda";
import tailwindConfig from "../../tailwind.config";
import { Summary } from "./summary";

const CORNFLOWER = tailwindConfig.theme.colors.cornflower;
const BITTERSWEET = tailwindConfig.theme.colors.bittersweet;

type ArticleSummaryProps = {
  articleSummary: ArticleSummaryType;
  index: number;
  numberOfArticles: number;
};

export function ArticleSummary({ articleSummary, index, numberOfArticles }: ArticleSummaryProps) {
  let href = isNil(articleSummary.url) ? `/articles/${articleSummary.slug}` : articleSummary.url;

  let percent = `${(index / (numberOfArticles - 1)) * 100}%`;
  let style = { borderColor: `color-mix(in oklab, ${BITTERSWEET} ${percent}, ${CORNFLOWER})` };

  return (
    <Summary title={articleSummary.title} url={href} style={style}>
      {articleSummary.description}
    </Summary>
  );
}
