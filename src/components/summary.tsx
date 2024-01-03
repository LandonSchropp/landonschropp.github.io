import { CSSProperties } from "react";
import type { Category } from "../types";

type SummaryProps = {
  title: string;
  url: string;
  category?: Category;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Summary({ title, url, category, children, style }: SummaryProps) {
  return (
    <a
      className={`
        my-4 pl-[calc(theme('spacing.3')-3px)] border-l-[3px] block text-theme-text 
        border-theme-accent hocus:bg-theme-backgroundHighlight hocus:shadow-largeOutline 
        hocus:shadow-theme-backgroundHighlight outline-none transition-all duration-75 ease-in 
      `}
      href={url}
      style={style}
      {...(category && { "data-category": category })}
    >
      <h3 className="my-0 text-base">{title}</h3>
      <p className="my-0 italic">{children}</p>
    </a>
  );
}
