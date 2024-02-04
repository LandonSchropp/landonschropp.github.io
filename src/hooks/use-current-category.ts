import { isCategory } from "../type-guards";
import { useCurrentTag } from "./use-current-tag";

export function useCurrentCategory() {
  return useCurrentTag("category", isCategory);
}
