import { fetchArticle, fetchArticles } from "@/data/articles";
import { extractImageSlugPairs } from "@/data/content";
import { downloadImage } from "@/data/image";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const articles = await fetchArticles();
  return extractImageSlugPairs(articles);
}

type ImagePageProps = {
  params: Promise<{ slug: string; image: string }>;
};

export async function GET(_request: Request, props: ImagePageProps) {
  const params = await props.params;
  const article = await fetchArticle(params.slug);
  return downloadImage(article, params.image);
}
