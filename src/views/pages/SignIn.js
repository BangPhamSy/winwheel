import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Translate, getActiveLanguage } from "react-localize-redux";
import LoginForm, { formId } from "../modules/LoginForm";
import { login } from "../../redux/modules/Auth";
import BannerImage from "../../images/res-mast.png";

const initialValues = {
  username: "",
  password: "",
  recaptcha: "",
  keepLogin: false
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = ({ username, password, keepLogin, recaptcha }, dispatch) => {
    dispatch(
      login(
        {
          username,
          password,
          keepLogin,
          recaptcha
        },
        formId
      )
    );
  };

  render() {
    return (
      <div className="signin-page">
        <section className="section-banner mx--3">
          <img src={BannerImage} alt="RE&S Banner" />
        </section>
        <section className="row section-form d-flex justify-content-center mx-sm-1 mx-md-4">
          <div className="col col-md-6 col-sm-12 form-signin-left justify-content-center">
            <div className="form-container-box box">
              <div className="form-container">
                <div className="form-divider">
                  <LoginForm
                    onSubmit={this.handleSubmit}
                    initialValues={initialValues}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-6 col-sm-12 form-signin-right justify-content-center">
            <div className="form-container-box box">
              <div className="form-container">
                <div className="form-divider">
                  <div className="row justify-content-center">
                    <div className="col-12 col-xl-8 col-lg-10 text-left align-self-end">
                      <h2 className="mb-3 text-left title">
                        <Translate id="signIn.signUp._notAMember" />
                      </h2>
                      <p className="text-left align-self-normal">
                        <Translate id="signIn.signUp._description" />
                      </p>
                      <div className="mt-4 btn-sign-up reg">
                        <Link
                          to={`/${this.props.currentLanguage}/sign-up`}
                          className="btn"
                        >
                          <Translate id="_sign_up" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

SignIn.propTypes = {
  currentLanguage: PropTypes.string.isRequired
};

const mapStateToProps = ({ auth, locale }) => ({
  currentLanguage: getActiveLanguage(locale).code
});

export default connect(mapStateToProps)(SignIn);
