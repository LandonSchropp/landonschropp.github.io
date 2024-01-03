import type { SvgDataShape as SvgDataShapeType } from "../types";

type SvgDataShapeProps = {
  className?: string;
  shape: SvgDataShapeType;
};

export function SvgDataShape({ className, shape: { type, ...props } }: SvgDataShapeProps) {
  switch (type) {
    case "path":
      return <path className={className} {...props} />;
    case "polygon":
      return <polygon className={className} {...props} />;
  }
}
