import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  Translate,
  getTranslate,
  getActiveLanguage
} from "react-localize-redux";
import { Link } from "react-router-dom";

import {
  createValidator,
  email,
  match,
  required,
  minLength,
  maxLength,
  password,
  noVnChars,
  noSpecialChars
} from "../../helpers/validator";
import CheckField from "../components/fields/CheckField";
import TextField from "../components/fields/TextField";
import DatePickerField from "../components/fields/DatePickerField";
import Button from "../components/forms/Button";
import OtpInput from "react-otp-input";
import { getSysCodeOptions } from "../../redux/modules/SystemCode";
import { bindActionCreators } from "redux";
import SelectField from "../components/fields/SelectField";
import MobileNumberField from "./MobileNumberField";
import salutationOptions from "../../resources/general/SalutationOptions";

const validate = createValidator({
  email: [required, email],
  firstName: [required, noVnChars, noSpecialChars],
  lastName: [required, noVnChars, noSpecialChars],
  confirmPassword: [required, match("password")],
  password: [required, minLength(8), password],
  dob: [required],
  mobileNo: [required, minLength(8)]
});

export const formId = "sign-up";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      showOTP: false
    };
  }
  showOTP = val => {
    this.setState({ showOTP: val });
  };
  render() {
    let {
      error,
      handleSubmit,
      pristine,
      translate,
      submitting,
      currentLanguage
    } = this.props;
    return (
      <form name="form" onSubmit={handleSubmit} className="row form">
        <div className="col-12">
          <Field
            name="salutation"
            type="text"
            parse={option => (option ? option.value : null)}
            options={salutationOptions}
            key={currentLanguage}
            searchable={false}
            disabled={submitting}
            component={SelectField}
            label={translate("_shared.form.label._salutation")}
            className="mb-4"
          />
          <Field
            name="firstName"
            type="text"
            autocomplete="given-name"
            required={true}
            disabled={submitting}
            component={TextField}
            label={translate("_shared.form.label._firstName")}
            className="mb-4"
          />
          <Field
            name="lastName"
            type="text"
            autocomplete="family-name"
            required={true}
            disabled={submitting}
            component={TextField}
            label={translate("_shared.form.label._lastName")}
            className="mb-4"
          />
          <Field
            name="email"
            type="email"
            autocomplete="email"
            required={true}
            disabled={submitting}
            component={TextField}
            label={translate("_shared.form.label._email")}
            className="mb-2"
          />
          <p className="pb-2 textbox_sublabel">
            The email is used for password retrieval. Please make sure that it’s
            a valid one.
          </p>
          <Field
            name="dob"
            required={true}
            disabled={submitting}
            component={DatePickerField}
            disabledYear={false}
            label={translate("_shared.form.label._dob")}
            hideLabel={true}
          />
          <Field
            name="mobileNo"
            required={true}
            disabled={submitting}
            component={MobileNumberField}
            label={translate("_shared.form.label._mobileNo")}
            defaultCode={"+65"}
            className="mb-4"
            buttonOtp={true}
            showOTP={this.showOTP}
          />
          {this.state.showOTP && (
            <div>
              <p className="textbox_label">Enter OTP sent to your mobile*</p>
              <OtpInput
                onChange={otp => this.setState({ otp: otp })}
                numInputs={4}
                inputStyle="input-otp"
                containerStyle="mb-2"
                value={this.state.otp}
              />
            </div>
          )}
          <Field
            name="password"
            type="password"
            autocomplete="new-password"
            component={TextField}
            required={true}
            disabled={submitting}
            minLength={8}
            label={translate("_shared.form.label._password")}
            className="mb-4"
          />
          <div className="textbox_sublabel mb-4 mt--3">
            <Translate id="signUp.form._passwordRules" />
          </div>
          <Field
            name="confirmPassword"
            type="password"
            component={TextField}
            required={true}
            disabled={submitting}
            match={translate("_shared.form.label._password")}
            label={translate("_shared.form.label._confirmPassword")}
            className="mb-4"
          />
          <div className="row px-3">
            <Field
              id="tncAgree"
              name="tncAgree"
              type="checkbox"
              disabled={submitting}
              component={CheckField}
              label={
                <span style={styleTncAgree}>
                  By signing up as an Ichiban Rewards member, I agree to give
                  consensus to receive information, news, offers and promotions
                  from RE&S, and I agree to the
                  <Link to={`#`} className="link link-primary">
                    {" "}
                    Privacy Policy{" "}
                  </Link>
                  and
                  <Link to={`#`} className="link link-primary">
                    {" "}
                    Terms & Conditions{" "}
                  </Link>
                  of the site.
                </span>
              }
            />
          </div>
          {error && (
            <div className="my-2 text-left">
              <span className="form-error">{error}</span>
            </div>
          )}
        </div>

        <div className="col-12 text-left mt-4">
          <Button
            type="submit"
            className="btn btn-signup"
            disabled={pristine}
            loading={submitting}
          >
            <Translate id={submitting ? "_Submitting" : "_sign_up"} />
          </Button>
        </div>
      </form>
    );
  }
}

const styleTncAgree = {
  fontSize: "0.8rem"
};

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = ({ locale }) => ({
  translate: getTranslate(locale),
  currentLanguage: getActiveLanguage(locale).code
});

const mapDispatchTpProps = dispatch => ({
  getSysCodeOptions: bindActionCreators(getSysCodeOptions, dispatch)
});

export default reduxForm({
  form: formId, // a unique identifier for this form
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    mapDispatchTpProps
  )(SignUpForm)
);
