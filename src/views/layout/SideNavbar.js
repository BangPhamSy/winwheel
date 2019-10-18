import React from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getTranslate,
  getActiveLanguage,
  Translate
} from "react-localize-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import Logo from "../../images/logo.png";
import { SidebarMenuLinks } from "../../configs/MenuLinks";
import { closeMobileMenu } from "../../redux/modules/MobileMenu";
import { showConfirmMessage } from "../../redux/modules/Modal";

// import { appStoreUrl, ggStoreUrl } from "../../configs"

class SideNavBar extends React.Component {
  constructor(props) {
    super(props);

    // this.redirect = this.redirect.bind(this)
  }

  handleLogout = () => {
    this.props.showConfirmMessage(
      "Are you sure you want to log out?",
      () => this.redirect("/logout"),
      null,
      "Logout",
      "Cancel"
    );
  };

  renderMenu = ({ path, title, exact, className }, currentLanguage, index) => {
    const url = `/${currentLanguage}${path}`;
    return (
      <li
        key={index}
        className="side-bar_list_item"
        onClick={() => this.redirect(url)}
      >
        <NavLink
          onClick={e => e.preventDefault()}
          exact={exact}
          to={url}
          activeClassName="active"
          className={className}
        >
          <Translate id={title} />
        </NavLink>
      </li>
    );
  };

  redirect = url => {
    const { push, closeMenu, isMenuOpen } = this.props;

    if (isMenuOpen)
      return Promise.resolve()
        .then(() => closeMenu())
        .then(() =>
          setTimeout(() => {
            push(url);
          }, 250)
        );
    return push(url);
  };

  render() {
    const { currentLanguage, translate } = this.props;

    return (
      <div className="side-bar">
        {/* <div className="text-center lg-menu ml-xs-4 ml-sm-4 ml-md-4 ml-lg-0 ml-xl-0">
					<Link to={`/`}>
						<img className="mx-2 my-1" src={Logo} />
					</Link>
				</div> */}
        <ul className="side-bar_list my-3">
          {SidebarMenuLinks.map((path, index) =>
            this.renderMenu(path, currentLanguage, index)
          )}
          {/* logout action */}
          <li
            key={"logout"}
            className="side-bar_list_item"
            onClick={this.handleLogout}
          >
            <NavLink
              onClick={e => e.preventDefault()}
              exact={""}
              to={""}
              activeClassName="active"
              className={"link"}
            >
              Logout
            </NavLink>
          </li>
        </ul>
        {/* <div className="side-bar_app_ads">
					<p className="my-2">
						{translate("sidebar.navigation._downloadMobile")}
					</p>
					<img src={AppsIcon} alt="" className="w-75 mb-2" />
				</div> */}
        {/* <div className="side-bar_contact_us">
					<p>
						{translate("sidebar.navigation._havingDifficulties")}
						<br />
						<Link
							className="link link-primary"
							to={`/${currentLanguage}/contact-us`}>
							{translate("sidebar.navigation._contact")}
						</Link>{" "}
						{translate("sidebar.navigation._contactCsv")}
					</p>
				</div> */}
      </div>
    );
  }
}

SideNavBar.propTypes = {
  location: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, locale, mobileMenu }) => ({
  translate: getTranslate(locale),
  currentLanguage: getActiveLanguage(locale).code,
  isMenuOpen: mobileMenu.isMenuOpen
});

const mapDispatchToProps = dispatch => ({
  closeMenu: bindActionCreators(closeMobileMenu, dispatch),
  push: bindActionCreators(push, dispatch),
  showConfirmMessage: bindActionCreators(showConfirmMessage, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavBar);
