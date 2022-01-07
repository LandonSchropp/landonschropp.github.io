import { Link } from "@reach/router";
import { useMediaQuery } from "@react-hook/media-query";
import PropTypes from "prop-types";
import React from "react";
import getBounds from "svg-path-bounds";

import { useIndexPageImages } from "../hooks/use-index-page-images";
import useIsClient from "../hooks/use-is-client";
import flannel from "../images/flannel.png";
import { Layout } from "../layout/layout";

const PORTRAIT_MEDIA_QUERY = "(max-aspect-ratio: 1 / 1)";

function Shape({ shape, d, points, className }) {
  if (shape === "polygon") {
    return <polygon className={ className } points={ points } />;
  }

  let [ left, top, right, bottom ] = getBounds(d);

  // Add an invisible box so hovers work for the full link area.
  return <>
    <rect x={ left } y={ top } width={ right - left } height={ bottom - top } fill="transparent" />
    <path className={ className } d={ d } />
  </>;
}

Shape.propTypes = {
  className: PropTypes.string,
  shape: PropTypes.oneOf([ "path", "polygon" ]),
  points: PropTypes.string,
  d: PropTypes.string
};

export default function IndexPage() {
  const isClient = useIsClient();
  const isPortrait = useMediaQuery(PORTRAIT_MEDIA_QUERY);
  let { portrait, landscape } = useIndexPageImages();
  let { viewBox, shapes } = isPortrait ? portrait : landscape;

  // Don't render anything if we're not on the client to force correct hydration.
  if (!isClient) {
    return null;
  }

  return <Layout
    className="index-page"
    title="Landon Schropp"
    description="Landon Schropp is a developer, designer and entrepreneur based in Kansas City."
  >

    <svg className="index-page__svg" viewBox={ viewBox }>
      <defs>
        <pattern id="flannel" patternUnits="userSpaceOnUse" width="80" height="80">
          <image href={ flannel } x="0" y="0" width="80" height="80" />
        </pattern>
      </defs>

      <g>
        <title>Landon Schropp</title>
        <Shape className="index-page__item" { ...shapes.landon } />
        <Shape className="index-page__item" { ...shapes.schropp } />
      </g>

      <g>
        <title>Entrepreneur, Designer & Developer</title>
        <Shape className="index-page__item" { ...shapes.entrepreneur } />
        {
          isPortrait
            ? null
            : <Shape className="index-page__item index-page__comma" { ...shapes.comma } />
        }
        <Shape className="index-page__item" { ...shapes["developer-and-designer"] } />
      </g>

      <Link className="index-page__link" to="/blog">
        <title>Blog</title>
        <Shape className="index-page__item" { ...shapes.blog } />
      </Link>

      <a className="index-page__link" href="https://unravelingflexbox.com">
        <title>Book</title>
        <Shape className="index-page__item" { ...shapes.book } />
      </a>

      <Link className="index-page__link" to="/notes">
        <title>Notes</title>
        <Shape className="index-page__item" { ...shapes.notes } />
      </Link>

      <a className="index-page__link" href="https://twitter.com/LandonSchropp">
        <title>Twitter</title>
        <Shape className="index-page__item" { ...shapes.twitter } />
      </a>

      <a className="index-page__link" href="https://github.com/LandonSchropp">
        <title>GitHub</title>
        <Shape className="index-page__item" { ...shapes.github } />
      </a>

      <a className="index-page__link" href="https://www.goodreads.com/landonschropp">
        <title>Goodreads</title>
        <Shape className="index-page__item" { ...shapes.goodreads } />
      </a>

      <a className="index-page__link" href="mailto:schroppl@gmail.com">
        <title>Email</title>
        <Shape className="index-page__item" { ...shapes.email } />
      </a>

      <a className="index-page__link" href="https://codepen.io/LandonSchropp/">
        <title>CodePen</title>
        <Shape className="index-page__item" { ...shapes.codepen } />
      </a>

      <a className="index-page__link" href="https://www.linkedin.com/in/landonschropp">
        <title>LinkedIn</title>
        <Shape className="index-page__item" { ...shapes.linkedin } />
      </a>
    </svg>
  </Layout>;
}
