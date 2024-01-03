import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * This hook wraps the Next.js search params and router hooks, and provides a way to get and set a
 * single search param.
 */
export default function useSearchParam(name: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParam = searchParams?.get(name) ?? null;

  const setSearchParam = useCallback(
    (value: string | null) => {
      if (!searchParams) return;

      const updatedSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

      if (value) {
        updatedSearchParams.set(name, value);
      } else {
        updatedSearchParams.delete(name);
      }

      const query = updatedSearchParams.size === 0 ? "" : `?${updatedSearchParams}`;
      router.replace(`${pathname}${query}`);
    },
    [name, pathname, router, searchParams],
  );

  return [searchParam, setSearchParam] as const;
}
