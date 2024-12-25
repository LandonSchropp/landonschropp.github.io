type DynamicSVGRowProps = {
  /** The spacing between each child in the row, expressed as a percentage of the contained shape's _height_. */
  spacing: number;

  /** The shapes contained in the row. This may only contain `DynamicSVG.Shape` elements. */
  children: React.ReactNode;
};

/**
 * A row contained in the SVG.
 */
export function Row({ children }: DynamicSVGRowProps) {}
