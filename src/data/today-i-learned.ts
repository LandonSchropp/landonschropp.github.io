import { assertTodayILearnedSummary } from "../type-guards";
import type { TodayILearned, TodayILearnedSummary } from "../types";
import { fetchContentSummaries, fetchContent } from "./content";
import { optionalValue } from "./notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const TODAY_I_LEARNED_DATABASE_ID = "894540b841aa4b279b2f47c4879c9622";

function pageObjectResponseToTodayILearnedSummary(page: PageObjectResponse): TodayILearnedSummary {
  const todayILearned = {
    id: page.id,
    title: optionalValue(page, "Title", "title"),
    slug: optionalValue(page, "Slug", "rich_text"),
    date: optionalValue(page, "Date", "date"),
    technology: optionalValue(page, "Technology", "select"),
    published: optionalValue(page, "Published", "checkbox"),
  };

  assertTodayILearnedSummary(todayILearned);

  return todayILearned;
}

export async function fetchTodayILearnedSummaries(): Promise<TodayILearnedSummary[]> {
  return await fetchContentSummaries(
    TODAY_I_LEARNED_DATABASE_ID,
    pageObjectResponseToTodayILearnedSummary,
  );
}

export async function fetchTodayILearned(slug: string): Promise<TodayILearned> {
  return await fetchContent(
    TODAY_I_LEARNED_DATABASE_ID,
    pageObjectResponseToTodayILearnedSummary,
    slug,
  );
}
