import { Article } from "@/components/articles/article";
import { fetchArticleSummaries, fetchArticle } from "@/data/articles";
import { Metadata } from "next";

export async function generateStaticParams() {
  return (await fetchArticleSummaries())
    .filter((article) => !article.url)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: ArticlePageProps): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  const article = await fetchArticle(slug);

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: "Landon Schropp" }],
  };
}

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage(props: ArticlePageProps) {
  const params = await props.params;

  const { slug } = params;

  return <Article article={await fetchArticle(slug)} />;
}
