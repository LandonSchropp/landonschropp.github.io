import { FormattedDate } from "../base/formatted-date";
import { Summary } from "@/components/content/summary";
import type { TodayILearnedSummary as TodayILearnedSummaryType } from "@/types";

type TodayILearnedSummaryProps = {
  todayILearned: TodayILearnedSummaryType;
};

export function TodayILearnedSummary({ todayILearned }: TodayILearnedSummaryProps) {
  return (
    <Summary url={`/todayILearneds/${todayILearned.slug}`} title={todayILearned.title}>
      <FormattedDate date={todayILearned.date} />
    </Summary>
  );
}
