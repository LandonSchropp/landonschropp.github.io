"use client";

import { DynamicSVG } from "@/components/dynamic-svg";
import { NAME } from "@/constants";
import * as DATA from "@/data/svg";

const DEFAULT_SPACING = 0.3;
const WIDE_SPACING = 0.5;
const EXTRA_WIDE_SPACING = 1.0;

const LANDSCAPE_MIN_SPACING = 0.02;
const LANDSCAPE_MAX_SPACING = 0.06;
const PORTRAIT_MIN_SPACING = 0.05;
const PORTRAIT_MAX_SPACING = 0.12;

export default function IndexPage() {
  const landon = <DynamicSVG.Shape key="landon" {...DATA.landon} />;
  const schropp = <DynamicSVG.Shape key="schropp" {...DATA.schropp} />;

  const entrepreneur = <DynamicSVG.Shape key="entrepreneur" {...DATA.entrepreneur} />;
  const entrepreneurComma = <DynamicSVG.Shape key="entrepreneur" {...DATA.entrepreneurComma} />;
  const developer = <DynamicSVG.Shape key="developer" {...DATA.developer} />;
  const ampersand = <DynamicSVG.Shape key="ampersand" {...DATA.ampersand} />;
  const designer = <DynamicSVG.Shape key="designer" {...DATA.designer} />;

  const writing = (
    <DynamicSVG.Link href="/articles" title="Writing" key="writing">
      <DynamicSVG.Shape key="writing" {...DATA.writing} />
    </DynamicSVG.Link>
  );

  const notes = (
    <DynamicSVG.Link href="/notes" title="Notes" key="notes">
      <DynamicSVG.Shape key="notes" {...DATA.notes} />
    </DynamicSVG.Link>
  );

  const til = (
    <DynamicSVG.Link href="/today-i-learned" title="Today I Learned" key="til">
      <DynamicSVG.Shape key="til" {...DATA.til} />
    </DynamicSVG.Link>
  );

  const gitHub = (
    <DynamicSVG.Link href="https://github.com/LandonSchropp" title="GitHub" key="github">
      <DynamicSVG.Shape key="github" {...DATA.github} />
    </DynamicSVG.Link>
  );

  const chessCom = (
    <DynamicSVG.Link href="https://www.chess.com/member/landon" title="Chess.com" key="chess-com">
      <DynamicSVG.Shape key="chess-com" {...DATA.chessCom} />
    </DynamicSVG.Link>
  );

  const linkedIn = (
    <DynamicSVG.Link href="https://linkedin.com/in/landonschropp" title="LinkedIn" key="linked-in">
      <DynamicSVG.Shape key="linked-in" {...DATA.linkedIn} />
    </DynamicSVG.Link>
  );

  const email = (
    <DynamicSVG.Link href="mailto:schroppl@gmail.com" title="Email" key="email">
      <DynamicSVG.Shape key="email" {...DATA.email} />
    </DynamicSVG.Link>
  );

  return (
    <DynamicSVG>
      <DynamicSVG.Aspect
        key="landscale"
        minSpacing={LANDSCAPE_MIN_SPACING}
        maxSpacing={LANDSCAPE_MAX_SPACING}
      >
        <DynamicSVG.Group title={NAME} key="heading" role="heading">
          <DynamicSVG.Row key="name" spacing={DEFAULT_SPACING}>
            {landon}
            {schropp}
          </DynamicSVG.Row>
        </DynamicSVG.Group>

        <DynamicSVG.Group
          title="Entrepreneur, Designer & Developer"
          key="subheading"
          role="doc-subititle"
        >
          <DynamicSVG.Row key="description" spacing={DEFAULT_SPACING}>
            {entrepreneurComma}
            {developer}
            {ampersand}
            {designer}
          </DynamicSVG.Row>
        </DynamicSVG.Group>

        <DynamicSVG.Group key="navigation" role="navigation">
          <DynamicSVG.Row key="navigation" spacing={WIDE_SPACING}>
            {writing}
            {notes}
            {til}
            {gitHub}
            {chessCom}
            {linkedIn}
            {email}
          </DynamicSVG.Row>
        </DynamicSVG.Group>
      </DynamicSVG.Aspect>
      <DynamicSVG.Aspect
        key="portrait"
        minSpacing={PORTRAIT_MIN_SPACING}
        maxSpacing={PORTRAIT_MAX_SPACING}
      >
        <DynamicSVG.Group title={NAME} key="heading" role="heading">
          <DynamicSVG.Row key="first-name" spacing={DEFAULT_SPACING}>
            {landon}
          </DynamicSVG.Row>
          <DynamicSVG.Row key="last-name" spacing={DEFAULT_SPACING}>
            {schropp}
          </DynamicSVG.Row>
        </DynamicSVG.Group>

        <DynamicSVG.Group
          title="Entrepreneur, Designer & Developer"
          key="subheading"
          role="doc-subititle"
        >
          <DynamicSVG.Row key="entrepreneur" spacing={DEFAULT_SPACING}>
            {entrepreneur}
          </DynamicSVG.Row>
          <DynamicSVG.Row key="developer-and-designer" spacing={DEFAULT_SPACING}>
            {developer}
            {ampersand}
            {designer}
          </DynamicSVG.Row>
        </DynamicSVG.Group>

        <DynamicSVG.Group key="navigation" role="navigation">
          <DynamicSVG.Row key="internal-navigation" spacing={WIDE_SPACING}>
            {writing}
            {notes}
            {til}
          </DynamicSVG.Row>
          <DynamicSVG.Row key="external-navigation" spacing={EXTRA_WIDE_SPACING}>
            {gitHub}
            {chessCom}
            {linkedIn}
            {email}
          </DynamicSVG.Row>
        </DynamicSVG.Group>
      </DynamicSVG.Aspect>
    </DynamicSVG>
  );
}
