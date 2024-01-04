import { Article } from "@/components/article";
import { fetchArticleSummaries, fetchArticle } from "@/data/articles";
import { Metadata } from "next";

export async function generateStaticParams() {
  return (await fetchArticleSummaries())
    .filter((article) => !article.url)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: ArticlePageProps): Promise<Metadata> {
  const article = await fetchArticle(slug);

  return {
    title: `Landon Schropp -  ${article.title}`,
    description: article.description,
  };
}

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export default async function ArticlePage({ params: { slug } }: ArticlePageProps) {
  return <Article article={await fetchArticle(slug)} />;
}
