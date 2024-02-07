import { Tag } from "./tag";
import type { ReactNode } from "react";
import { isNil } from "remeda";

type HeaderLinkProps = {
  children: ReactNode;
  href?: string | undefined;
};

function HeaderLink({ children, href }: HeaderLinkProps) {
  if (isNil(href)) {
    return children;
  }

  return (
    <a className="no-underline hover:underline" href={href}>
      {children}
    </a>
  );
}

type HeaderTagProps = {
  tag?: string | undefined;
  href?: string | undefined;
};

function HeaderTag({ tag, href }: HeaderTagProps) {
  if (!tag || !href) {
    return null;
  }

  return (
    <div className="mb-2 mt-3 text-sm text-theme-accent">
      <Tag value={tag} attribute="technology" href={href} />
    </div>
  );
}

type HeaderProps = {
  children?: ReactNode;
  superText?: ReactNode;
  title: ReactNode;
  subText: ReactNode;
  href?: string | undefined;
  tag?: string | undefined;
  tagHref?: string | undefined;
};

export function Header({ children, superText, title, href, subText, tag, tagHref }: HeaderProps) {
  const superSubClassName =
    "mx-auto my-1 m-width[50ch] text-base font-normal font-serif italic text-theme-lightText [&_a]:underline";

  return (
    <header className="my-6 text-center">
      <h1 className="my-0">
        <span className={`block ${superSubClassName}`}>{superText}</span>{" "}
        <span className="block">
          <HeaderLink href={href}>{title}</HeaderLink>
        </span>
      </h1>
      <div className={`my-2 block ${superSubClassName}`} data-test-id="sub-text">
        {subText}
      </div>
      <HeaderTag tag={tag} href={tagHref} />

      {children}
    </header>
  );
}
