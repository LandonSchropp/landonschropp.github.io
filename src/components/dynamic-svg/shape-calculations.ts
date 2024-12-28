import { getMaxHeight } from "./bounds";
import { DynamicSVGShape, BoundedDynamicSVGShape, Size } from "@/types";
import { sum } from "@/utilities/array";
import { clamp } from "@/utilities/number";

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
        y: (rowHeight - shape.height) / 2,
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

/**
 * Given an array of rows, this function distributes them vertically across the given height using the provided spacing.
 * @param rows The rows to distribute.
 * @param size The size of the container.
 * @param minSpacing The minimum spacing between each row. The spacing is expressed as a percentage
 * of the width of the container.
 * @param maxSpacing The maximum spacing between each row. The spacing is expressed as a percentage
 * of the width of the container.
 * @returns The transformed shapes distributed into rows.
 */
export function distributeRowsVertically(
  rows: BoundedDynamicSVGShape[][],
  size: Size,
  minSpacing: number,
  maxSpacing: number,
): BoundedDynamicSVGShape[] {
  const rowHeights = rows.map((row) => getMaxHeight(row.map(({ bounds }) => bounds)));

  const minSpacingHeight = size.width * minSpacing;
  const maxSpacingHeight = size.width * maxSpacing;

  const calculatedSpacingHeight = (size.height - sum(rowHeights)) / (rows.length - 1);
  const spacingHeight = clamp(calculatedSpacingHeight, minSpacingHeight, maxSpacingHeight);

  return rows.flatMap((row, index) => {
    const baseY = sum(rowHeights.slice(0, index), (height) => height + spacingHeight);

    return row.map(({ shape, bounds }) => {
      return { shape, bounds: { ...bounds, y: baseY + bounds.y } };
    });
  });
}
