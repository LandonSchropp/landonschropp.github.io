import PropTypes from "prop-types";
import React from "react";

export function Icon({ name, alt }) {
  return <span>{ name }</span>;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
