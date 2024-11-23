"use client";

import { NoteSummary } from "./note-summary";
import { Header } from "@/components/content/header";
import { Tags } from "@/components/content/tags";
import { OTHER_CATEGORY, CHESS_CATEGORY, CATEGORIES } from "@/constants";
import { useCurrentTag } from "@/hooks/use-current-tag";
import type { Note } from "@/types";

const CATEGORIES_WITHOUT_CHESS = CATEGORIES.filter((category) => category !== CHESS_CATEGORY);

function noteSummaryMatchesCategory(noteSummary: Note, category: string | null) {
  // NOTE: I'm using includes here to accommodate the `Live Talk` category, which should be included
  // by `Talk`.
  return (
    category === null ||
    (category === OTHER_CATEGORY && noteSummary.category === CHESS_CATEGORY) ||
    noteSummary.category.includes(category)
  );
}

type NoteSummariesProps = {
  noteSummaries: Note[];
};

export function NoteSummaries({ noteSummaries }: NoteSummariesProps) {
  const [category] = useCurrentTag("category", CATEGORIES_WITHOUT_CHESS);

  const filteredNoteSummaries = noteSummaries
    .filter((noteSummary) => noteSummaryMatchesCategory(noteSummary, category))
    .map((noteSummary) => <NoteSummary key={noteSummary.slug} note={noteSummary} />);

  return (
    <>
      <Header
        title="Notes"
        subText="My personal notes on books, articles, talks, podcasts and more."
      >
        <Tags type="category" values={CATEGORIES_WITHOUT_CHESS} />
      </Header>
      <section className="my-8">{filteredNoteSummaries}</section>
    </>
  );
}
