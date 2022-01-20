import "../stylesheets/index.sass";

import { Layout as ThemeLayout } from "landon-schropp-gatsby-theme";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

import { CATEGORIES } from "../data/constants";
import flannel from "../images/flannel.png";
import { MainNavigation } from "./main-navigation";

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
    { children }
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
