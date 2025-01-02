"use client";

import { DynamicSVG } from "@/components/dynamic-svg";
import { NAME } from "@/constants";
import * as DATA from "@/data/svg";
import { DynamicSVGShape } from "@/types";
import { ReactNode } from "react";

const DEFAULT_SPACING = 0.3;
const WIDE_SPACING = 0.5;
const MIN_VERTICAL_SPACING = 0.02;
const MAX_VERTICAL_SPACING = 0.06;

const LANDON = <DynamicSVG.Shape key="landon" {...DATA.landon} />;
const SCHROPP = <DynamicSVG.Shape key="schropp" {...DATA.schropp} />;

const ENTREPRENEUR = <DynamicSVG.Shape key="entrepreneur" {...DATA.entrepreneurComma} />;
const DEVELOPER = <DynamicSVG.Shape key="developer" {...DATA.developer} />;
const AMPERSAND = <DynamicSVG.Shape key="ampersand" {...DATA.ampersand} />;
const DESIGNER = <DynamicSVG.Shape key="designer" {...DATA.designer} />;

const WRITING = shapeLink("writing", DATA.writing, "/articles", "Writing");
const NOTES = shapeLink("notes", DATA.notes, "/notes", "Notes");
const TIL = shapeLink("til", DATA.til, "/today-i-learned", "Today I Learned");
const GITHUB = shapeLink("github", DATA.github, "http://github.com/LandonSchropp", "GitHub");

const CHESS_COM = shapeLink(
  "chess-com",
  DATA.chessCom,
  "https://www.chess.com/member/landon",
  "Chess.com",
);

const LINKED_IN = shapeLink(
  "linked-in",
  DATA.linkedIn,
  "https://linkedin.com/in/landonschropp",
  "LinkedIn",
);

const EMAIL = shapeLink("email", DATA.email, "mailto:schroppl@gmail.com", "Email");

/**
 * Generates a shape link. This can't be a component because we need the full component tree present
 * in order for `DynamicSVG` to correctly extract the shapes.
 */
function shapeLink(
  key: string,
  shape: Omit<DynamicSVGShape, "key">,
  href: string,
  title: string,
): ReactNode {
  return (
    // FIX: A pointer cursor is not the default in Safari. 😕
    <a
      className="pointer-events-[bounding-box] cursor-pointer hocus:fill-cornflower [&:focus-visible>path]:fill-inherit [&:hover>path]:fill-inherit"
      href={href}
      key={`link-${key}`}
    >
      <title>{title}</title>
      <DynamicSVG.Shape key={key} {...shape} />
    </a>
  );
}

export default function IndexPage() {
  return (
    <DynamicSVG minSpacing={MIN_VERTICAL_SPACING} maxSpacing={MAX_VERTICAL_SPACING}>
      <g key="heading" role="heading">
        <title>{NAME}</title>
        <DynamicSVG.Row key="name" spacing={DEFAULT_SPACING}>
          {LANDON}
          {SCHROPP}
        </DynamicSVG.Row>
      </g>

      <g key="subheading" role="doc-subititle">
        <title>Entrepreneur, Designer & Developer</title>
        <DynamicSVG.Row key="description" spacing={DEFAULT_SPACING}>
          {ENTREPRENEUR}
          {DEVELOPER}
          {AMPERSAND}
          {DESIGNER}
        </DynamicSVG.Row>
      </g>

      <g key="navigation" role="navigation">
        <DynamicSVG.Row key="navigation" spacing={WIDE_SPACING}>
          {WRITING}
          {NOTES}
          {TIL}
          {GITHUB}
          {CHESS_COM}
          {LINKED_IN}
          {EMAIL}
        </DynamicSVG.Row>
      </g>
    </DynamicSVG>
  );
}
