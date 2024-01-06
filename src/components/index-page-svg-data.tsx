"use client";

import { PORTRAIT_MEDIA_QUERY } from "../../tailwind.config";
import SvgDataContainer from "./svg-data-container";
import { SvgDataShape } from "./svg-data-shape";
import { PORTRAIT_SVG_DATA, findShape, LANDSCAPE_SVG_DATA } from "@/data/svg";
import { useIsClient } from "@/hooks/use-is-client";
import type { SvgDataShape as SvgDataShapeType } from "@/types";
import { useMediaQuery } from "@react-hook/media-query";

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
      className="pointer-events-[bounding-box] cursor-pointer hocus:fill-cornflower [&:focus-visible>path]:fill-inherit [&:hover>path]:fill-inherit"
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
  const isClient = useIsClient();

  const { viewBox, shapes } = isPortrait ? PORTRAIT_SVG_DATA : LANDSCAPE_SVG_DATA;

  const landonShape = findShape(shapes, "landon");
  const schroppShape = findShape(shapes, "schropp");
  const entrepreneurShape = findShape(shapes, "entrepreneur");
  const commaShape = findShape(shapes, "comma");
  const developerAndDesignerShape = findShape(shapes, "developer-and-designer");
  const writingShape = findShape(shapes, "writing");
  const notesShape = findShape(shapes, "notes");
  const gitHubShape = findShape(shapes, "github");
  const chessComShape = findShape(shapes, "chess-com");
  const linkedInShape = findShape(shapes, "linkedin");
  const emailShape = findShape(shapes, "email");

  if (!isClient) return null;

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
          href="https://github.com/LandonSchropp"
          title="GitHub"
          shape={gitHubShape}
        />

        <SvgDataShapeLink
          href="https://www.chess.com/member/landon"
          title="Chess.com"
          shape={chessComShape}
        />

        <SvgDataShapeLink
          href="https://www.linkedin.com/in/landonschropp"
          title="LinkedIn"
          shape={linkedInShape}
        />

        <SvgDataShapeLink href="mailto:schroppl@gmail.com" title="Email" shape={emailShape} />
      </g>
    </SvgDataContainer>
  );
}
