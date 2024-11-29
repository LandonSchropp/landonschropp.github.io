import { TodayILearnedSummaries } from "@/components/today-i-learned/today-i-learned-summaries";
import { fetchTodayILearneds } from "@/data/today-i-learned";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today I Learned",
  description: "Langague and framework tips and tricks I've learned while coding",
};

export default async function TodayILearnedsPage() {
  const todayILearneds = await fetchTodayILearneds();
  return <TodayILearnedSummaries todayILearneds={todayILearneds} />;
}
