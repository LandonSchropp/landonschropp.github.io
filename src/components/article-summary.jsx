import { Link } from "gatsby";
import React from "react";

import { ArticlePropType } from "../data/prop-types";

export function ArticleSummary({ article }) {

  return <Link
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
  article: ArticlePropType.isRequired
};
// <span className="article-summary__authors">
// <Listify items={ article.authors } />
// </span>
// { " " }
// <span className="article-summary__separator">∙</span>
// { " " }
// <span className="article-summary__source">
// { article.source }
// </span>
