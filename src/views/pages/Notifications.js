import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Translate, getActiveLanguage } from "react-localize-redux";
import PromotionImage from "../../images/promotion.png";

class Notifications extends React.Component {
  render() {
    return (
      <div id="notify">
        <div className="row justify-content-center mt-3">
          <div className="col-12 col-xl-11">
            {/* --- Page Content starts here --- */}
            <div className="row address justify-content-center section mb-4 pb-4">
              <div className="text-left col-12 col-xl-12 col-lg-12 mb-2 mt-2">
                <h4 className="text-left about-title mb-3">NOTIFICATIONS</h4>
                <div className="mb-3 box">
                  <div className="p-3">
                    <h5 className="noti-title mb-3">Lorem Ipsum Subject</h5>
                    <p className="mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam tristique quam sed quam rutrum, quis imperdiet sem
                      euismod. Vivamus iaculis, lorem sodales tempus vulputate,
                      urna est ultrices dolor, id molestie tellus diam in orci.
                      Fusce condimentum accumsan dui. Pellentesque eget dui sed
                      tellus semper congue.
                      <br />
                    </p>
                    <hr className="notify-line" />
                    <h5 className="noti-title mb-3">Lorem Ipsum Subject</h5>
                    <p className="mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam tristique quam sed quam rutrum, quis imperdiet sem
                      euismod. Vivamus iaculis, lorem sodales tempus vulputate,
                      urna est ultrices dolor, id molestie tellus diam in orci.
                      Fusce condimentum accumsan dui. Pellentesque eget dui sed
                      tellus semper congue.
                      <br />
                    </p>
                    <hr className="notify-line" />
                    {/* <h5 className="noti-title mb-3"><img className="promotion-icon" src={PromotionImage} alt="" /> Lorem Ipsum Subject</h5>
                                        <hr className="notify-line" />
                                        <div className="row mt-3">
                                            <div className="col">
                                                <p className="mb-3">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique quam sed quam rutrum, quis imperdiet sem euismod. Vivamus iaculis, lorem sodales tempus vulputate, urna est ultrices dolor, id molestie tellus diam in orci. Fusce condimentum accumsan dui. Pellentesque eget dui sed tellus semper congue.<br/>
                                                </p>
                                                <p className="mb-3">

                                                    Donec vitae consectetur magna, at vehicula est. Integer vitae placerat tortor, non semper erat. Donec quis urna scelerisque, suscipit metus non, aliquet est. Ut id tincidunt dolor, sed consectetur ex. Suspendisse pulvinar nec arcu eget elementum. <br />
                                                </p>
                                                <p className="mb-3">

                                                    Curabitur maximus pharetra lectus. Vivamus libero tellus, sodales at eleifend sed, lacinia consequat lectus. Vestibulum a convallis neque. Integer ac odio eu justo scelerisque pulvinar.<br />
                                                </p>
                                                <p className="mb-3">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique quam sed quam rutrum, quis imperdiet sem euismod. Vivamus iaculis, lorem sodales tempus vulputate, urna est ultrices dolor, id molestie tellus diam in orci. Fusce condimentum accumsan dui. Pellentesque eget dui sed tellus semper congue.<br className="mb-2" />
                                                </p>
                                                <p className="mb-3">

                                                    Donec vitae consectetur magna, at vehicula est. Integer vitae placerat tortor, non semper erat. Donec quis urna scelerisque, suscipit metus non, aliquet est. Ut id tincidunt dolor, sed consectetur ex. Suspendisse pulvinar nec arcu eget elementum. <br />
                                                </p>
                                                <p className="mb-3">

                                                    Curabitur maximus pharetra lectus. Vivamus libero tellus, sodales at eleifend sed, lacinia consequat lectus. Vestibulum a convallis neque. Integer ac odio eu justo scelerisque pulvinar.<br />
                                                </p>
                                            </div>
                                        </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* --- Page Content ends here --- */}
          </div>
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  currentLanguage: PropTypes.string.isRequired
};

const mapStateToProps = ({ auth, locale }) => ({
  currentLanguage: getActiveLanguage(locale).code
});

export default connect(mapStateToProps)(Notifications);
