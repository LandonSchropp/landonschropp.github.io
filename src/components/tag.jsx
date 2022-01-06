import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export function Tag({ category, onClick, selected }) {
  return <button
    type="button"
    className={ classNames("tag", { "tag--selected": selected }) }
    data-category={ category }
    onClick={ onClick }
  >
    { category }
  </button>;
}

Tag.propTypes = {
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};
