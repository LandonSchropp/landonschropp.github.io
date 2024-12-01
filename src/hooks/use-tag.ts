import { useStore } from "@nanostores/react";
import { WritableAtom } from "nanostores";
import { useCallback, useEffect } from "react";

/**
 * A hook that makes it easy to set the "data-tag" attribute of the body element based based on the
 * current page's tag. This is necessary because Next.js does not support setting layout attributes
 * on a per-page basis. This hook is meant to be wrapped.
 * @typeParam T The type of the tag.
 * @param attribute The name of the data attribute to set on the body element. This should not
 * include the `data-` prefix.
 * @param $store The store that contains the value of the current tag.
 * @returns A tuple containing the current tag and a function to set the tag.
 */
export function useTag<T extends string>(attribute: string, $store: WritableAtom<T | null>) {
  const tag = useStore($store);
  const setTag = useCallback((tag: T | null) => $store.set(tag), [$store]);

  // If the technology changes, update the data attributes of the body element.
  useEffect(() => {
    if (tag) {
      document.body.dataset[attribute] = tag;
    } else {
      delete document.body.dataset[attribute];
    }
  }, [tag, attribute]);

  return [tag, setTag] as const;
}
