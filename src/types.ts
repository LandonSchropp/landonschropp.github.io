import type { CATEGORIES, MEDIAS, TECHNOLOGIES } from "./constants";

export type Category = (typeof CATEGORIES)[number];
export type Media = (typeof MEDIAS)[number];
export type Technology = (typeof TECHNOLOGIES)[number];

export type NoteSummary = {
  id: string;
  title: string;
  slug: string;
  authors: string[];
  date: Date;
  category: Category;
  media: string;
  source: string;
  url: string;
  published: boolean;
};

export interface Note extends NoteSummary {
  content: string;
}

export type ArticleSummary = {
  id: string;
  title: string;
  slug: string;
  date: Date;
  description: string;
  url: string | null;
  publisher: string | null;
  published: boolean;
};

export interface Article extends ArticleSummary {
  content: string;
}

export type TodayILearnedSummary = {
  id: string;
  title: string;
  slug: string;
  date: Date;
  description: string;
  technology: Technology;
  published: boolean;
};

export interface TodayILearned extends TodayILearnedSummary {
  content: string;
}

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
