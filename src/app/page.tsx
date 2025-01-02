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
      <DynamicSVG.Row key="name" spacing={DEFAULT_SPACING}>
        <DynamicSVG.Shape key="landon" {...DATA.landon} />
        <DynamicSVG.Shape key="schropp" {...DATA.schropp} />
      </DynamicSVG.Row>
      <DynamicSVG.Row key="description" spacing={DEFAULT_SPACING}>
        <DynamicSVG.Shape key="entrepreneur" {...DATA.entrepreneurComma} />
        <DynamicSVG.Shape key="developer" {...DATA.developer} />
        <DynamicSVG.Shape key="ampersand" {...DATA.ampersand} />
        <DynamicSVG.Shape key="designer" {...DATA.designer} />
      </DynamicSVG.Row>
      <DynamicSVG.Row key="navigation-and-links" spacing={WIDE_SPACING}>
        <DynamicSVG.Shape key="writing" {...DATA.writing} />
        <DynamicSVG.Shape key="notes" {...DATA.notes} />
        <DynamicSVG.Shape key="til" {...DATA.til} />
        <DynamicSVG.Shape key="github" {...DATA.github} />
        <DynamicSVG.Shape key="chessCom" {...DATA.chessCom} />
        <DynamicSVG.Shape key="linkedIn" {...DATA.linkedIn} />
        <DynamicSVG.Shape key="email" {...DATA.email} />
      </DynamicSVG.Row>
    </DynamicSVG>
  );
}
