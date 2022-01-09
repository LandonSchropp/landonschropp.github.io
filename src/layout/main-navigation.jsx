import { Link } from "gatsby";
import React from "react";

import { Icon } from "../components/icon";

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
        Writing
      </Link>

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
