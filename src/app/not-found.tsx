import { Metadata } from "next";
import { NOT_FOUND_SVG_DATA, findShape } from "@/data/svg";
import { SvgDataShape } from "@/components/svg-data-shape";
import SvgDataContainer from "@/components/svg-data-container";

export const metadata: Metadata = {
  title: "Landon Schropp – 404",
  description: "The page you were looking for couldn't be found.",
};

export default async function NotFoundPage() {
  let { viewBox, shapes } = NOT_FOUND_SVG_DATA;
  let shape = findShape(shapes, "not-found");

  return (
    <SvgDataContainer viewBox={viewBox} title="404">
      <SvgDataShape className="fill-[url('#flannel')]" shape={shape} />
    </SvgDataContainer>
  );
}
