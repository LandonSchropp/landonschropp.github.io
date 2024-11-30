"use client";

import { TodayILearnedSummary } from "./today-i-learned-summary";
import { Header } from "@/components/content/header";
import { Tags } from "@/components/content/tags";
import { TECHNOLOGIES } from "@/constants";
import { filterByTag } from "@/data/tags";
import { useCurrentTag } from "@/hooks/use-current-tag";
import type { TodayILearned } from "@/types";
import { useMemo } from "react";

type TodayILearnedSummariesProps = {
  todayILearneds: TodayILearned[];
};

export function TodayILearnedSummaries({ todayILearneds }: TodayILearnedSummariesProps) {
  const [currentTechnology] = useCurrentTag("technology", TECHNOLOGIES);
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
