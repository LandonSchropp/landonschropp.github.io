import { ContentSchema } from "./content";
import { z } from "zod";

export const ArticleSchema = z.union([
  ContentSchema.extend({
    description: z.string(),
    publisher: z.undefined(),
    url: z.undefined(),
    markdown: z.string().min(1),
  }),
  ContentSchema.extend({
    description: z.string(),
    publisher: z.string(),
    url: z.string().url(),
    markdown: z.string().max(0),
  }),
]);

/**
 * Parses the provided value as a note.
 * @param value The value to parse.
 * @returns The parsed note.
 * @throws If the value does not match the schema.
 */
export function parseArticle(value: unknown): z.infer<typeof ArticleSchema> {
  return ArticleSchema.parse(value);
}
