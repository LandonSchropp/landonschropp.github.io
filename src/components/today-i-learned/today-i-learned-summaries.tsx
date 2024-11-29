"use client";

import { TodayILearnedSummary } from "./today-i-learned-summary";
import { Header } from "@/components/content/header";
import { Tags } from "@/components/content/tags";
import { JAVASCRIPT_TECHNOLOGY, TYPESCRIPT_TECHNOLOGY } from "@/constants";
import { determineTags, filterByTag } from "@/data/tags";
import { useCurrentTag } from "@/hooks/use-current-tag";
import type { TodayILearned } from "@/types";
import { useMemo } from "react";

const TYPESCRIPT_JAVASCRIPT_TECHNOLOGY = `${TYPESCRIPT_TECHNOLOGY} / ${JAVASCRIPT_TECHNOLOGY}`;

function transformTodayILearnedTag(todayILearned: TodayILearned) {
  if ([TYPESCRIPT_TECHNOLOGY, JAVASCRIPT_TECHNOLOGY].includes(todayILearned.technology)) {
    return TYPESCRIPT_JAVASCRIPT_TECHNOLOGY;
  }

  return todayILearned.technology;
}

type TodayILearnedSummariesProps = {
  todayILearneds: TodayILearned[];
};

export function TodayILearnedSummaries({ todayILearneds }: TodayILearnedSummariesProps) {
  const tags = useMemo(
    () => determineTags(todayILearneds, transformTodayILearnedTag),
    [todayILearneds],
  );

  const [currentTag] = useCurrentTag("technology", tags);

  const filteredTodayILearneds = useMemo(
    () => filterByTag(todayILearneds, transformTodayILearnedTag, currentTag),
    [todayILearneds, currentTag],
  );

  return (
    <>
      <Header
        title="Today I Learned"
        subText="Langague and framework tips and tricks I've learned while coding"
      >
        <Tags type="technology" values={tags} />
      </Header>
      <section className="my-8">
        {filteredTodayILearneds.map((todayILearned) => (
          <TodayILearnedSummary key={todayILearned.slug} todayILearned={todayILearned} />
        ))}
      </section>
    </>
  );
}
