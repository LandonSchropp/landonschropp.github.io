import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import Highlight from "react-highlight";

export function HighlightedPre({ children }) {

  // HACK: This bridges the MDX renderer component to Highlight.js. As a result, we have to traverse
  // the child components to get language.
  const className = children.props.className || "";
  let language = (className?.match(/language-(\w+)/) ?? [])[1];

  if (_.isNil(language)) {
    return <pre><code>{ children }</code></pre>;
  }

  return <Highlight language={ language }>{ children }</Highlight>;
}

HighlightedPre.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
