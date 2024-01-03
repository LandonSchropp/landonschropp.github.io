"use client";

import { Icon } from "./icon";
import { usePathname } from "next/navigation";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: boolean;
};

function Link({ href, children, icon = false }: LinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname !== null && href.startsWith(pathname);

  const className = icon
    ? "hocus:text-theme-accent"
    : "font-sans text-theme-lightText shocus:shadow-[0_3px] shadow-theme-accent shocus:text-theme-accent";

  return (
    <a
      className={`mx-2 block text-inherit transition-all duration-75 ease-in ${className}`}
      href={href}
      {...(isCurrent && { "aria-current": "page" })}
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
      </div>
      <div className="flex justify-center">
        <Link href="https://github.com/LandonSchropp" icon>
          <Icon className="main-navigation__icon" name="github" alt="GitHub" />
        </Link>

        <Link href="mailto:schroppl@gmail.com" icon>
          <Icon className="main-navigation__icon" name="email" alt="Email" />
        </Link>

        <Link href="https://www.linkedin.com/in/landonschropp" icon>
          <Icon className="main-navigation__icon" name="linkedin" alt="LinkedIn" />
        </Link>
      </div>
    </nav>
  );
}
