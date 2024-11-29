import { ContentSchema } from "./content";
import { z } from "zod";

export const ArticleSchema = z.union([
  ContentSchema.extend({
    description: z.string(),
    publisher: z.undefined(),
    url: z.undefined(),
  }),
  ContentSchema.extend({
    description: z.string(),
    publisher: z.string(),
    url: z.string().url(),
    markdown: z.string().max(0),
  }),
]);
