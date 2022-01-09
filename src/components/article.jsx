import { MDXRenderer } from "gatsby-plugin-mdx";
import PropTypes from "prop-types";
import React from "react";

import { ArticlePropType } from "../data/prop-types";

export function Article({ article, content }) {
  return <article className="article">
    <h1 className="article__title">{ article.title }</h1>
    <MDXRenderer>
      { content }
    </MDXRenderer>
  </article>;
}

Article.propTypes = {
  article: ArticlePropType.isRequired,
  content: PropTypes.string.isRequired
};
