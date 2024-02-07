import { CSSProperties } from "react";

type SummaryProps = {
  title: string;
  url: string;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  tag?: string;
  tagAttribute?: string;
};

export function Summary({ title, url, children, style, tag, tagAttribute }: SummaryProps) {
  return (
    <a
      className={`
        my-4 block border-l-[3px] border-theme-accent pl-[calc(theme('spacing.3')-3px)] 
        text-theme-text outline-none transition-all 
        duration-75 ease-in hocus:bg-theme-backgroundHighlight hocus:shadow-largeOutline hocus:shadow-theme-backgroundHighlight 
      `}
      href={url}
      style={style}
      {...(tag && tagAttribute && { [`data-${tagAttribute}`]: tag })}
    >
      <h3 className="my-0 text-base">{title}</h3>
      <p className="my-0 italic">{children}</p>
    </a>
  );
}
