import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import RadioButton from "../forms/RadioButton"
import ValidationMessage from "../forms/ValidationMessage"

const RadioButtonField = ({
	input,
	label,
	text,
	className,
	meta: { touched, error },
	...props
}) => {
	return (
		<div className={classnames("form-group", "text-left", className)}>
			<RadioButton input={input} label={label} isError={error && touched} {...props} />

			<ValidationMessage label={text} touched={touched} error={error} {...props} />
		</div>
	)
}

RadioButtonField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	text: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool,
}

export default RadioButtonField
