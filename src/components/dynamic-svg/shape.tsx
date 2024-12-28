type ShapeProps = {
  /** The x-coordinate of the content. */
  x: number;

  /** The y-coordinate of the content. */
  y: number;

  /** The scale factor of the content. */
  scale: number;

  /** The inner HTML of the shape to render. */
  content: string;
};

/**
 * This component contains includes the shape that's actually rendered to the dynamic SVG. This
 * component is not meant to be used directly—instead, pass the `rows` property to `DynamicSVG`.
 */
export function Shape({ x, y, scale, content }: ShapeProps) {
  // NOTE: In the SVG spec, the transforms are applied _right-to-left_, so the translation must be
  // listed before the scale.
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
