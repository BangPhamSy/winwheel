import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { reduxForm } from "redux-form";
import TextField from "../components/fields/TextField";
import { normalizePhone } from "../../helpers";
// import { sendOtp } from "../../redux/modules/Otp";
// import { uniquePhone } from "../../redux/modules/UniqueField";
import Button from "../components/forms/Button";
import { connect } from "react-redux";
import {
  createValidator,
  required,
  minLength,
  maxLength
} from "../../helpers/validator";

const getMobileNumberValue = (value, defaultCode, selectedValue, type) => {
  let parts = value ? value.split("-") : [];
  let code = parts[0] ? parts[0] : defaultCode;
  let number = parts[1] ? parts[1] : "";
  if (type === "code") {
    code = selectedValue;
  } else {
    number = selectedValue;
  }
  const updatedValue = `${code}-${number}`;
  return value !== updatedValue ? updatedValue : null;
};

const validate = createValidator({
  mobileNo: [required, minLength(9), maxLength(10)]
});

class MobileNumberField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      mobile: ""
    };
    this.handleSendOtp = this.handleSendOtp.bind(this);
  }
  componentDidMount() {
    let parts = this.props.input.value.split("-");
    this.setState({ mobile: parts[1] });
  }
  handleOnBlur = (selectedValue, type) => {
    const { value, onBlur } = this.props.input;
    const newValue = getMobileNumberValue(
      value,
      this.props.defaultCode,
      selectedValue,
      type
    );
    if (newValue) onBlur(newValue);
  };

  handleCodeChange = selectedOption => {
    const selectedCode =
      selectedOption && selectedOption.value ? selectedOption.value : null;
    const { value, onChange } = this.props.input;
    const newValue = getMobileNumberValue(
      value,
      this.props.defaultCode,
      selectedCode,
      "code"
    );
    if (newValue) onChange(newValue);
  };

  handleNumberChange = inputValue => {
    if (inputValue.length == 9) {
      if (inputValue == this.state.mobile) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    } else {
      this.setState({ isDisabled: true });
    }
    const number = inputValue;
    const {
      input: { value, onChange },
      defaultCode
    } = this.props;
    const newValue = getMobileNumberValue(value, defaultCode, number, "number");
    if (newValue) onChange(newValue);
  };

  handleSendOtp = () => {
    this.props.showOTP(true);
    // const { mobileNo } = this.form;
    // let mobile = mobileNo.value;
    // let phoneNumber = this.props.defaultCode + mobile;
    // if (mobile.length == 9) {
    //   return this.props.dispatch(
    //     uniquePhone(phoneNumber, () => {
    //       this.props.dispatch(sendOtp(phoneNumber));
    //     })
    //   );
    // }
  };
  render() {
    const {
      input: { value },
      label,
      required,
      translate,
      disabled,
      children,
      defaultCode,
      meta: { touched, error },
      handleInputOTP,
      buttonOtp,
      ...props
    } = this.props;
    const parts = value.split("-");
    const number = parts[1] ? parts[1] : "";

    return (
      <form
        ref={form => {
          this.form = form;
        }}
      >
        <div className="form-group mob mt-4">
          <div className="row mx--2 mb-2">
            <div className="col-12 px-2 mb-0 textbox_label">
              <label data-required={required && !disabled}>{label}</label>
            </div>
            <div className={classnames("px-2 mb-3 col-lg-2 col-md-2 col-4")}>
              <TextField
                input={{
                  name: "country",
                  value: defaultCode
                }}
                type="text"
                hideLabel={true}
                required={true}
                disabled={true}
                meta={{ touched }}
              />
            </div>
            <div
              className={
                buttonOtp
                  ? classnames("px-2 mb-3 col-lg-7 col-md-7 col-8")
                  : classnames("px-2 mb-3 col-lg-10 col-md-10 col-8")
              }
            >
              <TextField
                input={{
                  name: "mobileNo",
                  value: number,
                  onChange: evt => this.handleNumberChange(evt.target.value),
                  onBlur: evt => this.handleOnBlur(evt.target.value, "number")
                }}
                type="number"
                normalize={normalizePhone}
                autocomplete="phone"
                required={true}
                label="Mobile"
                hideLabel={true}
                minLength={9}
                maxLength={10}
                disabled={disabled}
                meta={{ touched, error }}
                className="mobile"
              />
            </div>
            {buttonOtp && (
              <div
                className={classnames(
                  "px-2 mb-3 col-lg-3 col-md-3 col-2 col-12"
                )}
              >
                <Button
                  onClick={this.handleSendOtp}
                  type="button"
                  className="btn btn-primary"
                  disabled={this.state.isDisabled}
                >
                  GET OTP
                </Button>
              </div>
            )}
          </div>
          {children}
        </div>
      </form>
    );
  }
}

MobileNumberField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

MobileNumberField = reduxForm({
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(MobileNumberField);

export default connect()(MobileNumberField);
