import { extractImageSlugPairs } from "@/data/content";
import { downloadImage } from "@/data/image";
import { fetchTodayILearned, fetchTodayILearneds } from "@/data/today-i-learned";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const todayILearneds = await fetchTodayILearneds();
  return extractImageSlugPairs(todayILearneds);
}

type ImagePageProps = {
  params: Promise<{ slug: string; image: string }>;
};

export async function GET(_request: Request, props: ImagePageProps) {
  const params = await props.params;
  const todayILearned = await fetchTodayILearned(params.slug);
  return downloadImage(todayILearned, params.image);
}
