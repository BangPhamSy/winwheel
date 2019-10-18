import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Redirect } from "react-router-dom"

import { logout } from "../../redux/modules/Auth"
import { getActiveLanguage, getTranslate } from "react-localize-redux"

class LogOut extends Component {
	componentDidMount() {
		this.props.logout()
	}

	render() {
		const { isAuthenticated, currentLanguage } = this.props
		if (isAuthenticated) return <div>Logout...</div>
		return (
			<Redirect
				to={{
					pathname: `/${currentLanguage}/sign-in`,
				}}
			/>
		)
	}
}
const mapStateToProps = ({ locale, auth }) => ({
	currentLanguage: getActiveLanguage(locale).code,
	translate: getTranslate(locale),
	isAuthenticated: auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
	logout: bindActionCreators(logout, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)
