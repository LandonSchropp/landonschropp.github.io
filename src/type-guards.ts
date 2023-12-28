import { CATEGORIES } from "./constants";
import type { Category } from "./types";

export function isCategory(category: string): category is Category {
  return (CATEGORIES as unknown as string[]).includes(category);
}
