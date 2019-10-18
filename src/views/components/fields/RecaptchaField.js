import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import Reaptcha from "reaptcha"

import ValidationMessage from "../forms/ValidationMessage"

class RecaptchaField extends React.Component {
	constructor(props) {
		super(props)
		this.recaptchaInstance = null
	}

	componentWillUnmount() {
		this.recaptchaInstance = null
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			input: { value },
			reset,
			error,
		} = this.props

		if ((reset && !prevProps.reset) || error || !value) {
			this.recaptchaInstance.reset()
		}
	}

	onVerify = (value) => {
		const {
			input: { onChange },
		} = this.props

		onChange(value)
	}

	onExpire = () => {
		const {
			input: { onChange },
		} = this.props

		onChange()
	}

	onError = () => {
		const {
			input: { onChange },
		} = this.props

		onChange()
	}

	render() {
		const {
			label,
			sitekey,
			className,
			meta: { touched, error },
			reset,
			...props
		} = this.props

		return (
			<div className={classnames("form-group", "text-left", className)}>
				<Reaptcha
					ref={(e) => (this.recaptchaInstance = e)}
					sitekey={sitekey}
					onLoad={this.onLoad}
					onVerify={this.onVerify}
					onExpire={this.onExpire}
					onError={this.onError}
					{...props}
				/>
				<ValidationMessage
					label={label}
					touched={touched}
					error={error}
					{...props}
				/>
			</div>
		)
	}
}

RecaptchaField.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	text: PropTypes.string,
	className: PropTypes.string,
	sitekey: PropTypes.string.isRequired,
	reset: PropTypes.bool.isRequired,
}

export default RecaptchaField
