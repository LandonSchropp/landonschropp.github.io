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
