import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getActiveLanguage, Translate } from "react-localize-redux";
import SignUpForm from "../modules/SignUpForm";
import { createAccount } from "../../redux/modules/Account";

const initialValues = {
  salutation: "",
  email: "",
  password: "",
  confirmPassword: "",
  tncAgree: false,
  dob: "00/00/0000",
  mobileNo: "",
  firstName: "",
  lastName: ""
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values, dispatch) => {
    // submit
    dispatch(createAccount(values));
  };

  render() {
    return (
      <div id="signUp" className="py-4 py-lg-3">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-11">
            {/* --- Page Content starts here --- */}

            <div className="row justify-content-center">
              <div className="col-12 col-xl-6 col-lg-7 col-md-8 col-sm-9 form-size-layout">
                <h4 className="mb-3 signup-title">
                  <Translate id="signUp.form._createAccount" />
                </h4>
                <SignUpForm
                  onSubmit={this.handleSubmit}
                  initialValues={initialValues}
                />
              </div>
            </div>

            {/* --- Page Content ends here --- */}
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  currentLanguage: PropTypes.string.isRequired
};

const mapStateToProps = ({ auth, locale }) => ({
  currentLanguage: getActiveLanguage(locale).code
});

export default connect(mapStateToProps)(SignUp);
