import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import { useMediaQuery } from "@react-hook/media-query";
import React from "react";

import flannel from "../images/flannel.png";
import Landscape from "../images/landing/landscape.svg";
import Portrait from "../images/landing/portrait.svg";
import { Layout } from "../layout/layout";

const PORTRAIT_MEDIA_QUERY = "(max-aspect-ratio: 1 / 1)";

// TODO: Ideally, instead of querying the DOM for the SVG properties, the SVG object could be
// queried at render time. However, this has proven to be very difficult inside of Gatsby. This is a
// functional workaround for now, but in the future it should be replaced with a better
// implementation.
function fetchTemplateAttribute(templateRef, selector, attribute) {

  // Ensure the ref is populated.
  if (!templateRef.current) {
    return null;
  }

  // Fetch the selector.
  let element = templateRef.current.querySelector(selector);

  if (!element) {
    throw new Error(`An element with the selector '${ selector } could not be found.'`);
  }

  return element.getAttribute(attribute);
}

export default function IndexPage() {
  const templateRef = useStatefulRef();
  const isPortrait = useMediaQuery(PORTRAIT_MEDIA_QUERY);

  return <Layout navigation={ false }>
    <main className="index-page">
      <div className="index-page__template" ref={ templateRef }>
        { isPortrait ? <Portrait /> : <Landscape /> }
      </div>
      <svg
        className="index-page__svg"
        viewBox="0 0 1296 445"
        role="main"
      >
        <defs>
          <pattern id="flannel" patternUnits="userSpaceOnUse" width="80" height="80">
            <image xlinkHref={ flannel } x="0" y="0" width="80" height="80" />
          </pattern>
        </defs>

        <g aria-label="Entrepreneur, Designer & Developer">
          <path
            className="index-page__item"
            d={ fetchTemplateAttribute(templateRef, "#entrepreneur", "d") }
          />
          <polygon
            className="index-page__item index-page__comma"
            points={ fetchTemplateAttribute(templateRef, "#comma", "points") }
          />
          <path
            className="index-page__item"
            d={ fetchTemplateAttribute(templateRef, "#developer-and-designer", "d") }
          />
        </g>
      </svg>
    </main>
  </Layout>;
}
