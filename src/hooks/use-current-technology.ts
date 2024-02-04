import { isTechnology } from "../type-guards";
import { useCurrentTag } from "./use-current-tag";

export function useCurrentTechnology() {
  return useCurrentTag("technology", isTechnology);
}
