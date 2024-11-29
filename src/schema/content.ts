import { z } from "zod";

export const ContentSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: z.string().date(),
  published: z.boolean(),
  markdown: z.string(),
});
