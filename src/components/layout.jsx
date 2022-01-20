import "../stylesheets/index.sass";

import { MDXProvider } from "@mdx-js/react";
import { Layout as ThemeLayout } from "landon-schropp-gatsby-theme";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

import { CATEGORIES } from "../data/constants";
import flannel from "../images/flannel.png";
import { HighlightedPreHack } from "./highlighted-pre-hack";
import { MainNavigation } from "./main-navigation";

// Custom components used in MDX rendering.
const MDX_COMPONENTS = {
  pre: HighlightedPreHack
};

export function Layout({ children, category, fullScreen, ...props }) {
  return <ThemeLayout
    { ...props }
    fullScreen={ fullScreen }
    navigation={ fullScreen ? null : <MainNavigation /> }
  >
    <Helmet>
      <link rel="shortcut icon" type="image/png" href={ flannel } />
      <body data-category={ category } />
    </Helmet>
    <MDXProvider components={ MDX_COMPONENTS }>
      { children }
    </MDXProvider>
  </ThemeLayout>;
}

Layout.defaultProps = {
  fullScreen: false
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.oneOf(CATEGORIES),
  fullScreen: PropTypes.bool
};
