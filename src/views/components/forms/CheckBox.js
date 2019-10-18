import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const CheckBox = ({ input, isError, label, disabled, className, required }) => (
	<div className="checkbox-container">
		<input
			{...input}
			id={input.name}
			type="checkbox"
			disabled={disabled}
			className={classNames("checkbox", className)}
		/>
		<label data-required={required && !disabled} htmlFor={input.name}>
			{label}
		</label>
	</div>
)

CheckBox.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	isError: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
}

export default CheckBox
