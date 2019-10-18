import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import { bindActionCreators } from "redux";
import {
  Translate,
  getTranslate,
  getActiveLanguage
} from "react-localize-redux";
import { push } from "connected-react-router";

import {
  createValidator,
  required,
  match,
  minLength,
  maxLength,
  password
} from "../../helpers/validator";
import { showMessageModal } from "../../redux/modules/Modal";
import { logout } from "../../redux/modules/Auth";
import { changePassword } from "../../redux/modules/Password";

import TextField from "../components/fields/TextField";
import Button from "../components/forms/Button";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: ""
};

const validate = createValidator({
  oldPassword: [required],
  newPassword: [required, minLength(8), maxLength(15), password],
  confirmNewPassword: [required, match("newPassword")]
});

export const formId = "changePassword";
class ChangePassword extends React.Component {
  submit = values => {
    const { showMessageModal, changePassword, logout, reset } = this.props;

    changePassword(values, formId).then(resp => {
      const { successMessage } = resp;
      if (successMessage) {
        return Promise.all([
          showMessageModal(successMessage, () => reset(formId))
          // setTimeout(() => logout(), 3000),
        ]);
      }
      return Promise.resolve();
    });
  };

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      pristine,
      translate,
      reset,
      invalid
    } = this.props;

    return (
      <div id="change-password" className="my-4 my-lg-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-11">
            {/* --- Page Content starts here --- */}

            <div className="row justify-content-center">
              <div className="col-12 col-xl-6 col-lg-7 col-md-8 col-sm-9 form-size-layout">
                <h4 className="mb-3">
                  <Translate id="changePassword._title" />
                </h4>

                <form
                  name="form"
                  onSubmit={handleSubmit(this.submit)}
                  className="my-3 row form"
                >
                  <div className="col-12">
                    <Field
                      name="oldPassword"
                      type="password"
                      autocomplete="current-password"
                      minLength={8}
                      maxLength={15}
                      required={true}
                      disabled={submitting}
                      component={TextField}
                      label={translate(
                        "changePassword.form.label._currentPassword"
                      )}
                      className="mb-4"
                    />
                    <Field
                      name="newPassword"
                      type="password"
                      autocomplete="new-password"
                      minLength={8}
                      maxLength={15}
                      required={true}
                      disabled={submitting}
                      component={TextField}
                      label={translate(
                        "changePassword.form.label._newPassword"
                      )}
                    />
                    <div className="textbox_sublabel mb-4">
                      <Translate id="signUp.form._passwordRules" />
                    </div>
                    <Field
                      name="confirmNewPassword"
                      type="password"
                      autocomplete="new-password"
                      match={translate(
                        "changePassword.form.label._newPassword"
                      )}
                      required={true}
                      disabled={submitting}
                      component={TextField}
                      label={translate(
                        "changePassword.form.label._confirmNewPassword"
                      )}
                    />
                  </div>

                  <div className="mt-2">
                    {error && <span className="form-error">{error}</span>}
                  </div>

                  <div className="col-12 text-left mt-4 cta-buttons">
                    <Button
                      type="submit"
                      className="btn btn-primary btn-change"
                      disabled={pristine || invalid}
                      loading={submitting}
                    >
                      <Translate
                        id={submitting ? "_Submitting" : "_changeMyPassword"}
                      />
                    </Button>
                    {/* <br />
										<Button
											type="button"
											disabled={submitting}
											className="btn btn-black mt-2 px-5"
											onClick={() => reset(formId)}>
											<Translate id="_Cancel" />
										</Button> */}
                  </div>
                </form>
              </div>
            </div>

            {/* --- Page Content ends here --- */}
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired
};

const mapStateToProps = ({ account, locale }) => ({
  errorMessage: account.errorMessage,
  translate: getTranslate(locale),
  currentLanguage: getActiveLanguage(locale).code
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch),
  showMessageModal: bindActionCreators(showMessageModal, dispatch),
  changePassword: bindActionCreators(changePassword, dispatch),
  push: bindActionCreators(push, dispatch),
  reset: bindActionCreators(reset, dispatch)
});

export default reduxForm({
  form: formId, // a unique identifier for this form
  validate,
  initialValues,
  enableReinitialize: true,
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChangePassword)
);
