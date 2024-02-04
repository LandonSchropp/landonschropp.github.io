import type { Category } from "../types";
import { useTag } from "./use-tag";
import { atom } from "nanostores";

export const $category = atom<Category | null>(null);

export function useCategory() {
  return useTag("category", $category);
}
