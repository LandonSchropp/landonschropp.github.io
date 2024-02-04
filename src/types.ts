import type { CATEGORIES, MEDIAS, TECHNOLOGIES } from "./constants";

export type Category = (typeof CATEGORIES)[number];
export type Media = (typeof MEDIAS)[number];
export type Technology = (typeof TECHNOLOGIES)[number];

/**
 * The shared properties of all content summaries.
 */
export type ContentSummary = {
  id: string;
  title: string;
  slug: string;
  date: Date;
  published: boolean;
};

/**
 * The shared properties of all content.
 */
export interface Content extends ContentSummary {
  content: string;
}

export interface NoteSummary extends ContentSummary {
  authors: string[];
  category: Category;
  media: string;
  source: string;
  url: string;
}

export type Note = NoteSummary & Content;

export interface ArticleSummary extends ContentSummary {
  description: string;
  url: string | null;
  publisher: string | null;
}

export type Article = ArticleSummary & Content;

export interface TodayILearnedSummary extends ContentSummary {
  technology: Technology;
}

export type TodayILearned = TodayILearnedSummary & Content;

export type SvgDataPathShape = {
  id: string;
  type: "path";
  d: string;
  bounds: [number, number, number, number];
};

export type SvgDataPolygonShape = {
  id: string;
  type: "polygon";
  points: string;
};

export type SvgDataShape = SvgDataPathShape | SvgDataPolygonShape;

export type SvgData = {
  viewBox: string;
  shapes: SvgDataShape[];
};
