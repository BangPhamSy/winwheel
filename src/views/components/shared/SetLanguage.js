import React from "react"
import { connect } from "react-redux"
import { push } from "connected-react-router"
import { bindActionCreators } from "redux"
import { withRouter } from "react-router-dom"
import { getActiveLanguage, setActiveLanguage } from "react-localize-redux"

import {
	setActiveCultureToCookie,
	getActiveCultureFromCookie,
} from "../../../helpers/userCulture"

class SetLanguage extends React.Component {
	componentDidMount() {
		const { match, redirect, currentLanguage } = this.props,
			localeUrl = match.params.locale,
			isUrlWithoutLocale = !localeUrl

		// add locale code into cookie if not found
		const cCulture = getActiveCultureFromCookie()
		if (!cCulture) setActiveCultureToCookie(currentLanguage)

		// add locale code into params if not found
		if (isUrlWithoutLocale) {
			if (cCulture) redirect(`/${cCulture}${match.url}`)
			else redirect(`/${currentLanguage}${match.url}`)
		} else if (cCulture !== localeUrl) {
			this.setActiveLocale(localeUrl, cCulture)
		} else {
			// update current locale code in redux state and cookie
			this.setActiveLocale(localeUrl, currentLanguage)
		}
	}

	setActiveLocale(newLanguage, currentLanguage) {
		//set current language to locale url (vi or en)
		if (newLanguage && newLanguage !== currentLanguage) {
			const { setActiveLanguage } = this.props
			setActiveCultureToCookie(newLanguage)
			setActiveLanguage(newLanguage)
			return true
		}
		return false
	}

	render() {
		return null
	}
}
const mapStateToProps = ({ auth, locale }) => ({
	currentLanguage: getActiveLanguage(locale).code,
	isAuthenticated: auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
	setActiveLanguage: bindActionCreators(setActiveLanguage, dispatch),
	redirect: bindActionCreators(push, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetLanguage))
