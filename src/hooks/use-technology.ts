import type { Technology } from "../types";
import { useTag } from "./use-tag";
import { atom } from "nanostores";

export const $technology = atom<Technology | null>(null);

export function useTechnology() {
  return useTag("technology", $technology);
}
