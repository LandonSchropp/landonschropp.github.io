type DynamicSVGShapeProps = {
  /** The width of the shape to render. */
  width: number;

  /** The height of the shape to render. */
  height: number;

  /** The inner HTML of the shape to render. */
  shape: string;
};

/**
 * A shape contained in the SVG.
 */
export function Shape({ width, height, shape }: DynamicSVGShapeProps) {}
