/**
 * Given an array of objects and a function that extracts a tag from each object, returns an array
 * of those tags ordered by use.
 * @param objects The array of objects.
 * @param transform A function that extracts a tag from an object.
 * @returns An array of tags ordered by use.
 */
export function determineTags<O extends object, T extends string>(
  objects: O[],
  transform: (value: O) => T,
): T[] {
  const tags = objects.map(transform);

  // Determine the raw tag counts.
  const tagCounts = tags.reduce(
    (counts, tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
      return counts;
    },
    {} as Record<T, number>,
  );

  // Sort the keys based on their counts, from highest to lowest.
  const sortedEntries = (Object.entries(tagCounts) as [T, number][]).toSorted(
    ([, countA], [, countB]) => countB - countA,
  );

  // Rebuild the object with sorted keys.
  return sortedEntries.map(([tag]) => tag);
}

/**
 * Filters a list of objects based on the provided tag.
 * @param objects The list of objects to filter.
 * @param transform A function that extracts a tag from an object.
 * @param currentTag The tag to filter by. If `null`, no filtering is applied.
 * @returns The filtered list of objects.
 */
export function filterByTag<O extends object, T extends string>(
  objects: O[],
  transform: (value: O) => T,
  currentTag: T | null,
): O[] {
  if (currentTag === null) {
    return objects;
  }

  return objects.filter((object) => transform(object) === currentTag);
}
