"use client";

import { PORTRAIT_SVG_DATA, findShape, LANDSCAPE_SVG_DATA } from "@/data/svg";
import SvgDataContainer from "./svg-data-container";
import { SvgDataShape } from "./svg-data-shape";
import { PORTRAIT_MEDIA_QUERY } from "../../tailwind.config";
import { useMediaQuery } from "@react-hook/media-query";
import type { SvgDataShape as SvgDataShapeType } from "@/types";

type SvgDataShapeLinkProps = {
  shape: SvgDataShapeType | null;
  href: string;
  title: string;
};

function SvgDataShapeLink({ shape, href, title }: SvgDataShapeLinkProps) {
  if (!shape) return null;

  return (
    // BUGFIX: A pointer cursor is not the default in Safari. 😕
    <a
      className="pointer-events-[bounding-box] cursor-pointer hocus:fill-cornflower [&:hover>path]:fill-inherit [&:focus-visible>path]:fill-inherit"
      href={href}
    >
      <title>{title}</title>
      <SvgDataShape shape={shape} />
    </a>
  );
}

/**
 * This component houses the _client_ portions of the index page.
 */
export function IndexPageSvgData() {
  const isPortrait = useMediaQuery(PORTRAIT_MEDIA_QUERY);

  let { viewBox, shapes } = isPortrait ? PORTRAIT_SVG_DATA : LANDSCAPE_SVG_DATA;

  let landonShape = findShape(shapes, "landon");
  let schroppShape = findShape(shapes, "schropp");
  let entrepreneurShape = findShape(shapes, "entrepreneur");
  let commaShape = findShape(shapes, "comma");
  let developerAndDesignerShape = findShape(shapes, "developer-and-designer");
  let writingShape = findShape(shapes, "writing");
  let notesShape = findShape(shapes, "notes");
  let twitterShape = findShape(shapes, "twitter");
  let gitHubShape = findShape(shapes, "github");
  let emailShape = findShape(shapes, "email");
  let codepenShape = findShape(shapes, "codepen");
  let linkedInShape = findShape(shapes, "linkedin");

  return (
    <SvgDataContainer viewBox={viewBox} title="Landon Schropp">
      <g role="heading">
        <title>Landon Schropp</title>
        <SvgDataShape shape={landonShape} />
        <SvgDataShape shape={schroppShape} />
      </g>

      <g>
        <title>Entrepreneur, Designer & Developer</title>
        <SvgDataShape shape={entrepreneurShape} />
        <SvgDataShape shape={commaShape} />
        <SvgDataShape shape={developerAndDesignerShape} />
      </g>

      <g role="navigation">
        <SvgDataShapeLink href="/articles" title="Writing" shape={writingShape} />

        <SvgDataShapeLink href="/notes" title="Notes" shape={notesShape} />

        <SvgDataShapeLink
          href="https://twitter.com/LandonSchropp"
          title="Twitter"
          shape={twitterShape}
        />

        <SvgDataShapeLink
          href="https://github.com/LandonSchropp"
          title="GitHub"
          shape={gitHubShape}
        />

        <SvgDataShapeLink href="mailto:schroppl@gmail.com" title="Email" shape={emailShape} />

        <SvgDataShapeLink
          href="https://codepen.io/LandonSchropp/"
          title="CodePen"
          shape={codepenShape}
        />

        <SvgDataShapeLink
          href="https://www.linkedin.com/in/landonschropp"
          title="LinkedIn"
          shape={linkedInShape}
        />
      </g>
    </SvgDataContainer>
  );
}
