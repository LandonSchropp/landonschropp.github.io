import { DynamicSVG } from "@/components/dynamic-svg";
import * as DATA from "@/components/dynamic-svg/data";

const DEFAULT_SPACING = 0.3;
const WIDE_SPACING = 0.5;
const MIN_VERTICAL_SPACING = 0.02;
const MAX_VERTICAL_SPACING = 0.06;

export default function IndexPage() {
  return (
    <DynamicSVG
      minSpacing={MIN_VERTICAL_SPACING}
      maxSpacing={MAX_VERTICAL_SPACING}
      rows={[
        {
          spacing: DEFAULT_SPACING,
          shapes: [DATA.landon, DATA.schropp],
        },
        {
          spacing: DEFAULT_SPACING,
          shapes: [DATA.developer, DATA.designer, DATA.ampersand, DATA.entrepreneur],
        },
        {
          spacing: WIDE_SPACING,
          shapes: [
            DATA.writing,
            DATA.notes,
            DATA.til,
            DATA.github,
            DATA.chessCom,
            DATA.linkedIn,
            DATA.email,
          ],
        },
      ]}
    />
  );
}
