import _ from "lodash";

/**
 * Maps collection (such as an array) to an object.
 * @param collection The collection to map.
 * @param iterable A function that should return an array of two elements: the key and the value.
 * @return The constructed object.
 */
export function mapToObject(collection, iteratee) {
  return _.fromPairs(_.map(collection, iteratee));
}
