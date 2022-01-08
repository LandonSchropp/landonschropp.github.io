import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import flannel from "../images/flannel.png";
import { Layout } from "../layout/layout";

export const query = graphql`
  query NotFoundQuery {
    indexPageImage(name: {eq: "not-found"}) {
      viewBox
      shapes { id d points shape }
    }
  }
`;

// TODO: Deduplciate this with IndexPage.
export default function NotFoundPage({ data: { indexPageImage: { viewBox, shapes } } }) {
  return <Layout
    className="index-page"
    title="Landon Schropp – 404"
    description="The page you were looking for couldn't be found."
    navigation={ false }
  >

    <svg className="index-page__svg" viewBox={ viewBox }>
      <defs>
        <pattern id="flannel" patternUnits="userSpaceOnUse" width="80" height="80">
          <image href={ flannel } x="0" y="0" width="80" height="80" />
        </pattern>
      </defs>

      <title role="heading">404</title>
      <path className="index-page__item" { ...shapes[0] } />
    </svg>
  </Layout>;
}

NotFoundPage.propTypes = {
  data: PropTypes.object
};
