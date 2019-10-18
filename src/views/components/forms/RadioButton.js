import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const RadioButton = ({ input, isError, label, disabled, className, required }) => (
	<div className="radio-container">
		<input
			{...input}
			id={input.name}
			type="radio"
			disabled={disabled}
			className={classNames("radio", className)}
		/>
		<label data-required={required && !disabled} htmlFor={input.name}>
			{label}
		</label>
	</div>
)

RadioButton.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	isError: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
}

export default RadioButton
