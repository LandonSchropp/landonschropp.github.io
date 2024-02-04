import { FormattedDate } from "../base/formatted-date";
import { Header } from "../content/header";
import { TodayILearned } from "@/types";

type TodayILearnedHeaderProps = {
  todayILearned: TodayILearned;
};

export function TodayILearnedHeader({ todayILearned }: TodayILearnedHeaderProps) {
  return (
    <Header
      superText="Today I Learned"
      title={todayILearned.title}
      subText={
        <>
          <span rel="author">Landon Schropp</span> • <FormattedDate date={todayILearned.date} />
        </>
      }
    />
  );
}
