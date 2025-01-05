"use client";

import { NoteSummary } from "./note-summary";
import { NoteTag } from "./note-tag";
import { Header } from "@/components/content/header";
import { Tag } from "@/components/content/tag";
import { Tags } from "@/components/content/tags";
import {
  BUSINESS_CATEGORY,
  CATEGORIES,
  DEVELOPMENT_CATEGORY,
  HEALTH_CATEGORY,
  OTHER_CATEGORY,
  PSYCHOLOGY_CATEGORY,
} from "@/constants";
import { filterByTag } from "@/data/tags";
import { useCurrentTag } from "@/hooks/use-current-tag";
import type { Category, Note } from "@/types";
import { ComponentProps, useMemo } from "react";

type NoteSummariesProps = {
  notes: Note[];
};

const ICONS = {
  [BUSINESS_CATEGORY]: "externalLink",
  [DEVELOPMENT_CATEGORY]: "externalLink",
  [HEALTH_CATEGORY]: "externalLink",
  [PSYCHOLOGY_CATEGORY]: "externalLink",
  [OTHER_CATEGORY]: "externalLink",
} as Record<Category, ComponentProps<typeof Tag>["icon"]>;

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
        <Tags type="category" values={CATEGORIES} component={NoteTag} />
      </Header>
      <section className="my-8">{noteSummaries}</section>
    </>
  );
}
