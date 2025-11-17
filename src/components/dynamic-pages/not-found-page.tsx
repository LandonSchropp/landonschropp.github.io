"use client";

import { DynamicSVG } from "../dynamic-svg";
import * as DATA from "@/data/svg";

export function NotFoundPage() {
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
