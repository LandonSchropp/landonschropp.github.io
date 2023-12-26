import { Link } from "gatsby";
import React from "react";

import { Icon } from "./icon";

export function MainNavigation() {
  return <nav className="main-navigation">
    <div className="main-navigation__primary">

      <Link className="main-navigation__link" to="/">
        <span className="main-navigation__title-text main-navigation__title-text--long">
          Landon Schropp
        </span>
        <span className="main-navigation__title-text main-navigation__title-text--short">
          Home
        </span>
      </Link>

      <Link
        className="main-navigation__link"
        activeClassName="main-navigation__link--selected"
        partiallyActive
        to="/articles"
      >
        Writing
      </Link>

      <Link
        className="main-navigation__link"
        activeClassName="main-navigation__link--selected"
        partiallyActive
        to="/notes"
      >
        Notes
      </Link>
    </div>

    <div className="main-navigation__secondary">
      <a className="main-navigation__icon-link" href="https://twitter.com/LandonSchropp">
        <Icon className="main-navigation__icon" name="twitter" alt="Twitter" />
      </a>

      <a className="main-navigation__icon-link" href="https://github.com/LandonSchropp">
        <Icon className="main-navigation__icon" name="github" alt="GitHub" />
      </a>

      <a className="main-navigation__icon-link" href="mailto:schroppl@gmail.com">
        <Icon className="main-navigation__icon" name="email" alt="Email" />
      </a>

      <a className="main-navigation__icon-link" href="https://codepen.io/LandonSchropp/">
        <Icon className="main-navigation__icon" name="codepen" alt="CodePen" />
      </a>

      <a className="main-navigation__icon-link" href="https://www.linkedin.com/in/landonschropp">
        <Icon className="main-navigation__icon" name="linkedin" alt="LinkedIn" />
      </a>
    </div>
  </nav>;
}
