import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { Article } from "../components/article";
import { Layout } from "../components/layout";

// NOTE: I'm using $slug here instead of ID because the transformed article node is no longer tied
// to the MDX node.
export const query = graphql`
  query Article($slug: String!) {
    mdx(frontmatter: { Slug: { eq: $slug } }) {
      body
    }
    article(slug: { eq: $slug }) {
      title
      slug
      description
      url
      date
      publisher
      published
    }
  }
`;

export default function ArticleTemplate({ data }) {
  return (
    <Layout title={`Landon Schropp - ${data.article.title}`} description={data.article.description}>
      <Article article={data.article} content={data.mdx.body} />
    </Layout>
  );
}

ArticleTemplate.propTypes = {
  data: PropTypes.object,
};
