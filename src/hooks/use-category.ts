import { useEffect, useCallback } from "react";
import { isCategory } from "../type-guards";
import type { Category } from "../types";
import { useLocation } from "./use-location";
import { useStore } from "@nanostores/react";
import { atom } from "nanostores";

export const $category = atom<Category | null>(null);

export function useCategory() {
  const { href, popSearchParam } = useLocation();
  const category = useStore($category);

  // Use a store to house the category so it's stored globally.
  const setCategory = useCallback((category: Category | null) => $category.set(category), []);

  // If the URL changes, update the state.
  useEffect(() => {
    if (category) {
      document.body.dataset.category = category;
    } else {
      delete document.body.dataset.category;
    }
  }, [category]);

  // If the URL contains a category, remove it and store it in the state.
  useEffect(() => {
    const category = popSearchParam("category");

    if (isCategory(category)) {
      setCategory(category);
    }
  }, [href]);

  return [category, setCategory] as const;
}
