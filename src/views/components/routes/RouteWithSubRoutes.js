import React from "react"
import { Route } from "react-router-dom"
import SetLanguage from "../shared/SetLanguage"

class RouteWithSubRoutes extends React.Component {
	render() {
		const { component: Component, isAuthenticated, ...props } = this.props
		return (
			<Route
				{...props}
				render={(props) =>
					isAuthenticated ? (
						<div className="text-center my-4">
							You need to logout to see this page.
						</div>
					) : (
						<div>
							<SetLanguage />
							<Component {...this.props} />
						</div>
					)
				}
			/>
		)
	}
}

export default RouteWithSubRoutes
