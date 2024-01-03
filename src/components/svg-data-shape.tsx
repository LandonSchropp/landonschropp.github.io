import type { SvgDataShape as SvgDataShapeType } from "../types";

type SvgDataShapeProps = {
  shape: SvgDataShapeType | null;
};

const SVG_DATA_SHAPE_CLASS_NAME = "fill-[url('#svg-data-background')]";

export function SvgDataShape({ shape }: SvgDataShapeProps) {
  if (!shape) return null;

  if (shape.type === "polygon") {
    let { type, ...props } = shape;
    return <polygon className={SVG_DATA_SHAPE_CLASS_NAME} {...props} />;
  }

  let {
    type,
    bounds: [x, y, width, height],
    ...props
  } = shape;

  return (
    <>
      {/* Add an invisible box so hovers work for the full link area. */}
      <rect x={x} y={y} width={width} height={height} fill="transparent" />
      <path className={SVG_DATA_SHAPE_CLASS_NAME} {...props} />;
    </>
  );
}
