"use client";

import { Icon } from "../base/icon";
import { useIsClient } from "@/hooks/use-is-client";
import { usePathname } from "next/navigation";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: boolean;
};

function isCurrent(pathname: string | null, href: string, client: boolean) {
  if (pathname === null) return false;

  // HACK: Next.js does not allow us to pass static data from a child page to a root template or
  // layout. This means we can't easily set the category when the page defines one. On most pages
  // this is fine, but on note pages it causes an issue where the category "flashes" the wrong
  // color, which is noticeable to the user. To make this less prominant, we'll never set current on
  // the server.
  if (!client) return false;

  if (href === "/") {
    return href === pathname;
  }

  return pathname.startsWith(href);
}

function Link({ href, children, icon = false }: LinkProps) {
  const pathname = usePathname();
  const client = useIsClient();

  const className = icon ? "hocus:text-theme-accent" : "font-sans text-theme-lightText ";

  const shocusClassName =
    client && !icon ? "shocus:shadow-[0_3px] shadow-theme-accent shocus:text-theme-accent" : "";

  return (
    <a
      className={`mx-2 block text-inherit transition-all duration-75 ease-in ${className} ${shocusClassName} hover:no-underline`}
      href={href}
      {...(isCurrent(pathname, href, client) && { "aria-current": "page" })}
    >
      {children}
    </a>
  );
}

export function MainNavigation() {
  return (
    <nav className="my-3 flex gap-3 px-2 text-sm text-theme-extraLightText lg:justify-between max-lg:flex-col">
      <div className="flex justify-center">
        <Link href="/">
          <span className="max-md:hidden">Landon Schropp</span>
          <span className="md:hidden">Home</span>
        </Link>

        <Link href="/articles">Writing</Link>
        <Link href="/notes">Notes</Link>
        <Link href="/today-i-learned">
          <abbr className="no-underline lg:hidden" title="Today I Learned">
            TIL
          </abbr>
          <span className="max-lg:hidden">Today I Learned</span>
        </Link>
      </div>
      <div className="flex justify-center">
        <Link href="https://github.com/LandonSchropp" icon>
          <Icon name="github" alt="GitHub" />
        </Link>

        <Link href="https://www.chess.com/member/landon" icon>
          <Icon name="chessCom" alt="Chess.com" />
        </Link>

        <Link href="https://www.linkedin.com/in/landonschropp" icon>
          <Icon name="linkedin" alt="LinkedIn" />
        </Link>

        <Link href="mailto:schroppl@gmail.com" icon>
          <Icon name="email" alt="Email" />
        </Link>
      </div>
    </nav>
  );
}
