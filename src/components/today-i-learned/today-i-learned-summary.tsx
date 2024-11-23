import { FormattedDate } from "../base/formatted-date";
import { Summary } from "@/components/content/summary";
import type { TodayILearned } from "@/types";

type TodayILearnedSummaryProps = {
  todayILearned: TodayILearned;
};

export function TodayILearnedSummary({ todayILearned }: TodayILearnedSummaryProps) {
  return (
    <Summary
      url={`/today-i-learned/${todayILearned.slug}`}
      title={todayILearned.title}
      tag={todayILearned.technology}
      tagAttribute="technology"
    >
      <FormattedDate date={todayILearned.date} />
    </Summary>
  );
}
