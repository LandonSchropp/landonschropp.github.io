import {
  APP_MEDIA,
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  CATEGORIES,
  COURSE_MEDIA,
  LIVE_TALK_MEDIA,
  MEDIAS,
  PODCAST_MEDIA,
  RECORDED_TALK_MEDIA,
  TECHNOLOGIES,
  VIDEO_MEDIA,
} from "./constants";
import { z } from "zod";

export const CategorySchema = z.enum(CATEGORIES);
export const TechnologySchema = z.enum(TECHNOLOGIES);
export const MediaSchema = z.enum(MEDIAS);

export const ContentSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  published: z.boolean(),
  markdown: z.string(),
});

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

export const TodayILearnedSchema = ContentSchema.extend({
  technology: TechnologySchema,
});
