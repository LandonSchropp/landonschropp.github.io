import {
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  CATEGORIES,
  COURSE_MEDIA,
  MEDIAS,
  PODCAST_MEDIA,
  TALK_MEDIA,
  TECHNOLOGIES,
  VIDEO_MEDIA,
} from "./constants";
import { Temporal } from "@js-temporal/polyfill";
import { z } from "zod";

const categoryEnum = z.enum(CATEGORIES);
export type Category = z.infer<typeof categoryEnum>;

const technologyEnum = z.enum(TECHNOLOGIES);
export type Technology = z.infer<typeof technologyEnum>;

const mediaEnum = z.enum(MEDIAS);
export type Media = z.infer<typeof mediaEnum>;

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const contentSchema = z.object({
  title: z.string(),
  slug: slugSchema,
  date: z.string().transform((date) => Temporal.PlainDate.from(date)),
  published: z.boolean(),
  markdown: z.string(),
});

/** Contains the basic properties that are universally represented in all types of content. */
export type Content = z.infer<typeof contentSchema>;

/**
 * Asserts that the provided value is a content.
 * @param value The value to check.
 */
export function assertContent(value: unknown): asserts value is Content {
  contentSchema.parse(value);
}

const noteSchemaBase = contentSchema.extend({
  authors: z.array(z.string()),
  category: categoryEnum,
  media: mediaEnum,
  url: z.string().url(),
});

const articleNoteSchema = noteSchemaBase.extend({
  media: z.literal(ARTICLE_MEDIA),
  source: z.string(),
});

const bookNoteSchema = noteSchemaBase.extend({
  media: z.literal(BOOK_MEDIA),
});

const courseNoteSchema = articleNoteSchema.extend({
  media: z.literal(COURSE_MEDIA),
});

const podcastNoteSchema = articleNoteSchema.extend({
  media: z.literal(PODCAST_MEDIA),
});

const talkNoteSchema = z.discriminatedUnion("live", [
  noteSchemaBase.extend({
    media: z.literal(TALK_MEDIA),
    live: z.literal(true),
    location: z.string(),
  }),
  noteSchemaBase.extend({
    media: z.literal(TALK_MEDIA),
    live: z.literal(false),
    source: z.string(),
  }),
]);

const videoNoteSchema = articleNoteSchema.extend({
  media: z.literal(VIDEO_MEDIA),
});

export const noteSchema = z.union([
  articleNoteSchema,
  bookNoteSchema,
  courseNoteSchema,
  podcastNoteSchema,
  talkNoteSchema,
  videoNoteSchema,
]);

/** An object containing the metadata and content of a note. */
export type Note = z.infer<typeof noteSchema>;

/**
 * Asserts that the provided value is a note.
 * @param value The value to check.
 */
export function assertNote(value: unknown): asserts value is Note {
  noteSchema.parse(value);
}

const articleSchema = z.union([
  contentSchema.extend({
    description: z.string(),
    publisher: z.never(),
    url: z.never(),
  }),
  contentSchema.extend({
    description: z.string(),
    publisher: z.string(),
    url: z.string().url(),
    markdown: z.string().max(0, { message: "Markdown must be empty when published elsewhere" }),
  }),
]);

/** An object containing the metadata and content of an article. */
export type Article = z.infer<typeof articleSchema>;

/**
 * Asserts that the provided value is an article.
 * @param value The value to check.
 */
export function assertArticle(value: unknown): asserts value is Article {
  articleSchema.parse(value);
}

export const todayILearnedSchema = contentSchema.extend({
  technology: technologyEnum,
});

/** An object containing the metadata and content of a today I Learned (TIL). */
export type TodayILearned = z.infer<typeof todayILearnedSchema>;

/**
 * Asserts that the provided value is a today I learned (TIL).
 * @param value The value to check.
 */
export function assertTodayILearned(value: unknown): asserts value is TodayILearned {
  todayILearnedSchema.parse(value);
}
