"use client";

import { DynamicSVG } from "@/components/dynamic-svg";
import * as DATA from "@/components/dynamic-svg/data";

const DEFAULT_SPACING = 0.3;
const WIDE_SPACING = 0.5;
const MIN_VERTICAL_SPACING = 0.02;
const MAX_VERTICAL_SPACING = 0.06;

export default function IndexPage() {
  return (
    <DynamicSVG minSpacing={MIN_VERTICAL_SPACING} maxSpacing={MAX_VERTICAL_SPACING}>
      <DynamicSVG.Row spacing={DEFAULT_SPACING}>
        <DynamicSVG.Shape shape={DATA.landon} />
        <DynamicSVG.Shape shape={DATA.schropp} />
      </DynamicSVG.Row>
      <DynamicSVG.Row spacing={DEFAULT_SPACING}>
        <DynamicSVG.Shape shape={DATA.entrepreneurComma} />
        <DynamicSVG.Shape shape={DATA.developer} />
        <DynamicSVG.Shape shape={DATA.ampersand} />
        <DynamicSVG.Shape shape={DATA.designer} />
      </DynamicSVG.Row>
      <DynamicSVG.Row spacing={WIDE_SPACING}>
        <DynamicSVG.Shape shape={DATA.writing} />
        <DynamicSVG.Shape shape={DATA.notes} />
        <DynamicSVG.Shape shape={DATA.til} />
        <DynamicSVG.Shape shape={DATA.github} />
        <DynamicSVG.Shape shape={DATA.chessCom} />
        <DynamicSVG.Shape shape={DATA.linkedIn} />
        <DynamicSVG.Shape shape={DATA.email} />
      </DynamicSVG.Row>
    </DynamicSVG>
  );
}
