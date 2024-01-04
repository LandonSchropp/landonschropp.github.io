import { isCategory } from "../type-guards";
import type { Category } from "../types";
import useSearchParam from "./use-search-param";

export function useCategoryFilter() {
  const [searchParam, setSearchParam] = useSearchParam("category");

  const category = isCategory(searchParam) ? searchParam : null;
  const setCategory = (category: Category | null) => setSearchParam(category);

  return [category, setCategory] as const;
}
