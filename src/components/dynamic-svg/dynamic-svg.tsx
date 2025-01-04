import { Aspect } from "./aspect";
import { BoundedRow } from "./bounded-row";
import { calculateBounds } from "./bounds";
import {
  scaleShapesToWidth,
  distributeShapesHorizontally,
  distributeRowsVertically,
  calculateAspectAreaPercentage,
} from "./calculations";
import { extractAspects } from "./extraction";
import { Group } from "./group";
import { Link } from "./link";
import { Row } from "./row";
import { Shape } from "./shape";
import { useSize } from "@/hooks/use-size";
import flannel from "@/images/flannel.png";
import {
  BoundedDynamicSVGAspect,
  BoundedDynamicSVGRow,
  DynamicSVGAspect,
  DynamicSVGRow,
  Size,
} from "@/types";
import { maxBy } from "@/utilities/array";
import { recursivelyReplaceType } from "@/utilities/introspection";
import { ReactNode, useRef } from "react";
import { indexBy } from "remeda";

function calculateBoundedRow(row: DynamicSVGRow, size: Size): BoundedDynamicSVGRow {
  const distributedShapes = distributeShapesHorizontally(row.shapes, row.spacing);
  const scaledShapes = scaleShapesToWidth(distributedShapes, size.width);

  return {
    key: row.key,
    bounds: calculateBounds(scaledShapes),
    boundedShapes: scaledShapes,
  };
}

function calculateBoundedAspect(
  { key, rows, minSpacing, maxSpacing }: DynamicSVGAspect,
  size: Size,
): BoundedDynamicSVGAspect {
  const scaledRows = rows.map((row) => calculateBoundedRow(row, size));
  const boundedRows = distributeRowsVertically(scaledRows, size, minSpacing, maxSpacing);

  return {
    key,
    bounds: calculateBounds(boundedRows),
    boundedRows,
  };
}

function calculateAndSelectAspect(node: ReactNode, size: Size): BoundedDynamicSVGAspect {
  const aspects = extractAspects(node).map((aspect) => calculateBoundedAspect(aspect, size));
  const aspect = maxBy(aspects, (aspect) => calculateAspectAreaPercentage(aspect, size));

  if (!aspect) {
    throw new Error("No aspects were provided.");
  }

  return aspect;
}

/**
 * This is a helper function that replaces the `Row` components in the provided node with
 * `BoundedRow` components.
 * @param node The node to replace the rows in.
 * @param boundedRows The bounded rows to replace the rows with.
 * @returns The node with the rows replaced.
 */
function replaceRowsWithBoundedRows(
  node: ReactNode,
  boundedRows: BoundedDynamicSVGRow[],
): ReactNode {
  const indexedBoundedRows = indexBy(boundedRows, ({ key }) => key);

  return recursivelyReplaceType(node, Row, ({ key, props }) => {
    if (!key) {
      throw new Error("A key is required for each row.");
    }

    return (
      <BoundedRow key={key} boundedRow={indexedBoundedRows[key]}>
        {props.children}
      </BoundedRow>
    );
  });
}

function replaceAspectWithBoundedAspect(
  node: ReactNode,
  boundedAspect: BoundedDynamicSVGAspect,
): ReactNode {
  return recursivelyReplaceType(node, Aspect, ({ key, props }) => {
    // If the aspect is not the selected aspect, remove it.
    if (boundedAspect.key !== key) {
      return null;
    }

    return replaceRowsWithBoundedRows(props.children, boundedAspect.boundedRows);
  });
}

export type DynamicSVGProps = {
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
export function DynamicSVG({ children }: DynamicSVGProps) {
  // NOTE: The overall design of this component ended up getting somewhat complex. Using nested
  // components to define the layout of the component's content necessitated the use of the `Children`
  // API. However, I believe the extra complexity is worth it for the flexibility it provides. With
  // this approach, I can easily define the structure of the rendered SVG with other components,
  // including things like additional markup, aria-attributes and links with little trouble.

  const svgRef = useRef<SVGSVGElement>(null);
  const size = useSize(svgRef);

  const aspect = calculateAndSelectAspect(children, size);
  const viewBoxHeight = calculateBounds(aspect.boundedRows).height;

  const boundedChildren = replaceAspectWithBoundedAspect(children, aspect);

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

DynamicSVG.Aspect = Aspect;
DynamicSVG.Group = Group;
DynamicSVG.Link = Link;
DynamicSVG.Row = Row;
DynamicSVG.Shape = Shape;
