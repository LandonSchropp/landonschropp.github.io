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

/** The shared properties of all content types, including `Note`, `Article` and `TodayILearned`. */
export type Content = z.infer<typeof ContentSchema>;

/** An object containing the metadata and content of a note. */
export type Note = z.infer<typeof NoteSchema>;

/** An object containing the metadata and content of an article. */
export type Article = z.infer<typeof ArticleSchema>;

/** An object containing the metadata and content of a today I Learned (TIL). */
export type TodayILearned = z.infer<typeof TodayILearnedSchema>;

/** A subset of the properties of the SVG `path` element. */
export type SvgDataPathShape = {
  id: string;
  type: "path";
  d: string;
  bounds: [number, number, number, number];
};

/** A subset of the properties of the SVG `polygon` element. */
export type SvgDataPolygonShape = {
  id: string;
  type: "polygon";
  points: string;
};

/** The accepted SVG shape subsets. */
export type SvgDataShape = SvgDataPathShape | SvgDataPolygonShape;

/** An object containing parsed data from an SVG. */
export type SvgData = {
  viewBox: string;
  shapes: SvgDataShape[];
};
