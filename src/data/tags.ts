import { OTHER_CATEGORY } from "@/constants";

/**
 * Given an array of objects and a function that extracts a tag from each object, returns an array
 * of those tags ordered by use.
 * @param objects The array of objects.
 * @param transform A function that extracts a tag from an object.
 * @returns An array of tags ordered by use.
 */
export function determineTags<O extends Record<P, T>, P extends string, T extends string>(
  objects: O[],
  property: P,
): T[] {
  const tags = objects.map((object) => object[property]);

  // Determine the raw tag counts.
  const tagCounts = tags.reduce(
    (counts, tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
      return counts;
    },
    {} as Record<T, number>,
  );

  // Sort the keys based on their counts, from highest to lowest.
  const sortedEntries = (Object.entries(tagCounts) as [T, number][])
    .toSorted(([, countA], [, countB]) => countB - countA)
    .map(([tag]) => tag);

  // If the sorted tags contains `"Other"`, move it to the end.
  return (sortedEntries as string[]).includes(OTHER_CATEGORY)
    ? ([...sortedEntries.filter((tag) => tag !== OTHER_CATEGORY), OTHER_CATEGORY] as T[])
    : sortedEntries;
}

/**
 * Filters a list of objects based on the provided tag.
 * @param objects The list of objects to filter.
 * @param property The property to filter by.
 * @param currentTag The tag to filter by. If `null`, no filtering is applied.
 * @returns The filtered list of objects.
 */
export function filterByTag<O extends Record<P, T>, P extends string, T extends string>(
  objects: O[],
  property: P,
  currentTag: T | null,
): O[] {
  if (currentTag === null) {
    return objects;
  }

  return objects.filter((object) => object[property] === currentTag);
}
