import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Async } from "react-select"
import "react-select/dist/react-select.css"

import ValidationMessage from "../forms/ValidationMessage"
import { Translate } from "react-localize-redux"

const AsyncSelectField = ({
	input,
	label,
	loadOptions,
	className,
	selectClassName,
	required,
	disabled,
	hideLabel,
	meta: { touched, error },
	...props
}) => {
	const { value, onBlur, onChange } = input

	return (
		<Translate>
			{(translate) => (
				<div className={classNames("form-group", className)}>
					{!hideLabel && (
						<label
							data-required={required && !disabled}
							htmlFor={input.name}
							className="textbox_label textbox_label-primary">
							{label}
							{" :"}
						</label>
					)}

					<Async
						className={`${selectClassName} ${
							touched && error ? "Select-error" : ""
						}`}
						value={value}
						disabled={disabled}
						placeholder={`${translate(
							"_shared.form.placeholder._select"
						)} ${label}`}
						loadOptions={loadOptions}
						onChange={(option) => onChange(option)}
						onBlur={() => onBlur(value)}
						isError={error && touched}
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
	)
}

AsyncSelectField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	text: PropTypes.string,
	className: PropTypes.string,
	meta: PropTypes.object.isRequired,
	disabled: PropTypes.bool,
	hideLabel: PropTypes.bool,
}

export default AsyncSelectField
