import { Size, Coordinates, Bounds } from "@/types";

/**
 * @param objects The objects to get the maximum height of.
 * @returns The maximum height of the objects.
 */
export function getMaxHeight<T extends Size>(objects: T[]): number {
  return Math.max(...objects.map(({ height }) => height));
}

/**
 * Translates the object by the given amount.
 * @param object The object containing the coordinates to translate.
 * @param dx The amount to translate the object in the x-direction.
 * @param dy The amount to translate the object in the y-direction.
 * @returns The object with the translated coordinates.
 */
export function translate<T extends Coordinates>(object: T, dx: number, dy: number): T {
  return {
    ...object,
    x: object.x + dx,
    y: object.y + dy,
  };
}

/**
 * Scales the object by the given amount.
 * @param object The object containing the size to scale.
 * @param scale The amount to scale the object.
 * @returns The object with the scaled size.
 */
export function scale<T extends Bounds>(object: T, scale: number): T {
  return {
    ...object,
    x: object.x * scale,
    y: object.y * scale,
    width: object.width * scale,
    height: object.height * scale,
  };
}
