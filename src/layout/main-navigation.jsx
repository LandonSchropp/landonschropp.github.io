import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React from "react";

import { Icon } from "../components/icon";

export function MainNavigation() {
  let { pathname } = useLocation();

  if (pathname === "/") {
    return null;
  }

  return <nav className="main-navigation">
    <div className="main-navigation__primary">

      <Link className="main-navigation__link" to="/">
        <span className="main-navigation__title-text--long">
          Landon Schropp
        </span>
        <span className="main-navigation__title-text--short">
          Home
        </span>
      </Link>

      <Link
        className="main-navigation__link"
        activeClassName="main-navigation__link--selected"
        partiallyActive
        to="/notes"
      >
        Notes
      </Link>

      <Link
        className="main-navigation__link"
        activeClassName="main-navigation__link--selected"
        partiallyActive
        to="/articles"
      >
        Blog
      </Link>
      <Link className="main-navigation__link" to="https://unravelingflexbox.com">Book</Link>
    </div>

    <div className="main-navigation__secondary">
      <Link className="main-navigation__icon" to="https://twitter.com/LandonSchropp">
        <Icon name="twitter" alt="Twitter" />
      </Link>

      <Link className="main-navigation__icon" to="https://github.com/LandonSchropp">
        <Icon name="github" alt="GitHub" />
      </Link>

      <Link className="main-navigation__icon" to="mailto:schroppl@gmail.com">
        <Icon name="email" alt="Email" />
      </Link>

      <Link className="main-navigation__icon" to="https://codepen.io/LandonSchropp/">
        <Icon name="codepen" alt="CodePen" />
      </Link>

      <Link className="main-navigation__icon" to="https://www.linkedin.com/in/landonschropp">
        <Icon name="linkedin" alt="LinkedIn" />
      </Link>
    </div>
  </nav>;
}
