import { BoundedDynamicSVGShape } from "@/types";

type ShapeProps = {
  /** The bounded shape to display. */
  boundedShape: BoundedDynamicSVGShape;
};

/**
 * This component contains includes the shape that's actually rendered to the dynamic SVG. This
 * component is not meant to be used directly—instead, pass the `rows` property to `DynamicSVG`.
 */
export function Shape({ boundedShape: { bounds, shape } }: ShapeProps) {
  const maskId = `${shape.id}-mask`;

  // Determine the scale by comparing the original shape's width to the bounded shape's width.
  const scale = bounds.width / shape.width;

  // NOTE: In the SVG spec, the transforms are applied _right-to-left_, so the translation must be
  // listed before the scale.
  return (
    <>
      {/*
        Using a rect here and applying a make to it accomplishes two things at once:

        - The mask shape can be transformed without affecting the fill. This prevents distortion to
          the fill as they're transformed to different scales.
        - The rect provides a square click target that properly highlights when moused over. This is 
          not the case for a normal path—only visible parts of the path will trigger a hover.
      */}
      <rect
        {...bounds}
        className="cursor-pointer fill-[url('#dynamic-svg-background')] hover:fill-cornflower"
        fill="url('#dynamic-svg-background')"
        mask={`url(#${maskId})`}
      />
      <mask id={maskId}>
        <g
          transform={`translate(${bounds.x}, ${bounds.y}) scale(${scale})`}
          dangerouslySetInnerHTML={{ __html: shape.content }}
        />
      </mask>
    </>
  );
}
