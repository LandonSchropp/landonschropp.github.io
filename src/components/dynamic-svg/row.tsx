type DynamicSVGRowProps = {
  /** The spacing between each child in the row, expressed as a percentage of the contained shape's _height_. */
  spacing: number;

  /** The shapes contained in the row. This may only contain `DynamicSVG.Shape` elements. */
  children: React.ReactNode;
};

/**
 * A row contained in the SVG.
 */
export function Row({ children }: DynamicSVGRowProps) {
  // NOTE: This component isn't actually used to render anything. Rather, it's used by introspection
  // of `DynamicSVG` to extract the rows and their metadata.
  return children;
}
