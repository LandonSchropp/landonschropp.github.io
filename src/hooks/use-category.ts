import { useEffect, useCallback } from "react";
import { isCategory } from "../type-guards";
import type { Category } from "../types";
import { useLocation } from "./use-location";
import { useStore } from "@nanostores/react";
import { atom } from "nanostores";

function hrefCategory(href: string): Category | null {
  const url = new URL(href);
  const category = url.searchParams.get("category");

  if (!isCategory(category)) {
    return null;
  }

  return category;
}

export const $category = atom<Category | null>(null);

export function useCategory() {
  const { href, replaceHref } = useLocation();
  const category = useStore($category);

  const setCategory = useCallback((category: Category | null) => $category.set(category), []);

  // If the URL contains a category, remove it and store it in the state.
  useEffect(() => {
    const url = new URL(href);
    const category = hrefCategory(href);

    if (category) {
      setCategory(category);
      url.searchParams.delete("category");
      replaceHref(url.toString());
    }
  }, [href]);

  return [category, setCategory] as const;
}
