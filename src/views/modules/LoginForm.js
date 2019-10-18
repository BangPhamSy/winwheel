import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import {
  Translate,
  getTranslate,
  getActiveLanguage
} from "react-localize-redux";
import { createValidator, required, minLength } from "../../helpers/validator";
import TextField from "../components/fields/TextField";
import CheckField from "../components/fields/CheckField";
import RecaptchaField from "../components/fields/RecaptchaField";
import { recaptchaKey } from "../../configs";
import Button from "../components/forms/Button";

const validate = createValidator({
  username: [required],
  password: [required, minLength(8)],
  recaptcha: [required]
});

export const formId = "login";

class LoginForm extends React.Component {
  render() {
    const {
      error,
      handleSubmit,
      pristine,
      translate,
      currentLanguage,
      submitting,
      invalid
    } = this.props;
    const isServerError = !!(error && !error.startsWith("_"));
    return (
      <form name="form" onSubmit={handleSubmit} className="form">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-8 col-lg-10 form-size-layout">
            <h2 className="mb-2 title">
              <Translate id="_sign_in" />
            </h2>
            <p className="text-left my-3">
              <Translate id="signIn.signUp._description" />
            </p>
            <div className="">
              <Field
                name="username"
                type="number"
                autocomplete="username"
                component={TextField}
                disabled={submitting}
                className="mb-2"
                inputClassName=""
                label={translate("_shared.form.label._phone")}
              />
              <Field
                name="password"
                type="password"
                autocomplete="current-password"
                component={TextField}
                disabled={submitting}
                className="mb-2"
                inputClassName=""
                label={translate("_shared.form.label._password")}
                minLength={8}
              />
              <Field
                name="keepLogin"
                type="checkbox"
                component={CheckField}
                className=""
                label={translate("_shared.form.label._keepSignIn")}
              />
              <Field
                name="recaptcha"
                component={RecaptchaField}
                reset={isServerError}
                sitekey={recaptchaKey}
                disabled={submitting}
                label={translate("_shared.form.label._recaptcha")}
                required={true}
                className="my-2"
                hl={currentLanguage}
              />
              <div className="login-bottom">
                <div className="forgot-section mt-2">
                  <span>
                    <Translate id="signIn.form._forgotPasswordOrEmail" />
                  </span>{" "}
                  <Link
                    to={`/${currentLanguage}/forgot-password`}
                    className="link link-primary link-underline"
                  >
                    <Translate id="signIn.form._password" />
                  </Link>
                  {" ? "}
                </div>
                <div className="form-group mt-4 d-flex">
                  <button
                    type="submit"
                    className="btn sign-in d-inline"
                    disabled={pristine || invalid}
                    loading={submitting}
                  >
                    <Translate id={submitting ? "_Submitting" : "_sign_in"} />
                  </button>
                  <p className="ml-1 mt-2 text-mobile">
                    {<Translate id="signIn.signUp._notAMember" />}{" "}
                    <Link
                      to={`/${currentLanguage}/sign-up`}
                      className="link link-primary link-underline"
                    >
                      <Translate id="_sign_up" />
                    </Link>
                    {"!"}
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="">
                <span className="form-error">{error}</span>
              </div>
            )}
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

const mapStateToProps = ({ auth, locale }) => ({
  errorMessage: auth.errorMessage,
  translate: getTranslate(locale),
  currentLanguage: getActiveLanguage(locale).code
});

export default reduxForm({
  form: formId, // a unique identifier for this form
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(connect(mapStateToProps)(LoginForm));
