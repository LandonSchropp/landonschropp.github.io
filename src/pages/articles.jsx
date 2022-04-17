import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { ArticleSummary } from "../components/article-summary";
import { Callout } from "../components/callout";
import { Header } from "../components/header";
import { Layout } from "../components/layout";

export const query = graphql`
  query Articles {
    articles {
      title
      slug
      date
      description
      url
      publisher
      published
    }
  }
`;

export default function ArticlesPage({ data }) {
  let articles = data.articles;

  return <Layout
    title="Landon Schropp - Notes"
    description="My personal notes on blog posts, talks, podcasts and books."
  >
    <Header
      title="Writing"
      subText={ <>Here&apos;s my published writing from all over the web.</> }
    />

    <Callout header="I Wrote a Book!">
      In 2015 I wrote the book <a href="https://unravelingflexbox.com">Unraveling Flexbox</a>,
      the ultimate guide to building modern CSS layouts with flexbox.
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
