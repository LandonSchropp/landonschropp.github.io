import { Article } from "@/components/articles/article";
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
    title: article.title,
    description: article.description,
    authors: [{ name: "Landon Schropp" }],
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
