import React from "react"
import { Route, Redirect } from "react-router-dom"

import SetLanguage from "../shared/SetLanguage"

class PrivateRoute extends React.Component {
	render() {
		const {
			isAuthenticated,
			component: Component,
			currentLanguage,
			...props
		} = this.props

		return (
			<Route
				{...props}
				render={(props) =>
					isAuthenticated ? (
						<div>
							<SetLanguage />
							<Component {...props} />
						</div>
					) : (
						<Redirect
							to={{
								pathname: `/${currentLanguage}/sign-in`,
								state: { from: props.location.pathname },
							}}
						/>
					)
				}
			/>
		)
	}
}

export default PrivateRoute
