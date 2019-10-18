import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

import { isEmpty } from "../../../helpers/validator"

const TextBox = ({
	input,
	type,
	isError,
	label,
	className,
	secondary,
	labelClassName,
	disabled,
	required,
	hideLabel,
}) =>
	secondary ? (
		<div className="textbox-container">
			<label
				data-required={required}
				htmlFor={input.name}
				className={classNames("textbox_label", labelClassName, {
					"textbox_label-float": !isEmpty(input.value),
				})}>
				{label}
			</label>
			<input
				{...input}
				id={input.name}
				disabled={disabled}
				type={type}
				required={required}
				className={classNames("textbox textbox-secondary", className, {
					"textbox-secondary-error": isError,
				})}
			/>
		</div>
	) : (
			<div className="textbox-container">
				<label
					data-required={required && !disabled}
					htmlFor={input.name}
					className={classNames(
						"textbox_label textbox_label-primary",
						labelClassName,
						{ "d-none": hideLabel }
					)}>
					{label}
				</label>
				<input
					{...input}
					id={input.name}
					required={required}
					disabled={disabled}
					type={type}
					className={classNames("textbox textbox-primary", className, {
						"textbox-error": isError,
					})}
				/>
			</div>
		)

TextBox.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	isError: PropTypes.bool,
	secondary: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	hideLabel: PropTypes.bool,
	labelClassName: PropTypes.string,
	inputClassName: PropTypes.string,
}

export default TextBox
