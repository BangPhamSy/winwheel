import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import ValidationMessage from "../forms/ValidationMessage"
import { isValidFileExtension, isMaxFileSize } from "../../../helpers"

const convertFileToBase64 = ({ file, callback, allowedFileExtensions, maxSize }) => {
	if (file) {
		const value = {
			name: file.name,
			size: file.size,
			type: file.type,
			content: "",
		}
		console.log(value)
		if (!isValidFileExtension(file, allowedFileExtensions)) return callback(value)

		if (isMaxFileSize(file, maxSize)) return callback(value)

		var reader = new FileReader()
		//wait for file to be uploaded to memory
		reader.onload = function(event) {
			if (event.target.readyState === FileReader.DONE) {
				callback({
					...value,
					content: event.target.result,
				})
			}
		}
		reader.readAsDataURL(file)
	}
}

class FileUploadField extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
		this.fileUploadRef = React.createRef()
	}

	handleChange(e) {
		const { input, maxSize, allowedFileExtensions } = this.props
		convertFileToBase64({
			file: e.target.files[0],
			callback: input.onChange,
			maxSize,
			allowedFileExtensions,
		})
	}

	handleBlur(e) {
		const { input, maxSize, allowedFileExtensions } = this.props
		convertFileToBase64({
			file: e.target.files[0],
			callback: input.onBlur,
			maxSize,
			allowedFileExtensions,
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.input.value && !this.props.input.value)
			this.fileUploadRef.current.value = ""
	}

	render() {
		const {
			input: { name },
			label,
			className,
			labelClassName,
			disabled,
			required,
			accept,
			multiple,
			meta: { touched, error },
			...props
		} = this.props

		return (
			<div className={classNames("form-group text-left", className)}>
				<label
					htmlFor={name}
					data-required={required && !disabled}
					className={classNames(
						"textbox_label textbox_label-primary",
						labelClassName
					)}>
					{label}
				</label>
				<div className="file-upload-container">
					<input
						ref={this.fileUploadRef}
						name={name}
						id={name}
						type="file"
						disabled={disabled}
						onBlur={this.handleBlur}
						onChange={this.handleChange}
						multiple={multiple}
						required={required}
						accept={accept}
						className="file-upload"
					/>
				</div>
				<ValidationMessage
					label={label}
					error={error}
					touched={touched}
					{...props}
				/>
			</div>
		)
	}
}

FileUploadField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	required: PropTypes.bool,
	labelClassName: PropTypes.string,
	className: PropTypes.string,
	meta: PropTypes.object.isRequired,
	disabled: PropTypes.bool,
	accept: PropTypes.string,
	multiple: PropTypes.bool,
	allowedFileExtensions: PropTypes.array,
	maxSize: PropTypes.number,
}

export default FileUploadField
