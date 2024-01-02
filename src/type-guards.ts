import { CATEGORIES, MEDIAS } from "./constants";
import type { ArticleSummary, Category, Media, NoteSummary } from "./types";

function assert(condition: unknown, message?: string): asserts condition {
  if (condition === false) throw new Error(message);
}

export function isCategory(category: unknown): category is Category {
  return CATEGORIES.includes(category as Category);
}

export function assertCategory(category: unknown): asserts category is Category {
  assert(isCategory(category));
}

export function isMedia(media: unknown): media is Media {
  return MEDIAS.includes(media as Media);
}

export function assertMedia(media: unknown): asserts media is Media {
  assert(isMedia(media));
}

export function isNoteSummary(note: unknown): note is NoteSummary {
  return (
    typeof note === "object" &&
    note !== null &&
    "id" in note &&
    "title" in note &&
    "slug" in note &&
    "authors" in note &&
    "date" in note &&
    "category" in note &&
    "media" in note &&
    "source" in note &&
    "url" in note &&
    "published" in note &&
    typeof note.id === "string" &&
    typeof note.title === "string" &&
    typeof note.slug === "string" &&
    Array.isArray(note.authors) &&
    note.authors.every((author) => typeof author === "string") &&
    note.date instanceof Date &&
    typeof note.category === "string" &&
    isCategory(note.category) &&
    isMedia(note.media) &&
    typeof note.source === "string" &&
    typeof note.url === "string" &&
    typeof note.published === "boolean"
  );
}

export function assertNoteSummary(note: unknown): asserts note is NoteSummary {
  assert(isNoteSummary(note), `Expected a NoteSummary, but got '${JSON.stringify(note)}'.`);
}

export function isArticleSummary(article: unknown): article is ArticleSummary {
  return (
    typeof article === "object" &&
    article !== null &&
    "id" in article &&
    "title" in article &&
    "slug" in article &&
    "date" in article &&
    "description" in article &&
    "url" in article &&
    "publisher" in article &&
    "published" in article &&
    typeof article.id === "string" &&
    typeof article.title === "string" &&
    typeof article.slug === "string" &&
    article.date instanceof Date &&
    typeof article.description === "string" &&
    typeof article.url === "string" &&
    (typeof article.publisher === "string" || article.publisher === null) &&
    typeof article.published === "boolean"
  );
}

export function assertArticleSummary(article: unknown): asserts article is ArticleSummary {
  assert(
    isArticleSummary(article),
    `Expected an ArticleSummary, but got '${JSON.stringify(article)}'.`,
  );
}
