import PropTypes from "prop-types";

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
  category: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  published: PropTypes.bool.isRequired
});
