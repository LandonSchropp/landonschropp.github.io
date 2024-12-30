import { Row } from "./row";
import { Shape } from "./shape";
import { DynamicSVGRow, DynamicSVGShape } from "@/types";
import { isStringRecord } from "@/utilities/type-guards";
import { Children, ReactNode } from "react";

/**
 * This is a utility function that's capable of recursively extracting component data from react
 * children.
 */
function recursivelyExtractType<R>(
  children: React.ReactNode,
  type: React.ElementType,
  transform: (props: Record<string | symbol, unknown>) => R,
): R[] {
  return Children.toArray(children).flatMap((child) => {
    if (!(typeof child === "object") || !("type" in child) || child.type !== type) {
      return [];
    }

    return transform(child.props as Record<string, unknown>);
  });
}

/**
 * Given a React node, this function extracts the rows and their metadata from the
 * child components.
 *
 * @param node The react node to extract the rows from.
 * @returns An array of rows and their metadata.
 */
export function extractRows(node: ReactNode): DynamicSVGRow[] {
  return Children.toArray(node).flatMap((child) => {
    return recursivelyExtractType<DynamicSVGRow>(child, Row, (rowProps) => {
      const spacing = rowProps.spacing as number;
      const children = rowProps.children as ReactNode;

      const shapes = Children.toArray(children).flatMap((grandchild) => {
        return recursivelyExtractType<DynamicSVGShape>(grandchild, Shape, (shapeProps) => {
          return shapeProps.shape as DynamicSVGShape;
        });
      });

      return { spacing: spacing, shapes };
    });
  });
}
