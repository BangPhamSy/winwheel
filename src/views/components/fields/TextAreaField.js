import React from "react"
import PropTypes from "prop-types"
import TextArea from "../forms/TextArea"
import classNames from "classnames"

import { isEmpty } from "../../../helpers/validator"
import ValidationMessage from "../forms/ValidationMessage"

const TextAreaField = ({
	input,
	rows,
	label,
	type,
	required,
	className,
	hideLabel,
	disabled,
	meta: { touched, error },
	...props
}) => {
	const finalClassName = !isEmpty(className) ? `${className}` : ""

	return (
		<div className={classNames("form-group", finalClassName)}>
			<TextArea
				input={input}
				rows={rows}
				type={type}
				label={label}
				isError={error && touched}
				className={className}
				hideLabel={hideLabel}
				disabled={disabled}
				required={required}
			/>
			<ValidationMessage label={label} touched={touched} error={error} {...props} />
		</div>
	)
}

TextAreaField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	rows: PropTypes.number,
	text: PropTypes.string,
	className: PropTypes.string,
	meta: PropTypes.object.isRequired,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	secondary: PropTypes.bool,
}

export default TextAreaField
