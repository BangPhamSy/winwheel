import React from "react"
import PropTypes from "prop-types"

import Spinner from "../common/Spinner"

const Button = ({ children, loading, type, ...props }) => {
	return loading ? (
		<button {...props} type="disabled" disabled>
			<Spinner />
		</button>
	) : (
		<button {...props} type={type}>
			{children}
		</button>
	)
}

Button.prototype = {
	loading: PropTypes.bool,
	disable: PropTypes.bool,
	children: PropTypes.node.isRequired,
}

export default Button
