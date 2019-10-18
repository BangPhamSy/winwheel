import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import TextBox from "../forms/TextBox";
import { isEmpty } from "../../../helpers/validator";
import ValidationMessage from "../forms/ValidationMessage";

const TextField = ({
  input,
  label,
  hideLabel,
  required,
  secondary,
  className,
  inputClassName,
  children,
  meta: { touched, error },
  ...props
}) => {
  const finalClassName = !isEmpty(className) ? `${className}` : "";
  let displayLabel = !secondary && label;

  return (
    <div className={classNames("form-group", finalClassName)}>
      <TextBox
        input={input}
        hideLabel={hideLabel}
        placeholder={displayLabel}
        label={displayLabel}
        isError={error && touched}
        secondary={!!secondary}
        className={inputClassName}
        required={required}
        {...props}
      />
      {children}
      <ValidationMessage
        label={label}
        touched={touched}
        error={error}
        {...props}
      />
    </div>
  );
};

TextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  text: PropTypes.string,
  secondary: PropTypes.bool,
  className: PropTypes.string,
  meta: PropTypes.object.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  inputClassName: PropTypes.string
};

export default TextField;
