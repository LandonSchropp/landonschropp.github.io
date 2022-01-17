import { format, parseISO } from "date-fns";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Header } from "landon-schropp-theme";
import PropTypes from "prop-types";
import React from "react";

import { ArticlePropType } from "../data/prop-types";

export function Article({ article, content }) {
  return <article className="article">
    <Header
      title={ article.title }
      subText={
        <>
          <span rel="author">Landon Schropp</span>
          { " " }
          •
          { " " }
          <time dateTime={ article.date }>{ format(parseISO(article.date), "PPP") }</time>
        </>
      }
    />

    <MDXRenderer>
      { content }
    </MDXRenderer>
  </article>;
}

Article.propTypes = {
  article: ArticlePropType.isRequired,
  content: PropTypes.string.isRequired
};
