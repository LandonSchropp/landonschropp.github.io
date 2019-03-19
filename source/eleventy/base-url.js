// This function takes a URL and returns the base URL.
module.exports = function baseURL(url) {
  return new URL(url).origin;
};
