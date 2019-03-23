// This function takes a URL and returns the base URL.
export default function baseURL(url) {
  return new URL(url).origin;
}
