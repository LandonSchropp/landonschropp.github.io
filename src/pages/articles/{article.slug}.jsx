import { graphql } from "gatsby";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import { Article } from "../../components/article";
import { Layout } from "../../layout/layout";

// NOTE: I'm using $slug here instead of ID because the transformed article node is no longer tied
// to the MDX node.
export const query = graphql`
  query Article($slug: String) {
    mdx(frontmatter: {Slug: {eq: $slug}}) {
      body
    }
    article(slug: {eq: $slug}) {
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

// HACK: This uses the deferral API to prevent articles from being statically generated. Since this
// site is not hosted with a Gatsby server, this prevents the pages from ever being generated.
export async function config() {
  const { data } = graphql`
    query ArticleUrls {
      allArticle {
        nodes {
          slug
          url
        }
      }
    }
  `;

  return ({ params: { slug } }) => {
    let url = _.find(data.allArticle.nodes, { slug })?.url;
    return { defer: !_.isNil(url) };
  };
}

export default function ArticlePage({ data }) {
  return <Layout
    title={ `Landon Schropp - ${ data.article.title }` }
    description={ data.article.description }
  >
    <Article article={ data.article } content={ data.mdx.body } />
  </Layout>;
}

ArticlePage.propTypes = {
  data: PropTypes.object
};
