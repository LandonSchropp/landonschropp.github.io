"use client";

import { DynamicSVG } from "@/components/dynamic-svg";
import { NAME } from "@/constants";
import * as DATA from "@/data/svg";

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

const WRITING = (
  <DynamicSVG.Link href="/articles" title="Writing" key="writing">
    <DynamicSVG.Shape key="writing" {...DATA.writing} />
  </DynamicSVG.Link>
);

const NOTES = (
  <DynamicSVG.Link href="/notes" title="Notes" key="notes">
    <DynamicSVG.Shape key="notes" {...DATA.notes} />
  </DynamicSVG.Link>
);

const TIL = (
  <DynamicSVG.Link href="/today-i-learned" title="Today I Learned" key="til">
    <DynamicSVG.Shape key="til" {...DATA.til} />
  </DynamicSVG.Link>
);

const GITHUB = (
  <DynamicSVG.Link href="https://github.com/LandonSchropp" title="GitHub" key="github">
    <DynamicSVG.Shape key="github" {...DATA.github} />
  </DynamicSVG.Link>
);

const CHESS_COM = (
  <DynamicSVG.Link href="https://www.chess.com/member/landon" title="Chess.com" key="chess-com">
    <DynamicSVG.Shape key="chess-com" {...DATA.chessCom} />
  </DynamicSVG.Link>
);

const LINKED_IN = (
  <DynamicSVG.Link href="https://linkedin.com/in/landonschropp" title="LinkedIn" key="linked-in">
    <DynamicSVG.Shape key="linked-in" {...DATA.linkedIn} />
  </DynamicSVG.Link>
);

const EMAIL = (
  <DynamicSVG.Link href="mailto:schroppl@gmail.com" title="Email" key="email">
    <DynamicSVG.Shape key="email" {...DATA.email} />
  </DynamicSVG.Link>
);

export default function IndexPage() {
  return (
    <DynamicSVG minSpacing={MIN_VERTICAL_SPACING} maxSpacing={MAX_VERTICAL_SPACING}>
      <DynamicSVG.Group title={NAME} key="heading" role="heading">
        <DynamicSVG.Row key="name" spacing={DEFAULT_SPACING}>
          {LANDON}
          {SCHROPP}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group
        title="Entrepreneur, Designer & Developer"
        key="subheading"
        role="doc-subititle"
      >
        <DynamicSVG.Row key="description" spacing={DEFAULT_SPACING}>
          {ENTREPRENEUR}
          {DEVELOPER}
          {AMPERSAND}
          {DESIGNER}
        </DynamicSVG.Row>
      </DynamicSVG.Group>

      <DynamicSVG.Group key="navigation" role="navigation">
        <DynamicSVG.Row key="navigation" spacing={WIDE_SPACING}>
          {WRITING}
          {NOTES}
          {TIL}
          {GITHUB}
          {CHESS_COM}
          {LINKED_IN}
          {EMAIL}
        </DynamicSVG.Row>
      </DynamicSVG.Group>
    </DynamicSVG>
  );
}
