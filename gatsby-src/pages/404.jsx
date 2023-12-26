import _ from "lodash";
import React from "react";

import { Layout } from "../components/layout";
import { useSVGData } from "../hooks/use-svg-data";
import flannel from "../images/flannel.png";

// TODO: Deduplciate this with IndexPage.
export default function NotFoundPage() {
  let { viewBox, shapes } = useSVGData("notFound");

  // TODO: The shape should be extracted by the key rather than the array index.
  let shape = _.values(shapes)[0];

  return (
    <Layout
      className="index-page"
      title="Landon Schropp – 404"
      description="The page you were looking for couldn't be found."
      fullScreen
    >
      <svg className="index-page__svg" viewBox={viewBox}>
        <defs>
          <pattern id="flannel" patternUnits="userSpaceOnUse" width="80" height="80">
            <image href={flannel} x="0" y="0" width="80" height="80" />
          </pattern>
        </defs>

        <title role="heading">404</title>
        <path className="index-page__item" {...shape} />
      </svg>
    </Layout>
  );
}
