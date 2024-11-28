import type { SvgDataShape as SvgDataShapeType } from "@/types";
import { omit } from "remeda";

type SvgDataShapeProps = {
  shape: SvgDataShapeType | null;
};

const SVG_DATA_SHAPE_CLASS_NAME = "fill-[url('#svg-data-background')]";

export function SvgDataShape({ shape }: SvgDataShapeProps) {
  if (!shape) return null;

  if (shape.type === "polygon") {
    const props = omit(shape, ["type"]);
    return <polygon className={SVG_DATA_SHAPE_CLASS_NAME} {...props} />;
  }

  const [x, y, width, height] = shape.bounds;
  const props = omit(shape, ["type", "bounds"]);

  return (
    <>
      {/* Add an invisible box so hovers work for the full link area. */}
      <rect x={x} y={y} width={width} height={height} fill="transparent" />
      <path className={SVG_DATA_SHAPE_CLASS_NAME} {...props} />
    </>
  );
}
