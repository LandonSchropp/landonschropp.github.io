import { DynamicSVGShape } from "@/types";

type DynamicSVGShapeProps = {
  /** The shapes contained in the row. This may only contain `DynamicSVG.Shape` elements. */
  shape: DynamicSVGShape;
};

/**
 * A row contained in the SVG.
 */
export function Shape(_: DynamicSVGShapeProps) {
  return null;
}
