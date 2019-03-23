import _ from 'lodash';

// This filter requires the property is defined and not empty. If it is, it passes the property
// through unmodified. If it isn't, it throws an error.
export default function required(value) {

  if (_.isNil(value) || value === "") {
    throw new Error("A required property was not defined.");
  }

  return value;
}
