"use client";

import { Shape } from "./shape";
import { scaleRowToWidth, distributeShapesHorizontally } from "./shape-calculations";
import { useSize } from "@/hooks/use-size";
import { DynamicSVGRow } from "@/types";
import { useRef } from "react";

export type DynamicSVGProps = {
  /** The shapes contained in the SVG. */
  rows: DynamicSVGRow[];
};

/**
 * This is a special SVG component that dynamically spaces its children based on its available size.
 * It transforms imported SVG data from files into React that can freely resize to fit their
 * available space.
 *
 * This component uses the child component pattern to provide all of its API.
 */
export function DynamicSVG({ rows }: DynamicSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const size = useSize(svgRef);

  const scaledRows = rows.map((row) => {
    return scaleRowToWidth(distributeShapesHorizontally(row.shapes, row.spacing), size.width);
  });

  const shapeComponents = scaledRows.flatMap((shapes) => {
    return shapes.map((shape) => {
      // TODO: Does the scale need to account for the vertical size as well?
      const scale = shape.bounds.width / shape.shape.width;
      return <Shape key={shape.shape.id} {...shape.shape} {...shape.bounds} scale={scale} />;
    });
  });

  return (
    <svg
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size.width} ${size.height}`}
      ref={svgRef}
    >
      {shapeComponents}
    </svg>
  );
}
