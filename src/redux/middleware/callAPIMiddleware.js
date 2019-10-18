import { stopSubmit, change } from "redux-form"
import { getActiveLanguage } from "react-localize-redux"

import { transformToFormErrors } from "../../helpers/validator"
import authHeader from "../../helpers/authHeader"
import { logout } from "../modules/Auth"
import userCulture from "../../helpers/userCulture"

export default function callAPIMiddleware({ dispatch, getState }) {
	return (next) => (action) => {
		const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action

		if (!types) {
			// Normal action: pass it on
			return next(action)
		}

		if (
			!Array.isArray(types) ||
			types.length !== 3 ||
			!types.every((type) => typeof type === "string")
		) {
			throw new Error("Expected an array of three string types.")
		}

		if (typeof callAPI !== "function") {
			throw new Error("Expected callAPI to be a function.")
		}

		if (!shouldCallAPI(getState())) {
			return Promise.resolve()
		}

		const [requestType, successType, failureType] = types

		dispatch(
			Object.assign({}, payload, {
				type: requestType,
			})
		)
		const { locale, auth } = getState()
		// Alter defaults after instance has been created
		const config = {
			// params: { culture: userCulture(getActiveLanguage(locale).code) },
			headers: {
				Authorization: authHeader(auth.token).Authorization,
				"Accept-Language": userCulture(getActiveLanguage(locale).code),
			},
		}

		return callAPI(config).then(
			(response) => {
				const data = response.data
				const successMessage = data ? data.message : ""

				if (payload && payload.formId) {
					dispatch(stopSubmit(payload.formId))
				}

				return dispatch(
					Object.assign({}, payload, {
						response,
						type: successType,
						payload: data ? data.payload : null,
						errorMessage: "",
						successMessage,
					})
				)
			},
			(error) => {
				const response = error.response ? error.response : {},
					data = response.data
				let errorMessage = data
					? data.message
					: payload.defaultMessage
						? payload.defaultMessage
						: error.message

				//log out when the jwt token is expired or invalid
				if (response.status === 401 && getState().auth.isAuthenticated) {
					dispatch(logout())
				}

				//if ajax request if form submit
				if (payload && payload.formId) {
					let errors = payload.isCaptcha
						? { recaptcha: "_shared.form.validate._required" }
						: {}
					//set form status to failed and update error messages
					if (data && data.errors && data.errors.length > 0) {
						errors = Object.assign(errors, transformToFormErrors(data.errors))
					} else {
						errors = Object.assign(errors, { _error: errorMessage })
					}
					//work around to clear value for recaptcha
					console.log(payload)
					if (payload.isCaptcha) {
						dispatch(change(payload.formId, "recaptcha", ""))
					}

					dispatch(stopSubmit(payload.formId, errors))
					//remove error since we already use redux-form error
					errorMessage = ""
				}

				return Promise.reject(
					dispatch(
						Object.assign({}, payload, {
							error,
							type: failureType,
							errorMessage,
						})
					)
				)
			}
		)
	}
}
