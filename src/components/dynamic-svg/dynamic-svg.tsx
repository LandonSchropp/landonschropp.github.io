"use client";

import { Shape } from "./shape";
import {
  scaleRowToWidth,
  distributeShapesHorizontally,
  distributeRowsVertically,
  calculateHeight,
} from "./shape-calculations";
import { useSize } from "@/hooks/use-size";
import flannel from "@/images/flannel.png";
import { DynamicSVGRow } from "@/types";
import { useRef } from "react";

// TODO: Rename this to something like MainSVG or ShapePage or something.

export type DynamicSVGProps = {
  /** The shapes contained in the SVG. */
  rows: DynamicSVGRow[];

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
};

/**
 * This is a special SVG component that dynamically spaces its children based on its available size.
 * It transforms imported SVG data from files into React that can freely resize to fit their
 * available space.
 *
 * This component uses the child component pattern to provide all of its API.
 */
export function DynamicSVG({ rows, minSpacing, maxSpacing }: DynamicSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const size = useSize(svgRef);

  const scaledRows = rows.map((row) => {
    return scaleRowToWidth(distributeShapesHorizontally(row.shapes, row.spacing), size.width);
  });

  const shapes = distributeRowsVertically(scaledRows, size, minSpacing, maxSpacing);

  const shapeComponents = shapes.map((boundedShape) => {
    return <Shape key={boundedShape.shape.id} boundedShape={boundedShape} />;
  });

  const viewBoxHeight = calculateHeight(shapes);

  return (
    <main className={"flex h-full p-[3vw] *:flex-[0_0_auto]"}>
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

        {shapeComponents}
      </svg>
    </main>
  );
}
