import { Article } from "@/components/articles/article";
import { NAME } from "@/constants";
import { fetchArticles, fetchArticle } from "@/data/articles";
import { Metadata } from "next";

export async function generateStaticParams() {
  return (await fetchArticles()).filter((article) => !article.url).map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: ArticlePageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await fetchArticle(slug);

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: NAME }],
  };
}

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage(props: ArticlePageProps) {
  const { slug } = await props.params;
  return <Article article={await fetchArticle(slug)} />;
}
