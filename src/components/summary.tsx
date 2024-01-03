import type { Category } from "../types";
import { CSSProperties } from "react";

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
        my-4 block border-l-[3px] border-theme-accent pl-[calc(theme('spacing.3')-3px)] 
        text-theme-text outline-none transition-all 
        duration-75 ease-in hocus:bg-theme-backgroundHighlight hocus:shadow-largeOutline hocus:shadow-theme-backgroundHighlight 
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
