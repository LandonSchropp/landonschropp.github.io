"use client";

import { Markdown } from "../content/markdown";
import { TodayILearnedHeader } from "@/components/today-i-learned/today-i-learned-header";
import { useTechnology } from "@/hooks/use-technology";
import type { TodayILearned as TodayILearnedType } from "@/types";
import { useEffect } from "react";

type TodayILearnedProps = {
  todayILearned: TodayILearnedType;
};

export function TodayILearned({ todayILearned }: TodayILearnedProps) {
  const [, setTechnology] = useTechnology();
  useEffect(
    () => setTechnology(todayILearned.technology),
    [todayILearned.technology, setTechnology],
  );

  return (
    <article className="my-6" data-technology={todayILearned.technology}>
      <TodayILearnedHeader todayILearned={todayILearned} />
      <Markdown markdown={todayILearned.markdown} slug={todayILearned.slug} />
    </article>
  );
}
