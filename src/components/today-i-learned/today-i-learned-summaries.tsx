"use client";

import { TodayILearnedSummary } from "./today-i-learned-summary";
import { Header } from "@/components/content/header";
import { Tags } from "@/components/content/tags";
import { TECHNOLOGIES } from "@/constants";
import { useCurrentTag } from "@/hooks/use-current-tag";
import type { TodayILearned } from "@/types";
import { isNil } from "remeda";

type TodayILearnedSummariesProps = {
  todayILearnedSummaries: TodayILearned[];
};

export function TodayILearnedSummaries({ todayILearnedSummaries }: TodayILearnedSummariesProps) {
  const [currentTechnology] = useCurrentTag("technology", TECHNOLOGIES);

  // Filter the todayILearneds if a technology is selected.
  const filteredTodayILearneds = isNil(currentTechnology)
    ? todayILearnedSummaries
    : todayILearnedSummaries.filter(({ technology }) => technology === currentTechnology);

  return (
    <>
      <Header
        title="Today I Learned"
        subText="Langague and framework tips and tricks I've learned while coding"
      >
        <Tags type="technology" values={TECHNOLOGIES} />
      </Header>
      <section className="my-8">
        {filteredTodayILearneds.map((todayILearned) => (
          <TodayILearnedSummary key={todayILearned.slug} todayILearned={todayILearned} />
        ))}
      </section>
    </>
  );
}
