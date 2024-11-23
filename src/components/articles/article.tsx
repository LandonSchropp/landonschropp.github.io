import { FormattedDate } from "../base/formatted-date";
import { Header } from "../content/header";
import { Markdown } from "../content/markdown";
import type { Article as ArticleType } from "@/types";
import React from "react";

type AticleProps = {
  article: ArticleType;
};

export function Article({ article }: AticleProps) {
  return (
    <article>
      <Header
        title={article.title}
        href={`/articles/${article.slug}`}
        subText={
          <>
            <span rel="author">Landon Schropp</span> • <FormattedDate date={article.date} />
          </>
        }
      />

      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Using markdown compiled to HTML. */}
      <Markdown markdown={article.markdown} />
    </article>
  );
}
