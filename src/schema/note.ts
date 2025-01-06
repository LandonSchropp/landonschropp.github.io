import { ContentSchema } from "./content";
import { CategorySchema, MediaSchema } from "./enums";
import {
  APP_MEDIA,
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  COURSE_MEDIA,
  LIVE_TALK_MEDIA,
  OTHER_CATEGORY,
  PODCAST_MEDIA,
  PSYCHOLOGY_CATEGORY,
  RECORDED_TALK_MEDIA,
  VIDEO_MEDIA,
} from "@/constants";
import { z } from "zod";

function preprocessCategory(category: unknown) {
  if (typeof category !== "string") {
    return category;
  }

  switch (category) {
    case "Productivity":
      return PSYCHOLOGY_CATEGORY;
    case "Chess":
    case "Design":
      return OTHER_CATEGORY;
    default:
      return category;
  }
}

const NoteSchemaBase = ContentSchema.extend({
  authors: z.array(z.string()),
  category: z.preprocess(preprocessCategory, CategorySchema),
  media: MediaSchema,
  url: z.string().url(),
  isbn: z.undefined(),
  source: z.undefined(),
  event: z.undefined(),
});

const ArticleNoteSchema = NoteSchemaBase.extend({
  media: z.literal(ARTICLE_MEDIA),
  source: z.string(),
});

const AppNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(APP_MEDIA),
  source: z.string(),
});

const BookNoteSchema = NoteSchemaBase.extend({
  authors: NoteSchemaBase.shape.authors.min(1),
  media: z.literal(BOOK_MEDIA),
  isbn: z.string(),
});

const CourseNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(COURSE_MEDIA),
  source: z.string(),
});

const LiveTalkNoteSchema = NoteSchemaBase.extend({
  authors: NoteSchemaBase.shape.authors.min(1),
  media: z.literal(LIVE_TALK_MEDIA),
  event: z.string(),
});

const PodcastNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(PODCAST_MEDIA),
  source: z.string(),
});

const RecordedTalkNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(RECORDED_TALK_MEDIA),
  source: z.string(),
});

const VideoNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(VIDEO_MEDIA),
  source: z.string(),
});

export const NoteSchema = z.discriminatedUnion("media", [
  ArticleNoteSchema,
  AppNoteSchema,
  BookNoteSchema,
  CourseNoteSchema,
  LiveTalkNoteSchema,
  PodcastNoteSchema,
  RecordedTalkNoteSchema,
  VideoNoteSchema,
]);

/**
 * Parses the provided value as a note.
 * @param value The value to parse.
 * @returns The parsed note.
 * @throws If the value does not match the schema.
 */
export function parseNote(value: unknown): z.infer<typeof NoteSchema> {
  return NoteSchema.parse(value);
}
