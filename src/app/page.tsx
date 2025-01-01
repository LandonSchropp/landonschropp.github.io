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
      <DynamicSVG.Row spacing={DEFAULT_SPACING} key="first">
        <DynamicSVG.Shape {...DATA.landon} />
        <DynamicSVG.Shape {...DATA.schropp} />
      </DynamicSVG.Row>
      <DynamicSVG.Row spacing={DEFAULT_SPACING} key="second">
        <DynamicSVG.Shape {...DATA.entrepreneurComma} />
        <DynamicSVG.Shape {...DATA.developer} />
        <DynamicSVG.Shape {...DATA.ampersand} />
        <DynamicSVG.Shape {...DATA.designer} />
      </DynamicSVG.Row>
      <DynamicSVG.Row spacing={WIDE_SPACING} key="third">
        <DynamicSVG.Shape {...DATA.writing} />
        <DynamicSVG.Shape {...DATA.notes} />
        <DynamicSVG.Shape {...DATA.til} />
        <DynamicSVG.Shape {...DATA.github} />
        <DynamicSVG.Shape {...DATA.chessCom} />
        <DynamicSVG.Shape {...DATA.linkedIn} />
        <DynamicSVG.Shape {...DATA.email} />
      </DynamicSVG.Row>
    </DynamicSVG>
  );
}
