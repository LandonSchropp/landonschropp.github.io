import chroma from "chroma-js";
import { Link } from "gatsby";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import { ArticlePropType } from "../data/prop-types";

const CORNFLOWER_BLUE = "#627ff6";
const BITTERSWEET = "#ff6d71";

function ArticleLink({ article, children, ...props }) {
  if (_.isNil(article.url)) {
    return (
      <Link to={`/articles/${article.slug}`} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={article.url} {...props}>
      {children}
    </a>
  );
}

ArticleLink.propTypes = {
  article: ArticlePropType.isRequired,
  children: PropTypes.node.isRequired,
};

export function ArticleSummary({ article, index, numberOfArticles }) {
  // Ideally this wouldn't need to be done in JavaScript. However, there's not currently a good way
  // to do this in pure CSS, and this effect is col enough that the effort is worth it.
  let color = chroma.mix(CORNFLOWER_BLUE, BITTERSWEET, index / (numberOfArticles - 1));

  return (
    <ArticleLink article={article} style={{ "--color": color }} className="article-summary">
      <h3 className="article-summary__title">{article.title}</h3>
      <p className="article-summary__description">{article.description}</p>
    </ArticleLink>
  );
}

ArticleSummary.propTypes = {
  article: ArticlePropType.isRequired,
  index: PropTypes.number.isRequired,
  numberOfArticles: PropTypes.number.isRequired,
};
