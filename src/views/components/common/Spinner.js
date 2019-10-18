import React from "react"
import classnames from "classnames"

export default ({ className }) => (
	<div className={classnames("spinner-container", className)}>
		<div className="spinner" />
	</div>
)
