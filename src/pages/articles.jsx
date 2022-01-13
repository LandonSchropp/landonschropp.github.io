import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { ArticleSummary } from "../components/article-summary";
import { Callout } from "../components/callout";
import { Layout } from "../layout/layout";

export const query = graphql`
  query Articles {
    allArticle(sort: {fields: [date], order: DESC}) {
      nodes {
        title
        slug
        date
        description
        url
        publisher
        published
      }
    }
  }
`;

export default function ArticlesPage({ data }) {
  let articles = data.allArticle.nodes;

  return <Layout
    title="Landon Schropp - Notes"
    description="My personal notes on blog posts, talks, podcasts and books."
  >

    <header className="header">
      <h1 className="header__header">
        Writing
      </h1>

      <p className="header__subhead">
        Here&apos;s my published writing from all over the web.
      </p>
    </header>

    <Callout header="I Wrote a Book!">
      In 2015 I wrote the book <a href="https://unravelingflexbox.com">Unraveling Flexbox</a>:
      The Ultimate Guide to Building Modern CSS Layouts With Flexbox.
    </Callout>

    <section className="note-summaries">
      {
        articles.map((article, index) => {
          return <ArticleSummary
            key={ article.slug }
            article={ article }
            index={ index }
            numberOfArticles={ articles.length }
          />;
        })
      }
    </section>
  </Layout>;
}

ArticlesPage.propTypes = {
  data: PropTypes.object
};
