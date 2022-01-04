import PropTypes from "prop-types";
import React from "react";

export function Tag({ category }) {
  return <a className="tag" href={ `/notes/?type=${ category }` } data-category={ category }>
    { category }
  </a>;
}

Tag.propTypes = {
  category: PropTypes.string.isRequired
};
