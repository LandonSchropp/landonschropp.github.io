import { useLocation } from "@reach/router";
import classNames from "classnames";
import React from "react";

import { Icon } from "../components/icon";

function linkClassNames(selected) {
  return classNames(
    "main-navigation__link",
    { "main-navigation__link--selected": selected }
  );
}

export function MainNavigation() {
  let { pathname } = useLocation();

  if (pathname === "/") {
    return null;
  }

  return <nav className="main-navigation">
    <div className="main-navigation__primary">

      <a className="main-navigation__link" href="/">
        <span className="main-navigation__title-text--long">
          Landon Schropp
        </span>
        <span className="main-navigation__title-text--short">
          Home
        </span>
      </a>

      <a className={ linkClassNames(pathname.startsWith("/notes")) } href="/notes">
        Notes
      </a>

      <a className={ linkClassNames(pathname.startsWith("/articles")) } href="/articles">
        Blog
      </a>
      <a className="main-navigation__link" href="https://unravelingflexbox.com">Book</a>
    </div>

    <div className="main-navigation__secondary">
      <a className="main-navigation__icon" href="https://twitter.com/LandonSchropp">
        <Icon name="twitter" alt="Twitter" />
      </a>

      <a className="main-navigation__icon" href="https://github.com/LandonSchropp">
        <Icon name="github" alt="GitHub" />
      </a>

      <a className="main-navigation__icon" href="mailto:schroppl@gmail.com">
        <Icon name="email" alt="Email" />
      </a>

      <a className="main-navigation__icon" href="https://codepen.io/LandonSchropp/">
        <Icon name="codepen" alt="CodePen" />
      </a>

      <a className="main-navigation__icon" href="https://www.linkedin.com/in/landonschropp">
        <Icon name="linkedin" alt="LinkedIn" />
      </a>
    </div>
  </nav>;
}

