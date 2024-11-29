"use client";

import { TodayILearnedSummary } from "./today-i-learned-summary";
import { Header } from "@/components/content/header";
import { Tags } from "@/components/content/tags";
import { determineTags, filterByTag } from "@/data/tags";
import { useCurrentTag } from "@/hooks/use-current-tag";
import type { TodayILearned } from "@/types";
import { useMemo } from "react";

type TodayILearnedSummariesProps = {
  todayILearneds: TodayILearned[];
};

export function TodayILearnedSummaries({ todayILearneds }: TodayILearnedSummariesProps) {
  const technologies = useMemo(() => determineTags(todayILearneds, "technology"), [todayILearneds]);
  const [currentTechnology] = useCurrentTag("technology", technologies);
  const filteredTodayILearneds = useMemo(
    () => filterByTag(todayILearneds, "technology", currentTechnology),
    [todayILearneds, currentTechnology],
  );

  return (
    <>
      <Header
        title="Today I Learned"
        subText="Langague and framework tips and tricks I've learned while coding"
      >
        <Tags type="technology" values={technologies} />
      </Header>
      <section className="my-8">
        {filteredTodayILearneds.map((todayILearned) => (
          <TodayILearnedSummary key={todayILearned.slug} todayILearned={todayILearned} />
        ))}
      </section>
    </>
  );
}
