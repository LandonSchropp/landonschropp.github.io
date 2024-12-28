import { getMaxHeight } from "./bounds";
import { DynamicSVGShape, BoundedDynamicSVGShape } from "@/types";
import { sum } from "@/utilities/array";

// TODO: Do I need some kind of row object to keep track of the row data, such as the bounds of the
// row or the element to contain the row?

/**
 * Given an array of shapes, this function distributes them in a horizontal row.
 * @param shapes The shapes to scale and distribute.
 * @param spacing The spacing between each shape, represented as a percentage of the max height of
 * the shapes.
 * @returns The transformed shapes.
 */
export function distributeShapesHorizontally(
  shapes: DynamicSVGShape[],
  spacing: number,
): BoundedDynamicSVGShape[] {
  const rowHeight = getMaxHeight(shapes);
  const spacingWidth = rowHeight * spacing;

  return shapes.reduce((accumulator, shape) => {
    accumulator.push({
      shape,
      bounds: {
        width: shape.width,
        height: shape.height,
        x: sum(accumulator, ({ bounds: { width } }) => width + spacingWidth),
        // TODO: Distribute each shape within the rows.
        y: 0,
      },
    });

    return accumulator;
  }, [] as BoundedDynamicSVGShape[]);
}

/**
 * Given an array of shapes, this function scales and distributes them vertically to fit within the
 * @param boundedShapes The shapes to scale and distribute.
 * @param width The width to fit the shapes within.
 * @returns The transformed shapes.
 */
export function scaleRowToWidth(
  boundedShapes: BoundedDynamicSVGShape[],
  width: number,
): BoundedDynamicSVGShape[] {
  const minX = Math.min(...boundedShapes.map(({ bounds }) => bounds.x));
  const maxX = Math.max(...boundedShapes.map(({ bounds }) => bounds.x + bounds.width));
  const rowWidth = maxX - minX;
  const scale = width / rowWidth;

  return boundedShapes.map(({ shape, bounds }) => {
    return {
      shape,
      bounds: {
        x: bounds.x * scale,
        y: bounds.y,
        width: bounds.width * scale,
        height: bounds.height * scale,
      },
    };
  });
}
