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
    if (
      typeof value === "object" &&
      value !== null &&
      "title" in value &&
      typeof value.title === "string"
    ) {
      console.error(`Failed to assert '${value.title}'`);
    }

    throw error;
  }
}

/**
 * Asserts that the provided value is an array of the given schema.
 * @param schema The schema to check.
 * @param value The value to check.
 * @template T The type of the schema.
 * @throws If the value is not an array or does not match the schema.
 */
function assertSchemaArray<T extends z.ZodType>(
  schema: T,
  value: unknown,
): asserts value is z.infer<T>[] {
  if (!Array.isArray(value)) {
    throw new Error(`Expected an array, but received: ${value as any}`);
  }

  for (const item of value) {
    assertSchema(schema, item);
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
 * Asserts that the provided value is an array of contents.
 * @param value The value to check.
 */
export function assertContents(value: unknown): asserts value is Content[] {
  assertSchemaArray(ContentSchema, value);
}

/**
 * Asserts that the provided value is a note.
 * @param value The value to check.
 */
export function assertNote(value: unknown): asserts value is Note {
  assertSchema(NoteSchema, value);
}

/**
 * Asserts that the provided value is an array of notes.
 * @param value The value to check.
 */
export function assertNotes(value: unknown): asserts value is Note[] {
  assertSchemaArray(NoteSchema, value);
}

/**
 * Asserts that the provided value is an article.
 * @param value The value to check.
 */
export function assertArticle(value: unknown): asserts value is Article {
  assertSchema(ArticleSchema, value);
}

/**
 * Asserts that the provided value is an array of articles.
 * @param value The value to check.
 */
export function assertArticles(value: unknown): asserts value is Article[] {
  assertSchemaArray(ArticleSchema, value);
}

/**
 * Asserts that the provided value is a today I learned (TIL).
 * @param value The value to check.
 */
export function assertTodayILearned(value: unknown): asserts value is TodayILearned {
  assertSchema(TodayILearnedSchema, value);
}

/**
 * Asserts that the provided value is an array of today I learneds (TILs).
 * @param value The value to check.
 */
export function assertTodayILearneds(value: unknown): asserts value is TodayILearned[] {
  assertSchemaArray(TodayILearnedSchema, value);
}
