import { ReactNode } from "react";

type GroupProps = {
  /** The title of the group. */
  title?: string;

  /** The children to render within the group. */
  children: ReactNode;

  /** The unique identifier of the group. */
  key: string;

  /** The ARIA role of the group. */
  role: "heading" | "doc-subititle" | "navigation";
};

/**
 * Generates a group that's contained within the `DynamicSVG`.
 */
export function Group({ key, role, title, children }: GroupProps) {
  return (
    <g key={key} role={role}>
      {title && <title>{title}</title>}
      {children}
    </g>
  );
}
