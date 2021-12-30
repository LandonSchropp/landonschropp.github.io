import { useMediaQuery } from "@react-hook/media-query";
import PropTypes from "prop-types";
import React from "react";

import { useIndexPageImages } from "../hooks/use-index-page-images";
import useIsClient from "../hooks/use-is-client";
import flannel from "../images/flannel.png";
import { Layout } from "../layout/layout";

const PORTRAIT_MEDIA_QUERY = "(max-aspect-ratio: 1 / 1)";

function Shape({ shape, d, points, className }) {
  if (shape === "polygon") {
    return <polygon className={ className } points={ points } />;
  }

  return <path className={ className } d={ d } />;
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

  return <Layout navigation={ false }>
    <main className="index-page">
      <svg className="index-page__svg" viewBox={ viewBox }>
        <defs>
          <pattern id="flannel" patternUnits="userSpaceOnUse" width="80" height="80">
            <image xlinkHref={ flannel } x="0" y="0" width="80" height="80" />
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
          <Shape className="index-page__item index-page__comma" { ...shapes.comma } />
          <Shape className="index-page__item" { ...shapes["developer-and-designer"] } />
        </g>

        <a
          className="index-page__link"
          xlinkHref="https://medium.com/@LandonSchropp"
        >
          <title>Blog</title>
          <Shape className="index-page__item" { ...shapes.blog } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://unravelingflexbox.com"
        >
          <title>Book</title>
          <Shape className="index-page__item" { ...shapes.book } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="/notes"
        >
          <title>Notes</title>
          <Shape className="index-page__item" { ...shapes.notes } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://twitter.com/LandonSchropp"
        >
          <title>Twitter</title>
          <Shape className="index-page__item" { ...shapes.twitter } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://github.com/LandonSchropp"
        >
          <title>GitHub</title>
          <Shape className="index-page__item" { ...shapes.github } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://www.goodreads.com/landonschropp"
        >
          <title>Goodreads</title>
          <Shape className="index-page__item" { ...shapes.goodreads } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="mailto:schroppl@gmail.com"
        >
          <title>Email</title>
          <Shape className="index-page__item" { ...shapes.email } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://codepen.io/LandonSchropp/"
        >
          <title>CodePen</title>
          <Shape className="index-page__item" { ...shapes.codepen } />
        </a>

        <a
          className="index-page__link"
          xlinkHref="https://www.linkedin.com/in/landonschropp"
        >
          <title>LinkedIn</title>
          <Shape className="index-page__item" { ...shapes.linkedin } />
        </a>
      </svg>
    </main>
  </Layout>;
}
