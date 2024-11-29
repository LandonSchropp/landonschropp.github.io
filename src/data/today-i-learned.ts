import { fetchContent, fetchContents } from "./content";
import { TODAY_I_LEARNED_PATH } from "@/env";
import { parseTodayILearned } from "@/schema";
import { TodayILearned } from "@/types";

/**
 * Fetches all today I learneds (TILs).
 * @returns An array of today I learneds (TILs).
 */
export async function fetchTodayILearneds(): Promise<TodayILearned[]> {
  return (await fetchContents(TODAY_I_LEARNED_PATH)).map(parseTodayILearned);
}

/**
 * Fetches a single today I learned (TIL).
 * @param slug The slug of the today I learned (TIL).
 * @returns The today I learned (TIL) with the provided slug.
 */
export async function fetchTodayILearned(slug: string): Promise<TodayILearned> {
  return parseTodayILearned(await fetchContent(TODAY_I_LEARNED_PATH, slug));
}
