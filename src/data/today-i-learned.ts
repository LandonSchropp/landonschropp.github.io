import { fetchContent, fetchContents } from "./content";
import { assertTodayILearned, assertTodayILearneds } from "@/assertions";
import { TODAY_I_LEARNED_PATH } from "@/env";
import { TodayILearned } from "@/types";

/**
 * Fetches all today I learneds (TILs).
 * @returns An array of today I learneds (TILs).
 */
export async function fetchTodayILearneds(): Promise<TodayILearned[]> {
  const todayILearneds = await fetchContents(TODAY_I_LEARNED_PATH);
  assertTodayILearneds(todayILearneds);
  return todayILearneds;
}

/**
 * Fetches a single today I learned (TIL).
 * @param slug The slug of the today I learned (TIL).
 * @returns The today I learned (TIL) with the provided slug.
 */
export async function fetchTodayILearned(slug: string): Promise<TodayILearned> {
  const todayILearned = await fetchContent(TODAY_I_LEARNED_PATH, slug);
  assertTodayILearned(todayILearned);
  return todayILearned;
}
