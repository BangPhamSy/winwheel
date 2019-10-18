import React from "react"
import PropTypes from "prop-types"
import { Translate } from "react-localize-redux"
import classnames from "classnames"

const ValidationMessage = ({
	touched,
	error,
	minLength,
	maxLength,
	fixedLength,
	className,
	label,
	match,
	maxSize,
}) => {
	return touched && error ? (
		<span className={classnames("form-error", className)}>
			{error.startsWith("_") ? (
				<Translate
					id={error}
					data={{ label, minLength, maxLength, match, maxSize, fixedLength }}
				/>
			) : (
				error
			)}
		</span>
	) : null
}

ValidationMessage.propTypes = {
	touched: PropTypes.bool,
	error: PropTypes.string,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	fixedLength: PropTypes.number,
	label: PropTypes.string,
	match: PropTypes.string,
	maxSize: PropTypes.number,
}

export default ValidationMessage
