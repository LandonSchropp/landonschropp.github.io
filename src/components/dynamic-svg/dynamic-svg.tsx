"use client";

import { Row } from "./row";
import { Shape } from "./shape";
import { useSize } from "@/hooks/use-size";
import { useRef } from "react";

type DynamicSVGProps = {
  /** The shapes contained in the SVG. */
  children: React.ReactNode;
};

/**
 * This is a special SVG component that dynamically spaces its children based on its available size.
 * It transforms imported SVG data from files into React that can freely resize to fit their
 * available space.
 *
 * This component uses the child component pattern to provide all of its API.
 */
export function DynamicSVG({ children }: DynamicSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const size = useSize(svgRef);

  return (
    <svg
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size[0]} ${size[1]}`}
      ref={svgRef}
    >
      {children}
    </svg>
  );
}

DynamicSVG.Row = Row;
DynamicSVG.Shape = Shape;
