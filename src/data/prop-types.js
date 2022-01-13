import PropTypes from "prop-types";

import { CATEGORIES, MEDIA } from "./constants";

function validateDateString(props, propName) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(props[propName])) {
    return new Error(
      `${ propName }'s value '${ props[propName] }' is not a valid ISO date string ('YYYY-MM-DD').`
    );
  }
}

export const NotePropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: validateDateString,
  category: PropTypes.oneOf(CATEGORIES),
  media: PropTypes.oneOf(MEDIA),
  source: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired
});

export const ArticlePropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  date: validateDateString,
  description: PropTypes.string.isRequired,
  url: PropTypes.string,
  publisher: PropTypes.string,
  published: PropTypes.bool.isRequired
});
