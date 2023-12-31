import type { ReactNode } from "react";
import { isNil } from "remeda";

type HeaderLinkProps = {
  children: ReactNode;
  href: string;
};

function HeaderLink({ children, href }: HeaderLinkProps) {
  if (isNil(href)) {
    return children;
  }

  return (
    <a className="no-underline hover:underline decoration-[0..075em]" href={href}>
      {children}
    </a>
  );
}

type HeaderProps = {
  className: string;
  children?: ReactNode;
  superText: ReactNode;
  title: ReactNode;
  subText: ReactNode;
  href: string;
};

export function Header({ children, superText, title, href, subText }: HeaderProps) {
  const superSubClassName =
    "mx-auto my-1 m-width[50ch] text-base font-normal font-serif italic text-theme-lightText [&_a]:underline";

  return (
    <header className="text-center my-6">
      <h1 className="my-0">
        <span className={`block ${superSubClassName}`}>{superText}</span>{" "}
        <span className="block">
          <HeaderLink href={href}>{title}</HeaderLink>
        </span>
      </h1>
      <div className={`block my-2 ${superSubClassName}`} data-test-id="sub-text">
        {subText}
      </div>
      {children}
    </header>
  );
}
