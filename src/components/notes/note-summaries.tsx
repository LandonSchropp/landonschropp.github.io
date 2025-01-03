"use client";

import { NoteSummary } from "./note-summary";
import { Header } from "@/components/content/header";
import { Tags } from "@/components/content/tags";
import { CATEGORIES } from "@/constants";
import { filterByTag } from "@/data/tags";
import { useCurrentTag } from "@/hooks/use-current-tag";
import type { Note } from "@/types";
import { useMemo } from "react";

type NoteSummariesProps = {
  notes: Note[];
};

export function NoteSummaries({ notes }: NoteSummariesProps) {
  const [currentCategory] = useCurrentTag("category", CATEGORIES);

  const filteredNotes = useMemo(
    () => filterByTag(notes, "category", currentCategory),
    [notes, currentCategory],
  );

  const noteSummaries = filteredNotes.map((noteSummary) => (
    <NoteSummary key={noteSummary.slug} note={noteSummary} />
  ));

  return (
    <>
      <Header
        title="Notes"
        subText="My personal notes on books, articles, talks, podcasts and more."
      >
        <Tags type="category" values={CATEGORIES} />
      </Header>
      <section className="my-8">{noteSummaries}</section>
    </>
  );
}
