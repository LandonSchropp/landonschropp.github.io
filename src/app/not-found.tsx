"use client";

import { DynamicSVG } from "@/components/dynamic-svg";
import * as DATA from "@/data/svg";

// import { Metadata } from "next";
//
// export const metadata: Metadata = {
//   title: "404",
//   description: "The page you were looking for couldn't be found.",
// };

export default function NotFoundPage() {
  return (
    <DynamicSVG>
      <DynamicSVG.Aspect key="not-found" minSpacing={0} maxSpacing={0}>
        <DynamicSVG.Group title="404: Not Found" key="heading" role="heading">
          <DynamicSVG.Row key="heading" align="top" spacing={0}>
            <DynamicSVG.Shape key="not-found" {...DATA.notFound} />
          </DynamicSVG.Row>
        </DynamicSVG.Group>
      </DynamicSVG.Aspect>
    </DynamicSVG>
  );
}
