import tailwindConfig from "../../../tailwind.config";
import { Summary } from "../content/summary";
import { Icon } from "@/components/base/icon";
import type { Article } from "@/types";
import { isNullish } from "remeda";

const CORNFLOWER = tailwindConfig.theme.colors.cornflower;
const BITTERSWEET = tailwindConfig.theme.colors.bittersweet;

type ArticleSummaryProps = {
  article: Article;
  index: number;
  numberOfArticles: number;
};

export function ArticleSummary({ article, index, numberOfArticles }: ArticleSummaryProps) {
  const href = isNullish(article.url) ? `/articles/${article.slug}` : article.url;

  const percent = `${(index / (numberOfArticles - 1)) * 100}%`;
  const style = {
    borderColor: `color-mix(in oklab, ${BITTERSWEET} ${percent}, ${CORNFLOWER})`,
  };

  const linkIcon = article.publisher ? (
    <Icon
      className="relative top-[-0.1em] h-[0.85em] w-[0.85em] align-baseline"
      name="externalLink"
      alt={`Published on ${article.publisher}`}
    />
  ) : null;

  return (
    <Summary
      title={
        <>
          {article.title} {linkIcon}
        </>
      }
      url={href}
      style={style}
    >
      {article.description}
    </Summary>
  );
}
