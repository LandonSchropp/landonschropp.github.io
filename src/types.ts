import type { CATEGORIES } from "./constants";

export type Category = (typeof CATEGORIES)[number];

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
