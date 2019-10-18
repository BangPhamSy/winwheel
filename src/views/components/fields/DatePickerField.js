import React, { Component } from "react";
import PropTypes from "prop-types";
import { Translate } from "react-localize-redux";
import classnames from "classnames";

import Select from "react-select";
import ValidationMessage from "../forms/ValidationMessage";

let i = 1;
const days = [];
for (i = 1; i <= 31; i++) {
  days.push({
    value: String(i).padStart(2, 0),
    label: String(i).padStart(2, 0)
  });
}
const months = [];
const monthEngNames = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec"
};
const vnMonths = [];
const monthVnNames = {
  1: "T1",
  2: "T2",
  3: "T3",
  4: "T4",
  5: "T5",
  6: "T6",
  7: "T7",
  8: "T8",
  9: "T9",
  10: "T10",
  11: "T11",
  12: "T12"
};
for (i = 1; i <= 12; i++) {
  months.push({ value: String(i).padStart(2, 0), label: monthEngNames[i] });
  vnMonths.push({ value: String(i).padStart(2, 0), label: monthVnNames[i] });
}
const years = [];
const currentYear = new Date().getFullYear();
for (i = currentYear; i > currentYear - 100; i--) {
  years.push({ value: i, label: i });
}
const getDateValue = (value, selectedValue, type) => {
  const parts = value.split("/");
  let day = parts[0];
  let month = parts[1];
  let yearTime = parts[2].split(" ");
  let year = yearTime[0];
  let time = yearTime[1] ? yearTime[1] : "23:00:00";

  switch (type) {
    case "day":
      day = selectedValue;
      break;
    case "month":
      month = selectedValue;
      break;
    case "year":
      year = selectedValue;
      break;
    default:
      console.log(selectedValue);
      break;
  }
  const updatedValue = `${day}/${month}/${year} ${time}`;
  return value !== updatedValue ? updatedValue : null;
};

class DatePickerField extends Component {
  constructor(props) {
    super(props);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnBlur = (selectedValue, type) => {
    const { value, onBlur } = this.props.input;
    const newValue = getDateValue(value, selectedValue, type);

    if (newValue) onBlur(newValue);
  };

  handleOnChange = (selectedOption, type) => {
    const selectedValue =
      selectedOption && selectedOption.value ? selectedOption.value : null;
    const { value, onChange } = this.props.input;
    const newValue = getDateValue(value, selectedValue, type);

    if (newValue) onChange(newValue);
  };

  render() {
    const {
      input: { value },
      label,
      required,
      translate,
      disabled,
      disabledYear,
      children,
      hideLabel,
      meta: { touched, error },
      ...props
    } = this.props;
    const parts = value.split("/");
    const day = parts[0];
    const month = parts[1];
    let yearTime = parts[2].split(" ");
    let year = yearTime[0];

    return (
      <Translate>
        {(translate, activeLanguage) => (
          <div className="form-group my-3">
            <div className="row mx--2">
              {hideLabel && (
                <div className="col-12 px-2">
                  <label
                    className="textbox_label"
                    data-required={required && !disabled}
                  >
                    {label}
                  </label>
                </div>
              )}
              <div
                className={classnames(
                  "px-2",
                  { "col-5": disabledYear },
                  { "col-4": !disabledYear }
                )}
              >
                <Select
                  value={day}
                  // placeholder={translate("_shared.form.label._day")}
                  placeholder={""}
                  clearable={false}
                  options={days}
                  searchable={false}
                  disabled={disabled}
                  isClearable={false}
                  onChange={option => this.handleOnChange(option, "day")}
                  onBlur={() => this.handleOnBlur(day, "day")}
                />
              </div>
              <div
                className={classnames(
                  "px-2",
                  { "col-7": disabledYear },
                  { "col-4": !disabledYear }
                )}
              >
                <Select
                  value={month}
                  disabled={disabled}
                  // placeholder={translate("_shared.form.label._month")}
                  placeholder={""}
                  clearable={false}
                  options={activeLanguage.code !== "vi" ? months : vnMonths}
                  searchable={false}
                  onChange={option => this.handleOnChange(option, "month")}
                  onBlur={() => this.handleOnBlur(month, "month")}
                />
              </div>
              {!disabledYear && (
                <div className="col-4 px-2">
                  <Select
                    value={year}
                    // placeholder={translate("_shared.form.label._year")}
                    placeholder={""}
                    clearable={false}
                    options={years}
                    searchable={false}
                    disabled={disabled}
                    onChange={option => this.handleOnChange(option, "year")}
                    onBlur={() => this.handleOnBlur(year, "year")}
                  />
                </div>
              )}
              <ValidationMessage
                className={"px-2"}
                label={label}
                touched={touched}
                error={error}
                {...props}
              />
            </div>
            {children}
          </div>
        )}
      </Translate>
    );
  }
}

DatePickerField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

export default DatePickerField;
