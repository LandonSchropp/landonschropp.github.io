import { useCallback, useEffect, useState } from "react";

export function useLocation() {
  let [href, setHref] = useState(window.location.href);

  useEffect(() => setHref(window.location.href), [window.location.href]);

  let pushHref = useCallback((href: string) => {
    window.history.pushState({}, "", href);
  }, []);

  let replaceHref = useCallback((href: string) => {
    window.history.replaceState({}, "", href);
  }, []);

  return {
    href,
    pushHref,
    replaceHref,
  };
}
