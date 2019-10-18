import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Translate,
  getTranslate,
  getActiveLanguage
} from "react-localize-redux";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import { showIFrameModal } from "../../redux/modules/Modal";
// import { FooterMenuLinks } from "../../configs/MenuLinks"
import Logo from "../../images/logo_footer.png";

class Footer extends React.Component {
  renderMenuGroup = ({ title, titlePath, items }, locale, index) => {
    return (
      <div className="col-lg-3 col-md-6 mb-3 mb-lg-0" key={index}>
        <div className="group-heading">
          <a href={titlePath}>{title}</a>
        </div>
        <ul className={`footer-menu ${items.length > 3 ? "col-split-2" : ""}`}>
          {items.map((value, subIndex) =>
            this.renderMenuItems(value, locale, subIndex)
          )}
        </ul>
      </div>
    );
  };

  renderMenuItems = ({ path, title, className }, locale, subIndex) => {
    return (
      <li key={subIndex}>
        <a href={path}>{title}</a>
      </li>
    );
  };

  render() {
    const currentUrl = this.props.location.pathname;
    const { currentLanguage } = this.props;
    return (
      <Translate>
        {(translate, activeLanguage, languages) => {
          const locale = activeLanguage.code;
          return (
            <footer id="footer" className="container-fluid">
              {/* {currentLanguage === "en" && (
								<div className="row">
									{FooterMenuLinks.map((value, index) =>
										this.renderMenuGroup(value, locale, index)
									)}
								</div>
							)} */}
              <div className="copyright row mt-2 align-items-center">
                <div className="col-sm-8 mb-3">
                  {currentLanguage === "en" && (
                    <div className="footer-links mb-2">
                      <span className="footer-link">
                        <a
                          href="https://www.abbott.com.sg/pages/privacy-policy"
                          target="_blank"
                        >
                          Privacy Statement
                        </a>
                      </span>
                      <span className="footer-link mb-2">
                        <a
                          href="https://www.abbott.com.sg/pages/terms-conditions"
                          target="_blank"
                        >
                          Terms of Use
                        </a>
                      </span>
                      <span className="footer-link mb-2">
                        <a
                          href="https://abbott-acom.zendesk.com/hc/en-us/requests/new"
                          target="_blank"
                        >
                          Contact Us
                        </a>
                      </span>
                      <span className="footer-link mb-2">
                        <a href="https://www.abbott.com.sg/" target="_blank">
                          Return to RE&S homepage
                        </a>
                      </span>
                    </div>
                  )}
                  {<Translate id="footer._copyright" />}
                </div>
                <div className="col-sm-4 footer-logo text-left text-sm-right mt-sm-0 mt-2">
                  <LazyLoad height={60}>
                    <img src={Logo} alt="RE&S logo" />
                  </LazyLoad>
                </div>
              </div>
            </footer>
          );
        }}
      </Translate>
    );
  }
}

Footer.propTypes = {
  location: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string.isRequired
};

const mapStateToProps = ({ locale }) => ({
  translate: getTranslate(locale),
  currentLanguage: getActiveLanguage(locale).code
});
const mapDispatchToProps = dispatch => ({
  showIFrameModal: bindActionCreators(showIFrameModal, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
