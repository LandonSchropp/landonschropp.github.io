import tailwindConfig from "../../tailwind.config";
import {
  BUSINESS_CATEGORY,
  DEVELOPMENT_CATEGORY,
  DESIGN_CATEGORY,
  PSYCHOLOGY_CATEGORY,
  CHESS_CATEGORY,
  OTHER_CATEGORY,
} from "../constants";
import type { Category } from "../types";

const COLORS = {
  [BUSINESS_CATEGORY]: tailwindConfig.theme.colors.cornflower,
  [DEVELOPMENT_CATEGORY]: tailwindConfig.theme.colors.purple,
  [DESIGN_CATEGORY]: tailwindConfig.theme.colors.amethyst,
  [PSYCHOLOGY_CATEGORY]: tailwindConfig.theme.colors.mulberry,
  [CHESS_CATEGORY]: tailwindConfig.theme.colors.bittersweet,
  [OTHER_CATEGORY]: tailwindConfig.theme.colors.bittersweet,
} as const;

export function categoryColor(category: Category | null | undefined) {
  return COLORS[category ?? "Business"];
}
