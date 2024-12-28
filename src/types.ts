import {
  ArticleSchema,
  CategorySchema,
  ContentSchema,
  MediaSchema,
  NoteSchema,
  TechnologySchema,
  TodayILearnedSchema,
} from "./schema";
import { z } from "zod";

/** A topical category of content. */
export type Category = z.infer<typeof CategorySchema>;

/** A type of media. */
export type Media = z.infer<typeof MediaSchema>;

/** A category of technology, such as a programming language or framework. */
export type Technology = z.infer<typeof TechnologySchema>;

/** An object containing the metadata and markdown of some form of content. */
export type Content = z.infer<typeof ContentSchema>;

/** An object containing the metadata and markdown of a note. */
export type Note = z.infer<typeof NoteSchema>;

/** An object containing the metadata and markdown of an article. */
export type Article = z.infer<typeof ArticleSchema>;

/** An object containing the metadata and markdown of a today I Learned (TIL). */
export type TodayILearned = z.infer<typeof TodayILearnedSchema>;

/** Represents the size of a rectangle. */
export type Size = {
  /** The width of the rectangle. */
  width: number;

  /** The height of the rectangle. */
  height: number;
};
