import { TodayILearned } from "@/components/today-i-learned/today-i-learned";
import { NAME } from "@/constants";
import { fetchTodayILearnedSummaries, fetchTodayILearned } from "@/data/today-i-learned";
import { Metadata } from "next";

export async function generateStaticParams() {
  return (await fetchTodayILearnedSummaries()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: TodayILearnedPageProps): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  const todayILearned = await fetchTodayILearned(slug);

  return {
    title: todayILearned.title,
    description: `${NAME}'s TIL on ${todayILearned.title}`,
    authors: [{ name: NAME }],
  };
}

type TodayILearnedPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TodayILearnedPage(props: TodayILearnedPageProps) {
  const params = await props.params;

  const { slug } = params;

  return <TodayILearned todayILearned={await fetchTodayILearned(slug)} />;
}
