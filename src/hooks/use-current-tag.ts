import useSearchParam from "./use-search-param";

/**
 * A hook that provides a simple way to set and retrieve a generic tag filter. The value of the
 * filter is stored in the URL search parameters so it can easily be shared with others. This hook
 * is meant to be wrapped.
 * @typeParam T The type of the tag.
 * @param searchParamName The name of the search parameter to use for the current tag.
 * @param isTag A type guard that checks if a value is of type `T`.
 * @returns A tuple containing the current tag and a function to set the current tag.
 */
export function useCurrentTag<T extends string>(
  searchParamName: string,
  isTag: (value: unknown) => value is T,
) {
  const [searchParam, setSearchParam] = useSearchParam(searchParamName);

  const tag = isTag(searchParam) ? searchParam : null;
  const setTag = (tag: T | null) => setSearchParam(tag);

  return [tag, setTag] as const;
}
