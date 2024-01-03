import { Metadata } from "next";
import { IndexPageSvgData } from "@/components/index-page-svg-data";

export const metadata: Metadata = {
  title: "Landon Schropp",
  description: "Landon Schropp is a developer, designer and entrepreneur based in Portland, OR.",
};

export default function IndexPage() {
  return <IndexPageSvgData />;
}
