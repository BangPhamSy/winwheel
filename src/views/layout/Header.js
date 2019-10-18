import React from "react";
import PropTypes from "prop-types";
import { Translate } from "react-localize-redux";
import classNames from "classnames";
import { NavHashLink as NavLink } from "react-router-hash-link";

import Logo from "../../images/logo.png";
import { TopMenuLinks } from "../../configs/MenuLinks";

class Header extends React.Component {
  renderMenu = (
    { path, title, exact, className },
    locale,
    handleCloseMenu,
    index
  ) => (
    <li key={index}>
      <NavLink
        activeClassName="active"
        exact={exact}
        onClick={handleCloseMenu}
        to={`/${locale}${path}`}
        className={className}
      >
        {<Translate id={title} />}
      </NavLink>
    </li>
  );

  render() {
    const {
      isAuthenticated,
      isMenuOpen,
      handleToggleMenu,
      handleCloseMenu
    } = this.props;

    return (
      <Translate>
        {(translate, activeLanguage, languages) => {
          const locale = activeLanguage.code;
          return (
            <header
              id="header"
              className={classNames("container-fluid", {
                "is-open": isMenuOpen
              })}
            >
              <div className="row align-items-left justify-content-left">
                <label
                  onClick={handleToggleMenu}
                  className={classNames("mobile-menu-toggler", {
                    // "unauthorized": !isAuthenticated
                  })}
                >
                  <div className="bar1" />
                  <div className="bar2" />
                  <div className="bar3" />
                </label>

                <label
                  onClick={handleCloseMenu}
                  className="mobile-menu-backdrop"
                />
                <div className="mobile-menu-fake-header" />

                <div className="col-6 col-md-3 py-1 logo">
                  <NavLink
                    to={`/${locale}/${isAuthenticated ? "" : "sign-in"}`}
                    onClick={handleCloseMenu}
                  >
                    <img src={Logo} alt="RE&S" />
                  </NavLink>
                </div>

                <div
                  id="mobileMenuPanel"
                  className="col-md-9 mobile-menu-panel"
                >
                  <nav className="top-menu">
                    <ul>
                      {!isAuthenticated &&
                        TopMenuLinks.map((value, index) =>
                          this.renderMenu(value, locale, handleCloseMenu, index)
                        )}
                    </ul>
                  </nav>
                </div>
              </div>
            </header>
          );
        }}
      </Translate>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
};

export default Header;
