import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import { useMediaQuery } from "@react-hook/media-query";
import React from "react";

import flannel from "../images/flannel.png";
import Landscape from "../images/landing/landscape.svg";
import Portrait from "../images/landing/portrait.svg";
import { Layout } from "../layout/layout";
import { mapToObject } from "../utilities/array";

const PORTRAIT_MEDIA_QUERY = "(max-aspect-ratio: 1 / 1)";

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
  const templateRef = useStatefulRef();
  const isPortrait = useMediaQuery(PORTRAIT_MEDIA_QUERY);

  const TEMPLATE_PATHS = fetchTemplatePaths(templateRef);

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
      </svg>
    </main>
  </Layout>;
}
