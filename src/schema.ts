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
import { Content, Note, Article, TodayILearned } from "./types";
import { Temporal } from "@js-temporal/polyfill";
import { z } from "zod";

export const CategorySchema = z.enum(CATEGORIES);
export const TechnologySchema = z.enum(TECHNOLOGIES);
export const MediaSchema = z.enum(MEDIAS);

export const ContentSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: z.string().transform((date) => Temporal.PlainDate.from(date)),
  published: z.boolean(),
  markdown: z.string(),
});

/**
 * Asserts that the provided value is a content.
 * @param value The value to check.
 */
export function assertContent(value: unknown): asserts value is Content {
  ContentSchema.parse(value);
}

const NoteSchemaBase = ContentSchema.extend({
  authors: z.array(z.string()),
  category: CategorySchema,
  media: MediaSchema,
  url: z.string().url(),
});

const ArticleNoteSchema = NoteSchemaBase.extend({
  media: z.literal(ARTICLE_MEDIA),
  source: z.string(),
});

const BookNoteSchema = NoteSchemaBase.extend({
  media: z.literal(BOOK_MEDIA),
});

const CourseNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(COURSE_MEDIA),
});

const PodcastNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(PODCAST_MEDIA),
});

const TalkNoteSchema = z.discriminatedUnion("live", [
  NoteSchemaBase.extend({
    media: z.literal(TALK_MEDIA),
    live: z.literal(true),
    location: z.string(),
  }),
  NoteSchemaBase.extend({
    media: z.literal(TALK_MEDIA),
    live: z.literal(false),
    source: z.string(),
  }),
]);

const VideoNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(VIDEO_MEDIA),
});

export const NoteSchema = z.union([
  ArticleNoteSchema,
  BookNoteSchema,
  CourseNoteSchema,
  PodcastNoteSchema,
  TalkNoteSchema,
  VideoNoteSchema,
]);

/**
 * Asserts that the provided value is a note.
 * @param value The value to check.
 */
export function assertNote(value: unknown): asserts value is Note {
  NoteSchema.parse(value);
}

export const ArticleSchema = z.union([
  ContentSchema.extend({
    description: z.string(),
    publisher: z.never(),
    url: z.never(),
  }),
  ContentSchema.extend({
    description: z.string(),
    publisher: z.string(),
    url: z.string().url(),
    markdown: z.string().max(0, { message: "Markdown must be empty when published elsewhere" }),
  }),
]);

/**
 * Asserts that the provided value is an article.
 * @param value The value to check.
 */
export function assertArticle(value: unknown): asserts value is Article {
  ArticleSchema.parse(value);
}

export const TodayILearnedSchema = ContentSchema.extend({
  technology: TechnologySchema,
});

/**
 * Asserts that the provided value is a today I learned (TIL).
 * @param value The value to check.
 */
export function assertTodayILearned(value: unknown): asserts value is TodayILearned {
  TodayILearnedSchema.parse(value);
}
