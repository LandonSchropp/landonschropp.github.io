"use client";

import { Shape } from "./shape";
import {
  scaleRowToWidth,
  distributeShapesHorizontally,
  distributeRowsVertically,
  calculateHeight,
} from "./shape-calculations";
import { useSize } from "@/hooks/use-size";
import { DynamicSVGRow } from "@/types";
import { useRef } from "react";

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

  const shapeComponents = shapes.map((shape) => {
    const scale = shape.bounds.width / shape.shape.width;
    return <Shape key={shape.shape.id} {...shape.shape} {...shape.bounds} scale={scale} />;
  });

  const viewBoxHeight = calculateHeight(shapes);

  return (
    <svg
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size.width} ${viewBoxHeight}`}
      ref={svgRef}
    >
      {shapeComponents}
    </svg>
  );
}
