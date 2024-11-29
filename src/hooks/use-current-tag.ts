import useSearchParam from "./use-search-param";
import { useCallback } from "react";

/**
 * A hook that provides a simple way to set and retrieve a generic tag filter. The value of the
 * filter is stored in the URL search parameters.
 * @typeParam T The type of the tag.
 * @param type The name of the search parameter to use for the current tag.
 * @param values The possible values to choose from for the tag.
 * @returns A tuple containing the current tag and a function to set the current tag.
 */
export function useCurrentTag<T extends string>(type: string, values: readonly T[]) {
  const isTag = useCallback((value: unknown): value is T => values.includes(value as T), [values]);

  const [searchParam, setSearchParam] = useSearchParam(type);

  const tag = isTag(searchParam) ? searchParam : null;
  const setTag = (tag: T | null) => setSearchParam(tag);

  return [tag, setTag] as const;
}
