"use client";

import { BoundedShape } from "./bounded-shape";
import {
  scaleRowToWidth,
  distributeShapesHorizontally,
  distributeRowsVertically,
  calculateHeight,
  extractRows,
} from "./calculations";
import { Row } from "./row";
import { Shape } from "./shape";
import { useSize } from "@/hooks/use-size";
import flannel from "@/images/flannel.png";
import { BoundedDynamicSVGShape, Size } from "@/types";
import { recursivelyReplaceType } from "@/utilities/introspection";
import { ReactNode, useRef } from "react";
import { indexBy } from "remeda";

// TODO: Fix the error caused by the missing key

/**
 * Helper function that extracts the row and shape data from the provided node, applies the layout
 * math, and returns the bounded shapes.
 */
function calculateBoundedShapes(
  node: ReactNode,
  size: Size,
  minSpacing: number,
  maxSpacing: number,
): BoundedDynamicSVGShape[] {
  const scaledRows = extractRows(node).map((row) => {
    const distributedShapes = distributeShapesHorizontally(row.shapes, row.spacing);
    return scaleRowToWidth(distributedShapes, size.width);
  });

  return distributeRowsVertically(scaledRows, size, minSpacing, maxSpacing);
}

/**
 * This is a helper function that replaces the `Shape` component in the provided node with
 * `BoundedShape` components.
 * @param node The node to replace the shapes in.
 * @param boundedShapes The bounded shapes to replace the shapes with.
 * @returns The node with the shapes replaced.
 */
function replaceShapesWithBoundedShaped(
  node: ReactNode,
  boundedShapes: BoundedDynamicSVGShape[],
): ReactNode {
  const indexedBoundedShapes = indexBy(boundedShapes, ({ shape: { id } }) => id);

  return recursivelyReplaceType(node, Shape, (shapeElement) => {
    const id = shapeElement.props.shape.id;
    return <BoundedShape key={id} boundedShape={indexedBoundedShapes[id]} />;
  });
}

export type DynamicSVGProps = {
  /**
   * The minimum spacing between the shapes, expressed as a percentage of the width of the
   * container.
   */
  minSpacing: number;

  /**
   * The maximum spacing between the shapes, expressed as a percentage of the width of the
   * container.
   */
  maxSpacing: number;

  /**
   * The content of the dynamic SVG. In order to use the dynamic layout mechanism, you must include
   * `DynamicSVG.Shape` components wrapped in `DynamicSVG.Row`'s.
   */
  children: React.ReactNode;
};

/**
 * This component combines several SVG shapes with a specialized, dynamic layout. It organizes the
 * shapes into rows with the provided spacing, automatically resizing them so that each row takes up
 * the full width of the container. The rows are then distributed vertically to take up as much
 * space as possible within the constraints of the provided space.
 *
 * The goal is to enable you to intuitively add content to a SVG, surrounding it by markup, and let
 * the component decide exactly how the shapes should be positioned. To achieve this, this component
 * uses React's `Children` API to introspect the contents of the rows. This leaves you free to wrap
 * the shapes in whatever SVG markup you'd like, and that markup will be preserved when the shape is
 * rendered.
 */
export function DynamicSVG({ children, minSpacing, maxSpacing }: DynamicSVGProps) {
  // NOTE: The overall design of this component ended up getting somewhat complex. Using nested
  // components to define the layout of the component's content necessitated the use of the `Children`
  // API. However, I believe the extra complexity is worth it for the flexibility it provides. With
  // this approach, I can easily define the structure of the rendered SVG with other components,
  // including things like additional markup, aria-attributes and links with little trouble.

  const svgRef = useRef<SVGSVGElement>(null);
  const size = useSize(svgRef);

  const boundedShapes = calculateBoundedShapes(children, size, minSpacing, maxSpacing);
  const viewBoxHeight = calculateHeight(boundedShapes);

  const boundedChildren = replaceShapesWithBoundedShaped(children, boundedShapes);

  return (
    <main className="flex h-full p-[3vw] *:flex-[0_0_auto]">
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size.width} ${viewBoxHeight}`}
        ref={svgRef}
      >
        <defs>
          <pattern id="dynamic-svg-background" patternUnits="userSpaceOnUse" width={80} height={80}>
            <image href={flannel.src} x={0} y={0} width={80} height={80} />
          </pattern>
        </defs>

        {boundedChildren}
      </svg>
    </main>
  );
}

DynamicSVG.Row = Row;
DynamicSVG.Shape = Shape;
