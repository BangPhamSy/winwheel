import { combineReducers } from "redux"
import { localeReducer as locale } from "react-localize-redux"
import { reducer as formReducer } from "redux-form"

import auth, { LOGOUT_SUCCESS } from "./Auth"
import transaction from "./Transaction"
import voucher from "./Voucher"
import profile from "./Profile"
import account from "./Account"
import contact from "./Contact"
import adminUnit from "./AdminUnit"
import modal from "./Modal"
import card from "./Card"
import password from "./Password"
import loading from "./Loading"
import mobileMenu from "./MobileMenu"
import xsrfToken from "./XsrfToken"
import systemCode from "./SystemCode"
import error from "./Error"

const appReducer = combineReducers({
	form: formReducer,
	locale,
	auth,
	transaction,
	voucher,
	password,
	profile,
	account,
	adminUnit,
	contact,
	card,
	modal,
	loading,
	error,
	mobileMenu,
	xsrfToken,
	systemCode,
})

const rootReducer = (state, action) => {
	if (action.type === LOGOUT_SUCCESS) {
		state = Object.keys(state).reduce((obj, i) => {
			if (
				i === "auth" ||
				i === "locale" ||
				i === "adminUnit" ||
				i === "router" ||
				i === "modal"
			)
				obj[i] = state[i]
			return obj
		}, {})
	}
	return appReducer(state, action)
}
export default rootReducer
