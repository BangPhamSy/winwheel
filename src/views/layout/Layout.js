import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import classnames from "classnames";

import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../components/shared/ScrollToTop";
import ModalRoot from "../components/modal/ModalRoot";
import {
  toggleMobileMenu,
  closeMobileMenu
} from "../../redux/modules/MobileMenu";

class Layout extends React.Component {
  render() {
    const {
      toggleMenu,
      closeMenu,
      isMenuOpen,
      isAuthenticated,
      ...props
    } = this.props;

    return (
      <div className="app">
        <Header
          handleToggleMenu={toggleMenu}
          handleCloseMenu={closeMenu}
          isMenuOpen={isMenuOpen}
          {...props}
        />
        <main
          id="body"
          className={classnames("container-fluid", {
            "is-open": isMenuOpen,
            auth: isAuthenticated
          })}
        >
          {this.props.children}
        </main>
        <Footer {...props} />
        <ModalRoot />
        <ScrollToTop />
      </div>
    );
  }
}

Footer.propTypes = {
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({ mobileMenu }) => ({
  isMenuOpen: mobileMenu.isMenuOpen
});

const mapDispatchToProps = dispatch => ({
  toggleMenu: bindActionCreators(toggleMobileMenu, dispatch),
  closeMenu: bindActionCreators(closeMobileMenu, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
