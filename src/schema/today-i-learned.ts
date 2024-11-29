import { ContentSchema } from "./content";
import { TechnologySchema } from "./enums";
import { TYPESCRIPT_JAVASCRIPT_TECHNOLOGY } from "@/constants";
import { z } from "zod";

function preprocessTechnology(technology: unknown) {
  if (typeof technology !== "string") {
    return technology;
  }

  switch (technology) {
    case "JavaScript":
    case "TypeScript":
      return TYPESCRIPT_JAVASCRIPT_TECHNOLOGY;
    default:
      return technology;
  }
}

export const TodayILearnedSchema = ContentSchema.extend({
  technology: z.preprocess(preprocessTechnology, TechnologySchema),
});

/**
 * Parses the provided value as a today I learned (TIL).
 * @param value The value to parse.
 * @returns The parsed today I learned.
 * @throws If the value does not match the schema.
 */
export function parseTodayILearned(value: unknown): z.infer<typeof TodayILearnedSchema> {
  return TodayILearnedSchema.parse(value);
}
