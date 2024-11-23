import {
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
});

const BookNoteSchema = NoteSchemaBase.extend({
  media: z.literal(BOOK_MEDIA),
});

const CourseNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(COURSE_MEDIA),
});

const LiveTalkNoteSchema = NoteSchemaBase.extend({
  media: z.literal(LIVE_TALK_MEDIA),
  event: z.string(),
});

const PodcastNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(PODCAST_MEDIA),
});

const RecordedTalkNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(RECORDED_TALK_MEDIA),
});

const VideoNoteSchema = ArticleNoteSchema.extend({
  media: z.literal(VIDEO_MEDIA),
});

export const NoteSchema = z.discriminatedUnion("media", [
  ArticleNoteSchema,
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