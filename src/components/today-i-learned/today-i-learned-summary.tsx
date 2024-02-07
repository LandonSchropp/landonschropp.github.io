import { FormattedDate } from "../base/formatted-date";
import { Summary } from "@/components/content/summary";
import type { TodayILearnedSummary as TodayILearnedSummaryType } from "@/types";

type TodayILearnedSummaryProps = {
  todayILearned: TodayILearnedSummaryType;
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
