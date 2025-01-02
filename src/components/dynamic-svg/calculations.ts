import { Row } from "./row";
import { Shape } from "./shape";
import {
  DynamicSVGShape,
  BoundedDynamicSVGShape,
  Size,
  DynamicSVGRow,
  BoundedDynamicSVGRow,
} from "@/types";
import { sum } from "@/utilities/array";
import { recursivelyExtractType } from "@/utilities/introspection";
import { clamp } from "@/utilities/number";
import { ReactNode } from "react";

/**
 * Given a React node, this function extracts the rows and their metadata from the
 * child components.
 * @param node The react node to extract the rows from.
 * @returns An array of rows and their metadata.
 */
export function extractRows(node: ReactNode): DynamicSVGRow[] {
  return recursivelyExtractType(node, Row, ({ key: rowKey, props: { children, spacing } }) => {
    if (!rowKey) {
      throw new Error("A key is required for each row.");
    }

    const shapes = recursivelyExtractType(children, Shape, ({ key: shapeKey, props }) => {
      if (!shapeKey) {
        throw new Error("A key is required for each shape.");
      }

      return { ...props, key: shapeKey };
    });

    return { key: rowKey, spacing: spacing, shapes };
  });
}

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
  const rowHeight = Math.max(...shapes.map(({ originalHeight }) => originalHeight));
  const spacingWidth = rowHeight * spacing;

  return shapes.reduce((accumulator, shape) => {
    accumulator.push({
      ...shape,
      bounds: {
        width: shape.originalWidth,
        height: shape.originalHeight,
        x: sum(accumulator, ({ bounds: { width } }) => width + spacingWidth),
        y: (rowHeight - shape.originalHeight) / 2,
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
export function scaleShapesToWidth(
  boundedShapes: BoundedDynamicSVGShape[],
  width: number,
): BoundedDynamicSVGShape[] {
  const minX = Math.min(...boundedShapes.map(({ bounds }) => bounds.x));
  const maxX = Math.max(...boundedShapes.map(({ bounds }) => bounds.x + bounds.width));
  const rowWidth = maxX - minX;
  const scale = width / rowWidth;

  return boundedShapes.map(({ bounds, ...shape }) => {
    return {
      ...shape,
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
  rows: BoundedDynamicSVGRow[],
  size: Size,
  minSpacing: number,
  maxSpacing: number,
): BoundedDynamicSVGRow[] {
  const rowsHeight = sum(rows.map(({ bounds: { height } }) => height));

  const minSpacingHeight = size.width * minSpacing;
  const maxSpacingHeight = size.width * maxSpacing;

  const calculatedSpacingHeight = (size.height - rowsHeight) / (rows.length - 1);
  const spacingHeight = clamp(calculatedSpacingHeight, minSpacingHeight, maxSpacingHeight);

  return rows.map((row, index) => {
    const baseY = sum(rows.slice(0, index), (row) => row.bounds.height + spacingHeight);

    const boundedShapes = row.boundedShapes.map(({ bounds, ...shape }) => {
      return { ...shape, bounds: { ...bounds, y: baseY + bounds.y } };
    });

    return {
      ...row,
      bounds: { ...row.bounds, y: baseY },
      boundedShapes,
    };
  });
}
