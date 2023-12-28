export type NoteSummary = {
  id: string;
  title: string;
  slug: string;
  authors: string[];
  date: Date;
  category: string;
  media: string;
  source: string;
  url: string;
  published: boolean;
};

export interface Note extends NoteSummary {
  content: string;
}
