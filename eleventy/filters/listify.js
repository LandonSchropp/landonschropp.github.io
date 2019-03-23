import _ from 'lodash';

// Converts an array of strings into a connected list of strings.
export default function listify(items) {
  if (_.isString(items)) {
    return items;
  }

  if (items.length <= 1) {
    return items[0];
  }

  return `${ _.initial(items).join(", ") } and ${ _.last(items) }`;
}
