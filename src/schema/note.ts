import { ContentSchema } from "./content";
import { CategorySchema, MediaSchema } from "./enums";
import {
  APP_MEDIA,
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  COURSE_MEDIA,
  LIVE_TALK_MEDIA,
  PODCAST_MEDIA,
  RECORDED_TALK_MEDIA,
  VIDEO_MEDIA,
} from "@/constants";
import { z } from "zod";

const NoteSchemaBase = ContentSchema.extend({
  authors: z.array(z.string()),
  category: CategorySchema,
  media: MediaSchema,
  url: z.string().url(),
});

const ArticleNoteSchema = NoteSchemaBase.extend({
  media: z.literal(ARTICLE_MEDIA),
  source: z.string(),
  event: z.undefined(),
});

const AppNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(APP_MEDIA),
  source: z.string(),
  event: z.undefined(),
});

const BookNoteSchema = NoteSchemaBase.extend({
  authors: NoteSchemaBase.shape.authors.min(1),
  media: z.literal(BOOK_MEDIA),
  source: z.undefined(),
  event: z.undefined(),
});

const CourseNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(COURSE_MEDIA),
  source: z.string(),
  event: z.undefined(),
});

const LiveTalkNoteSchema = NoteSchemaBase.extend({
  authors: NoteSchemaBase.shape.authors.min(1),
  media: z.literal(LIVE_TALK_MEDIA),
  source: z.undefined(),
  event: z.string(),
});

const PodcastNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(PODCAST_MEDIA),
  source: z.string(),
  event: z.undefined(),
});

const RecordedTalkNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(RECORDED_TALK_MEDIA),
  source: z.string(),
  event: z.undefined(),
});

const VideoNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(VIDEO_MEDIA),
  source: z.string(),
  event: z.undefined(),
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
