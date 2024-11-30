import { z } from "zod";

const MarkdownSchema = z
  .string()
  .refine((value) => !/^# /m.test(value), { message: "Markdown should not contain an H1" });

export const ContentSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: z.string().date(),
  published: z.boolean(),
  markdown: MarkdownSchema,
});
