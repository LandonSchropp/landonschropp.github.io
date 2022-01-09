import chroma from "chroma-js";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { ArticlePropType } from "../data/prop-types";

const CORNFLOWER_BLUE = "#627ff6";
const BITTERSWEET = "#ff6d71";

export function ArticleSummary({ article, index, numberOfArticles }) {

  // Ideally this wouldn't need to be done in JavaScript. However, there's not currently a good way
  // to do this in pure CSS, and this effect is col enough that the effort is worth it.
  let color = chroma.mix(CORNFLOWER_BLUE, BITTERSWEET, index / (numberOfArticles - 1));

  return <Link
    style={ { "--color": color } }
    className="article-summary"
    to={ `/articles/${ article.slug }` }
  >
    <h3 className="article-summary__title">
      { article.title }
    </h3>
    <p className="article-summary__description">
      { article.description }
    </p>
  </Link>;
}

ArticleSummary.propTypes = {
  article: ArticlePropType.isRequired,
  index: PropTypes.number.isRequired,
  numberOfArticles: PropTypes.number.isRequired
};
