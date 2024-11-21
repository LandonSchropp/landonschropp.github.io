import { NoteSchema, ArticleSchema, TodayILearnedSchema, ContentSchema } from "./schema";
import { Note, Article, TodayILearned, Content } from "./types";
import { z } from "zod";

/**
 * Parses the provided value in the content of the given schema.
 * @param schema The schema to check.
 * @param value The value to check.
 * @template T The type of the schema.
 * @throws If the value does not match the schema.
 */
function parseSchema<T extends z.ZodType>(schema: T, value: unknown): z.infer<T> {
  try {
    return schema.parse(value);
  } catch (error) {
    console.error(`Failed to parse value: `, value);
    throw error;
  }
}

/**
 * Asserts that the provided value is a content.
 * @param value The value to check.
 */
export function parseContent(value: unknown): Content {
  return parseSchema(ContentSchema, value);
}

/**
 * Asserts that the provided value is a note.
 * @param value The value to check.
 */
export function parseNote(value: unknown): Note {
  return parseSchema(NoteSchema, value);
}

/**
 * Asserts that the provided value is an article.
 * @param value The value to check.
 */
export function parseArticle(value: unknown): Article {
  return parseSchema(ArticleSchema, value);
}

/**
 * Asserts that the provided value is a today I learned (TIL).
 * @param value The value to check.
 */
export function parseTodayILearned(value: unknown): TodayILearned {
  return parseSchema(TodayILearnedSchema, value);
}
