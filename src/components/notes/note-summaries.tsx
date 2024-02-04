"use client";

import { NoteSummary } from "./note-summary";
import { Header } from "@/components/content/header";
import { Tags } from "@/components/content/tags";
import { OTHER_CATEGORY, CHESS_CATEGORY } from "@/constants";
import { useCurrentCategory } from "@/hooks/use-current-category";
import type { NoteSummary as NoteSummaryType } from "@/types";

function noteSummaryMatchesCategory(noteSummary: NoteSummaryType, category: string | null) {
  // NOTE: I'm using includes here to accommodate the `Live Talk` category, which should be included
  // by `Talk`.
  return (
    category === null ||
    (category === OTHER_CATEGORY && noteSummary.category === CHESS_CATEGORY) ||
    noteSummary.category.includes(category)
  );
}

type NoteSummariesProps = {
  noteSummaries: NoteSummaryType[];
};

export function NoteSummaries({ noteSummaries }: NoteSummariesProps) {
  const [category] = useCurrentCategory();

  const filteredNotes = noteSummaries.filter((noteSummary) =>
    noteSummaryMatchesCategory(noteSummary, category),
  );

  return (
    <>
      <Header
        title="Notes"
        subText="My personal notes on books, articles, talks, podcasts and more."
      >
        <Tags />
      </Header>
      <section className="my-8">
        {filteredNotes.map((note) => (
          <NoteSummary key={note.slug} note={note} />
        ))}
      </section>
    </>
  );
}
