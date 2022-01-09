import { format, parseISO } from "date-fns";
import { MDXRenderer } from "gatsby-plugin-mdx";
import PropTypes from "prop-types";
import React from "react";

import { ArticlePropType } from "../data/prop-types";

export function Article({ article, content }) {
  return <article className="article">
    <header className="header">
      <h1 className="header__header">
        { article.title }
      </h1>
      <div className="header__subhead" data-test-id="subhead">
        <span rel="author">Landon Schropp</span>
        { " " }
        •
        { " " }
        <time dateTime={ article.date }>{ format(parseISO(article.date), "PPP") }</time>

      </div>
    </header>

    <MDXRenderer>
      { content }
    </MDXRenderer>
  </article>;
}

Article.propTypes = {
  article: ArticlePropType.isRequired,
  content: PropTypes.string.isRequired
};
