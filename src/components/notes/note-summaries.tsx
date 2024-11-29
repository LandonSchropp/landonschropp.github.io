"use client";

import { NoteSummary } from "./note-summary";
import { Header } from "@/components/content/header";
import { Tags } from "@/components/content/tags";
import {
  OTHER_CATEGORY,
  BUSINESS_CATEGORY,
  DESIGN_CATEGORY,
  DEVELOPMENT_CATEGORY,
  PSYCHOLOGY_CATEGORY,
  PRODUCTIVITY_CATEGORY,
} from "@/constants";
import { determineTags, filterByTag } from "@/data/tags";
import { useCurrentTag } from "@/hooks/use-current-tag";
import type { Note } from "@/types";
import { useMemo } from "react";

type NoteSummariesProps = {
  notes: Note[];
};

const PRIMARY_CATEGORIES = [
  BUSINESS_CATEGORY,
  DEVELOPMENT_CATEGORY,
  DESIGN_CATEGORY,
  PSYCHOLOGY_CATEGORY,
];

function transformNoteTag({ category }: Note) {
  if (category === PRODUCTIVITY_CATEGORY) {
    return PSYCHOLOGY_CATEGORY;
  }

  return PRIMARY_CATEGORIES.includes(category) ? category : OTHER_CATEGORY;
}

export function NoteSummaries({ notes }: NoteSummariesProps) {
  const categories = useMemo(() => determineTags(notes, transformNoteTag), [notes]);

  const [currentCategory] = useCurrentTag("category", categories);

  const filteredNotes = useMemo(
    () => filterByTag(notes, transformNoteTag, currentCategory),
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
        <Tags type="category" values={categories} />
      </Header>
      <section className="my-8">{noteSummaries}</section>
    </>
  );
}
