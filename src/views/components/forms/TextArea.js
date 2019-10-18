import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

const TextArea = ({
	input,
	rows,
	isError,
	label,
	className,
	labelClassName,
	hideLabel,
	disabled,
	required,
}) => (
	<div className="textbox-container">
		<label
			data-required={required && !disabled}
			htmlFor={input.name}
			className={classNames("textbox_label textbox_label-primary", labelClassName, {
				"d-none": hideLabel,
			})}>
			{label}
		</label>
		<textarea
			{...input}
			id={input.name}
			rows={rows}
			required={required}
			disabled={disabled}
			className={classNames("textbox textbox-primary", className, {
				"textbox-error": isError,
			})}
		/>
	</div>
)

TextArea.propTypes = {
	type: PropTypes.string.isRequired,
	rows: PropTypes.number,
	label: PropTypes.string.isRequired,
	isError: PropTypes.bool,
	className: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	hideLabel: PropTypes.bool,
	labelClassName: PropTypes.string,
}

export default TextArea
