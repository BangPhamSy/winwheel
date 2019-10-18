import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Translate } from "react-localize-redux"

import Spinner from "./Spinner"

const Wrapper = (props) => {
	const { isFetching, errorMessage, children, data } = props

	if (errorMessage)
		return (
			<div className="text-center py-4">
				<p>{errorMessage}</p>

				<div className="mt-4 text-center">
					<Translate>
						{(translate, activeLanguage) => (
							<Link to={`/${activeLanguage.code}/`} className="btn">
								{translate("_Back")}
							</Link>
						)}
					</Translate>
				</div>
			</div>
		)

	if (!!isFetching)
		return (
			<div className="text-center py-3">
				<Spinner />
			</div>
		)

	if (typeof children === "function") {
		const component = children(data)
		return component
	}

	return children
}

Wrapper.defaultProps = {
	isFetching: true,
	errorMessage: "",
}

Wrapper.protoTypes = {
	isFetching: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
	children: PropTypes.node.isRequired,
	data: PropTypes.object,
}

export default Wrapper
