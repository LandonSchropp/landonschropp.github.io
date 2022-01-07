import "@testing-library/jest-dom";

import { configure } from "@testing-library/dom";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

// Monkey patch Jest so that tests written without a function implementation are marked as `todo`.
const it = global.it;

const wrappedIt = (description, func) => {
  if (_.isNil(func)) {
    return it.todo(description);
  }

  return it(description, func);
};

global.it = new Proxy(wrappedIt, {
  get: (target, prop) => {
    return it[prop];
  }
});

// Mock the MDXRenderer to avoid compilation errors.
function MockMDXRenderer({ children }) {
  return <div>{ children }</div>;
}

MockMDXRenderer.propTypes = {
  children: PropTypes.node
};

jest.mock("gatsby-plugin-mdx", () => {
  return { MDXRenderer: MockMDXRenderer };
});

// Configure the testing library.
configure({ testIdAttribute: "data-test-id" });
