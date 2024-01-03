import type { Category } from "../types";
import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { useCallback, useEffect } from "react";

export const $category = atom<Category | null>(null);

export function useCategory() {
  // Wrap the nanostore library.
  const category = useStore($category);
  const setCategory = useCallback((category: Category | null) => $category.set(category), []);

  // If the category changes, update the data attributes of the body element.
  useEffect(() => {
    if (category) {
      document.body.dataset.category = category;
    } else {
      delete document.body.dataset.category;
    }
  }, [category]);

  return [category, setCategory] as const;
}
