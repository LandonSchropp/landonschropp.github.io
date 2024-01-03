import type { Article as ArticleType } from "../types";
import { Header } from "./header";
import { format, formatISO } from "date-fns";
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
            <span rel="author">Landon Schropp</span> •{" "}
            <time dateTime={formatISO(article.date, { representation: "date" })}>
              {format(article.date, "PPP")}
            </time>
          </>
        }
      />

      <section dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}
