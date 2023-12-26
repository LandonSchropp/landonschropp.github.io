import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Book from "../images/icons/book.svg";

export function Callout({ className, children }) {
  return (
    <section className={classNames("callout", className)}>
      <figure className="callout__figure">
        <Book className="callout__icon" />
      </figure>
      <p className="callout__content">{children}</p>
    </section>
  );
}

Callout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
