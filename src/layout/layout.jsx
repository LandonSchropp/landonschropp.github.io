import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

export function Layout({ children, navigation }) {
  return <>
    <Helmet>
      <title>Landon Schropp</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" type="image/png" href="/images/flannel.png" />
    </Helmet>
    {children}
  </>;
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  navigation: PropTypes.bool.isRequired
}
