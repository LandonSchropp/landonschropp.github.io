import "../stylesheets/index.sass";

import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

import { MainNavigation } from "./main-navigation";

export function Layout({ children, className }) {
  return <>
    <Helmet>
      <title>Landon Schropp</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" type="image/png" href="/images/flannel.png" />

      { /* Google Fonts */ }
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href={
          "https://fonts.googleapis.com/css2?family=Gentium+Book+Basic:ital,wght@0,400;0,700;1,"
          + "400;1,700&family=Open+Sans:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family="
          + "Source+Code+Pro:ital@0;1&display=swap"
        }
        rel="stylesheet"
      />
    </Helmet>
    <MainNavigation />
    <main className={ className }>
      { children }
    </main>
  </>;
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};
