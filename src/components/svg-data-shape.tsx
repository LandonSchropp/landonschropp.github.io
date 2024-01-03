import type { SvgDataShape as SvgDataShapeType } from "../types";

type SvgDataShapeProps = {
  shape: SvgDataShapeType | null;
};

export function SvgDataShape({ shape }: SvgDataShapeProps) {
  if (!shape) return null;

  let { type, ...props } = shape;

  let className = "fill-[url('#svg-data-background')]";
  switch (type) {
    case "path":
      return <path className={className} {...props} />;
    case "polygon":
      return <polygon className={className} {...props} />;
  }
}
