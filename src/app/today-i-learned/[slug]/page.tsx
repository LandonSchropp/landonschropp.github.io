import { TodayILearned } from "@/components/today-i-learned/today-i-learned";
import { fetchTodayILearnedSummaries, fetchTodayILearned } from "@/data/today-i-learned";
import { Metadata } from "next";

export async function generateStaticParams() {
  return (await fetchTodayILearnedSummaries()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: TodayILearnedPageProps): Promise<Metadata> {
  const todayILearned = await fetchTodayILearned(slug);

  return {
    title: todayILearned.title,
    description: `Landon Schropp's TIL on ${todayILearned.title}`,
    authors: [{ name: "Landon Schropp" }],
  };
}

type TodayILearnedPageProps = {
  params: {
    slug: string;
  };
};

export default async function TodayILearnedPage({ params: { slug } }: TodayILearnedPageProps) {
  return <TodayILearned todayILearned={await fetchTodayILearned(slug)} />;
}
