import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import { useMediaQuery } from "@react-hook/media-query";
import React from "react";

import useIsClient from "../hooks/use-is-client";
import flannel from "../images/flannel.png";
import Landscape from "../images/landing/landscape.svg";
import Portrait from "../images/landing/portrait.svg";
import { Layout } from "../layout/layout";
import { mapToObject } from "../utilities/array";

const LANDSCAPE_MEDIA_QUERY = "(max-aspect-ratio: 1 / 1)";

function fetchTemplateViewBox(templateRef) {
  return templateRef?.current?.querySelector("svg")?.getAttribute("viewBox");
}

// TODO: Ideally, instead of querying the DOM for the SVG properties, the SVG object could be
// queried at render time. However, this has proven to be very difficult inside of Gatsby. This is a
// functional workaround for now, but in the future it should be replaced with a better
// implementation.
function fetchTemplatePaths(templateRef) {

  // Ensure the ref is populated.
  if (!templateRef.current) {
    return {};
  }

  // Grab all of the IDed elements.
  return mapToObject(
    templateRef.current.querySelectorAll("path[id], polygon[id]"),
    element => {
      return [ element.id, element.getAttribute("d") ?? element.getAttribute("points") ];
    }
  );
}

export default function IndexPage() {
  const isClient = useIsClient();
  const templateRef = useStatefulRef();
  const isLandscape = useMediaQuery(LANDSCAPE_MEDIA_QUERY);

  // Don't render anything if we're not on the client to force correct hydration.
  if (!isClient) {
    return null;
  }

  const TEMPLATE_PATHS = fetchTemplatePaths(templateRef);

  return <Layout navigation={ false }>
    <main className="index-page">
      <div className="index-page__template" ref={ templateRef }>
        { isLandscape ? <Landscape /> : <Portrait /> }
      </div>
      <svg className="index-page__svg" viewBox={ fetchTemplateViewBox(templateRef) }>
        <defs>
          <pattern id="flannel" patternUnits="userSpaceOnUse" width="80" height="80">
            <image xlinkHref={ flannel } x="0" y="0" width="80" height="80" />
          </pattern>
        </defs>

        <g>
          <title>Landon Schropp</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["landon"] } />
          <path className="index-page__item" d={ TEMPLATE_PATHS["schropp"] } />
        </g>

        <g>
          <title>Entrepreneur, Designer & Developer</title>
          <path
            className="index-page__item"
            d={ TEMPLATE_PATHS["entrepreneur"] }
          />
          <polygon
            className="index-page__item index-page__comma"
            points={ TEMPLATE_PATHS["comma"] }
          />
          <path
            className="index-page__item"
            d={ TEMPLATE_PATHS["developer-and-designer"] }
          />
        </g>

        <a
          className="index-page__link"
          xlinkHref="https://medium.com/@LandonSchropp"
        >
          <title>Blog</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["blog"] } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://unravelingflexbox.com"
        >
          <title>Book</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["book"] } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="/notes"
        >
          <title>Notes</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["notes"] } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://twitter.com/LandonSchropp"
        >
          <title>Twitter</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["twitter"] } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://github.com/LandonSchropp"
        >
          <title>GitHub</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["github"] } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://www.goodreads.com/landonschropp"
        >
          <title>Goodreads</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["goodreads"] } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="mailto:schroppl@gmail.com"
        >
          <title>Email</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["email"] } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://codepen.io/LandonSchropp/"
        >
          <title>CodePen</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["codepen"] } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://www.linkedin.com/in/landonschropp"
        >
          <title>LinkedIn</title>
          <path className="index-page__item" d={ TEMPLATE_PATHS["linkedin"] } />
        </a>
      </svg>
    </main>
  </Layout>;
}
