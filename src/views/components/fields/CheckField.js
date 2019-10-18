import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import CheckBox from "../forms/CheckBox"
import ValidationMessage from "../forms/ValidationMessage"

const CheckField = ({
	input,
	label,
	text,
	className,
	meta: { touched, error },
	...props
}) => {
	return (
		<div className={classnames("form-group", "text-left", className)}>
			<CheckBox input={input} label={label} isError={error && touched} {...props} />

			<ValidationMessage label={text} touched={touched} error={error} {...props} />
		</div>
	)
}

CheckField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	text: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool,
}

export default CheckField
