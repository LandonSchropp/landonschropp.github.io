import { NoteSchema, ArticleSchema, TodayILearnedSchema, ContentSchema } from "./schema";
import { Note, Article, TodayILearned, Content } from "./types";
import { z } from "zod";

/**
 * Asserts the provided value in the content of the given schema.
 * @param schema The schema to check.
 * @param value The value to check.
 * @template T The type of the schema.
 * @throws If the value does not match the schema.
 */
function assertSchema<T extends z.ZodType>(schema: T, value: unknown): asserts value is z.infer<T> {
  try {
    schema.parse(value);
  } catch (error) {
    console.error(`Failed to assert value: `, value);
    throw error;
  }
}

/**
 * Asserts that the provided value is a content.
 * @param value The value to check.
 */
export function assertContent(value: unknown): asserts value is Content {
  assertSchema(ContentSchema, value);
}

/**
 * Asserts that the provided value is a note.
 * @param value The value to check.
 */
export function assertNote(value: unknown): asserts value is Note {
  assertSchema(NoteSchema, value);
}

/**
 * Asserts that the provided value is an article.
 * @param value The value to check.
 */
export function assertArticle(value: unknown): asserts value is Article {
  assertSchema(ArticleSchema, value);
}

/**
 * Asserts that the provided value is a today I learned (TIL).
 * @param value The value to check.
 */
export function assertTodayILearned(value: unknown): asserts value is TodayILearned {
  assertSchema(TodayILearnedSchema, value);
}
