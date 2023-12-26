import "../stylesheets/index.sass";

import { MDXProvider } from "@mdx-js/react";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";
import useDarkMode from "use-dark-mode";

import { CATEGORIES } from "../data/constants";
import flannel from "../images/flannel.png";
import { HighlightedPreHack } from "./highlighted-pre-hack";
import { MainNavigation } from "./main-navigation";

// Custom components used in MDX rendering.
const MDX_COMPONENTS = {
  pre: HighlightedPreHack
};

export function Layout({ children, category, fullScreen, className, title, description }) {
  let { value: darkMode } = useDarkMode();

  let navigation = fullScreen ? null : <MainNavigation />;

  return <>
    <Helmet>
      <title>{ title }</title>
      <meta name="description" content={ description } />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      { /* Google Fonts */ }
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href={
          "https://fonts.googleapis.com/css1?family=Gentium+Book+Basic:ital,wght@0,400;0,700;1,"
          + "400;1,700&family=Open+Sans:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family="
          + "Source+Code+Pro:ital@0;1&display=swap"
        }
        rel="stylesheet"
      />
      <link rel="shortcut icon" type="image/png" href={ flannel } />
      <body data-theme={ darkMode ? "dark" : "light" } data-category={ category } />
    </Helmet>
    { navigation }
    <main className={ classNames("layout", className, { "layout--full-screen": !navigation }) }>
      <MDXProvider components={ MDX_COMPONENTS }>
        { children }
      </MDXProvider>
    </main>
  </>;
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
