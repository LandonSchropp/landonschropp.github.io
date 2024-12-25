"use client";

import React from "react";
import { RefObject, useLayoutEffect } from "react";

type Size = [number, number];

/**
 * Returns the size of the element contained in the ref. This implementation uses a `ResizeObserver`
 * to observe the element's size and update the size state accordingly.
 * @param ref The element to measure.
 * @returns The size of the ref's element.
 */
export function useSize(ref: RefObject<Element | null>): Size {
  const [size, setSize] = React.useState<Size>([0, 0]);

  // This uses `useLayoutEffect` to ensure that the size of the component is returned _before_ the
  // screen is painted, allowing the size to be used during rendering calculations.
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      setSize([entry.contentRect.width, entry.contentRect.height]);
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return size;
}
