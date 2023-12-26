import classNames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import { importHash } from "../utilities/import";

const ICONS = importHash(require.context("../images/icons", false, /\.svg$/));

export function Icon({ name, alt, className }) {
  if (!_.has(ICONS, name)) {
    throw new Error(`Couldn't find an icon with the name '${name}'.`);
  }

  let IconComponent = ICONS[name];

  return <IconComponent className={classNames("icon", className)} alt={alt} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};
