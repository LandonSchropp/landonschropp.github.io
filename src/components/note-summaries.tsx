"use client";

import { Header } from "../components/header";
import { CHESS_CATEGORY, OTHER_CATEGORY } from "../constants";
import { useCategoryFilter } from "../hooks/use-category-filter";
import type { NoteSummary as NoteSummaryType } from "../types";
import { NoteSummary } from "./note-summary";
import { Tags } from "./tags";
import { isNil } from "remeda";

type NoteSummariesProps = {
  noteSummaries: NoteSummaryType[];
};

export function NoteSummaries({ noteSummaries }: NoteSummariesProps) {
  const [category] = useCategoryFilter();

  // Filter the notes if a category is selected.
  // NOTE: I'm using includes here to accommodate the `Live Talk` category, which should be included
  // by `Talk`.
  const filteredNotes = isNil(category)
    ? noteSummaries
    : noteSummaries.filter((note) => {
        return (
          (category === OTHER_CATEGORY && note.category === CHESS_CATEGORY) ||
          note.category.includes(category)
        );
      });

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
