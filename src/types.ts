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

/** The coordinates of an object. */
export type Coordinates = {
  /** The x-coordinate of the object. */
  x: number;

  /** The y-coordinate of the object. */
  y: number;
};

/** Represents the size of a rectangle. */
export type Size = {
  /** The width of the rectangle. */
  width: number;

  /** The height of the rectangle. */
  height: number;
};

/** The bounds of an object. */
export type Bounds = Coordinates & Size;

export type DynamicSVGShape = {
  /** The unique identifier of the shape. */
  key: string;

  /** The untransformed width of the shape. */
  originalWidth: number;

  /** The untransformed height of the shape. */
  originalHeight: number;

  /** The inner HTML of the shape to render. */
  content: string;
};

export type DynamicSVGRow = {
  /** The unique identifier of the row. */
  key: string;

  /** The space between each shape in the row, represented as a percentage of the row. */
  spacing: number;

  /** The shapes contained in the row. */
  shapes: DynamicSVGShape[];
};

/** An object that has bounds. */
export type BoundedObject = {
  /** The bounds of the object. */
  bounds: Bounds;
};

/**
 * This is similar to a `DynamicSVGRow`, except that it includes the bounds of the row. These bounds
 * are a memoization feature that prevents the resizing algorithms from doing redundant work. It
 * also includes an identifier that can be used as the row's key.
 */
export type BoundedDynamicSVGRow = BoundedObject & {
  /** The unique identifier of the row. */
  key: string;

  /** The bounded shapes contained in the row. */
  boundedShapes: BoundedDynamicSVGShape[];
};

/**
 * A shape that has been transformed by scaling and translating it.
 */
export type BoundedDynamicSVGShape = DynamicSVGShape & BoundedObject;
