import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";

import ValidationMessage from "../forms/ValidationMessage";
import { Translate } from "react-localize-redux";

const SelectField = ({
  input,
  label,
  options,
  className,
  selectClassName,
  required,
  disabled,
  hideLabel,
  isLoading,
  meta: { touched, error },
  ...props
}) => {
  const { value, onBlur, onChange } = input;

  return (
    <Translate>
      {() => (
        <div className={classNames("form-group", className)}>
          {!hideLabel && (
            <label
              data-required={required && !disabled}
              htmlFor={input.name}
              className="textbox_label textbox_label-primary"
            >
              {label}
            </label>
          )}

          <Select
            className={classNames(selectClassName, {
              "Select-error": touched && error
            })}
            id={input.name}
            name={input.name}
            clearable={false}
            value={value}
            disabled={disabled}
            placeholder={isLoading ? "Loading..." : ""}
            options={options}
            onChange={option => onChange(option)}
            onBlur={() => onBlur(value)}
            isError={error && touched}
            isLoading={isLoading}
            {...props}
          />
          <ValidationMessage
            label={label}
            touched={touched}
            error={error}
            {...props}
          />
        </div>
      )}
    </Translate>
  );
};

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  text: PropTypes.string,
  className: PropTypes.string,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool
};

export default SelectField;
