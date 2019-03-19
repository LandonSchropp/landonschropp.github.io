// This function takes a URL and returns the base URL.
// TODO: Do this the right way with JavaScript.
module.exports = function baseURL(url) {
  let match = url.match(/.+:\/\/[^/]+/);
  return match ? match[0] : null;
};
