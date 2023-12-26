/**
 * This function takes a URL and returns the base URL.
 */
export function baseURL(url: string) {
  return new URL(url).origin;
}
