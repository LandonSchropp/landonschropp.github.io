import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

export function Tag({ category }) {
  return <Link className="tag" to={ `/notes/?category=${ category }` } data-category={ category }>
    { category }
  </Link>;
}

Tag.propTypes = {
  category: PropTypes.string.isRequired
};
