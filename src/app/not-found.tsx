import SvgDataContainer from "@/components/svg-data/svg-data-container";
import { SvgDataShape } from "@/components/svg-data/svg-data-shape";
import { NOT_FOUND_SVG_DATA, findShape } from "@/data/svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "The page you were looking for couldn't be found.",
};

export default function NotFoundPage() {
  const { viewBox, shapes } = NOT_FOUND_SVG_DATA;
  const shape = findShape(shapes, "not-found");

  return (
    <SvgDataContainer viewBox={viewBox} title="404">
      <SvgDataShape shape={shape} />
    </SvgDataContainer>
  );
}
