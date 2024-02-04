"use client";

import { TodayILearnedSummary } from "./today-i-learned-summary";
import { Header } from "@/components/content/header";
import { Tags } from "@/components/content/tags";
import { TECHNOLOGIES } from "@/constants";
import { useCurrentTag } from "@/hooks/use-current-tag";
import type { TodayILearnedSummary as TodayILearnedSummaryType } from "@/types";
import { equals, isNil } from "remeda";

type TodayILearnedSummariesProps = {
  todayILearnedSummaries: TodayILearnedSummaryType[];
};

export function TodayILearnedSummaries({ todayILearnedSummaries }: TodayILearnedSummariesProps) {
  const [technology] = useCurrentTag("technology", TECHNOLOGIES);

  // Filter the todayILearneds if a technology is selected.
  const filteredTodayILearneds = isNil(technology)
    ? todayILearnedSummaries
    : todayILearnedSummaries.filter(equals(technology));

  return (
    <>
      <Header
        title="Today I Learned"
        subText="Quick tips and tricks I've learned from day-to-day coding"
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
