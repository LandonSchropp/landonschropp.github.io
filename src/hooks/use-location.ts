import { useCallback, useEffect, useState } from "react";

/**
 * A client hook that returns the current location and methods to update it.
 */
export function useLocation() {
  let [href, setHref] = useState(window.location.href);

  useEffect(() => setHref(window.location.href), [window.location.href]);

  /**
   * Pushes the given URL into the browser's history.
   */
  let pushUrl = useCallback((href: string) => {
    window.history.pushState({}, "", href);
  }, []);

  /**
   * Replaces the current URL with the given one in the browser's history.
   */
  let replaceUrl = useCallback((url: string) => {
    window.history.replaceState({}, "", url);
  }, []);

  /**
   * If the URL contains a search param, this removes it and returns its value.
   */
  let popSearchParam = useCallback(
    (param: string): string | null => {
      const url = new URL(href);

      if (!url.searchParams.has(param)) {
        return null;
      }

      let value = url.searchParams.get(param);
      url.searchParams.delete(param);
      replaceUrl(url.toString());

      return value;
    },
    [href, replaceUrl],
  );

  return {
    href,
    pushUrl,
    replaceUrl,
    popSearchParam,
  };
}
