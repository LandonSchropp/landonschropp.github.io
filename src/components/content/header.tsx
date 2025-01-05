import { GenericTagComponent } from "./tag";
import type { ReactNode } from "react";
import { isNullish } from "remeda";

type HeaderLinkProps = {
  children: ReactNode;
  href?: string | undefined;
};

function HeaderLink({ children, href }: HeaderLinkProps) {
  if (isNullish(href)) {
    return children;
  }

  return (
    <a className="no-underline hover:underline" href={href}>
      {children}
    </a>
  );
}

type HeaderTagProps<T extends string> = {
  tag?: T | undefined;
  href?: string | undefined;
  component: GenericTagComponent<T>;
};

function HeaderTag<T extends string>({ tag, href, component: TagComponent }: HeaderTagProps<T>) {
  if (!tag || !href) {
    return null;
  }

  return (
    <div className="mb-2 mt-3 text-sm text-theme-accent">
      <TagComponent value={tag} href={href} />
    </div>
  );
}

type HeaderProps<T extends string> = {
  children?: ReactNode;
  superText?: ReactNode;
  title: ReactNode;
  subText: ReactNode;
  href?: string | undefined;
  tag?: T | undefined;
  tagHref?: string | undefined;
  tagComponent: GenericTagComponent<T>;
};

export function Header<T extends string>({
  children,
  superText,
  title,
  href,
  subText,
  tag,
  tagHref,
  tagComponent,
}: HeaderProps<T>) {
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
      <HeaderTag tag={tag} href={tagHref} component={tagComponent} />

      {children}
    </header>
  );
}
