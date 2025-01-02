import { ReactNode } from "react";

type LinkProps = {
  /** The URL to link to. */
  href: string;

  /** The title of the link. */
  title: string;

  /** The children to render within the link. */
  children: ReactNode;

  /** The unique identifier of the link. */
  key: string;
};

/**
 * Generates a link that's contained within the `DynamicSVG`.
 */
export function Link({ href, title, children }: LinkProps) {
  return (
    // FIX: A pointer cursor is not the default in Safari. 😕
    <a
      className="pointer-events-[bounding-box] cursor-pointer focus-visible:outline-none"
      href={href}
    >
      <title>{title}</title>
      {children}
    </a>
  );
}
