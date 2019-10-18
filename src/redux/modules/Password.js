import { reset, startSubmit } from "redux-form"
import { push } from "connected-react-router"
import { getActiveLanguage } from "react-localize-redux"

import apiClient from "../../helpers/apiClient"
import { showMessageModal } from "./Modal"
import { createLoadingSelector } from "./Loading"
import { getToken } from "./XsrfToken"

export const CHANGE_PASSWORD = "CHANGE_PASSWORD"
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST"
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS"
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE"

export const FORGOT_PASSWORD = "FORGOT_PASSWORD"
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST"
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS"
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE"

export const VERIFY_RESET_TOKEN = "VERIFY_RESET_TOKEN"
export const VERIFY_RESET_TOKEN_REQUEST = "VERIFY_RESET_TOKEN_REQUEST"
export const VERIFY_RESET_TOKEN_SUCCESS = "VERIFY_RESET_TOKEN_SUCCESS"
export const VERIFY_RESET_TOKEN_FAILURE = "VERIFY_RESET_TOKEN_FAILURE"

export const RESET_PASSWORD = "RESET_PASSWORD"
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST"
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS"
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE"

const initialState = {
	errorMessage: "",
	successMessage: "",
}

const submittingChangePswSelector = createLoadingSelector([CHANGE_PASSWORD])
export const changePassword = (cbModel, changePswFormId) => (dispatch, getState) => {
	const isFetching = submittingChangePswSelector(getState())
	if (!cbModel || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(changePswFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [
					CHANGE_PASSWORD_REQUEST,
					CHANGE_PASSWORD_SUCCESS,
					CHANGE_PASSWORD_FAILURE,
				],
				callAPI: (config) =>
					apiClient.put("api/password/changePassword", cbModel, config),
				payload: { cbModel, formId: changePswFormId },
			})
		)
}

const submittingForgotPswSelector = createLoadingSelector([FORGOT_PASSWORD])
export const forgotPassword = (fwModel, fwFormId) => (dispatch, getState) => {
	const isFetching = submittingForgotPswSelector(getState())
	if (!fwModel || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(fwFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [
					FORGOT_PASSWORD_REQUEST,
					FORGOT_PASSWORD_SUCCESS,
					FORGOT_PASSWORD_FAILURE,
				],
				callAPI: (config) =>
					apiClient.post("api/password/forgotPassword", fwModel, config),
				payload: { fwModel, formId: fwFormId, isCaptcha: true },
			})
		)
		.then((resp) => {
			const { successMessage } = getState().password

			if (successMessage) {
				const currentLanguage = getActiveLanguage(getState().locale).code
				return Promise.all([
					dispatch(
						showMessageModal(successMessage, () =>
							dispatch(push(`/${currentLanguage}/sign-in`))
						)
					),
					dispatch(reset(fwFormId)),
				])
			}
			return resp
		})
}

export const verifyingTokenSelector = createLoadingSelector([VERIFY_RESET_TOKEN])
export const verifyResetToken = (token, fwFormId) => (dispatch, getState) => {
	const isFetching = verifyingTokenSelector(getState())
	if (!token || isFetching) return Promise.resolve()

	return dispatch({
		types: [
			VERIFY_RESET_TOKEN_REQUEST,
			VERIFY_RESET_TOKEN_SUCCESS,
			VERIFY_RESET_TOKEN_FAILURE,
		],
		callAPI: (config) =>
			apiClient.post("api/password/verifyResetToken", token, config),
		payload: { token, formId: fwFormId },
	})
}

export const submittingResetPswSelector = createLoadingSelector([RESET_PASSWORD])
export const resetPassword = (resetPsw, resetPswFormId) => (dispatch, getState) => {
	const isFetching = submittingResetPswSelector(getState())
	if (!resetPsw || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(resetPswFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [
					RESET_PASSWORD_REQUEST,
					RESET_PASSWORD_SUCCESS,
					RESET_PASSWORD_FAILURE,
				],
				callAPI: (config) =>
					apiClient.post("api/password/resetPassword", resetPsw, config),
				payload: { resetPsw, formId: resetPswFormId },
			})
		)
		.then(
			(resp) => {
				const { successMessage } = getState().password

				if (successMessage) {
					const currentLanguage = getActiveLanguage(getState().locale).code
					return Promise.all([
						dispatch(
							showMessageModal(successMessage, () =>
								dispatch(push(`/${currentLanguage}/sign-in`))
							)
						),
						dispatch(reset(resetPswFormId)),
					])
				}
				return resp
			},
			(error) => {
				const { errorMessage } = getState().password
				if (errorMessage) {
					dispatch(showMessageModal(errorMessage))
				}
				return Promise.reject(error)
			}
		)
}

export default function reducer(state = initialState, action) {
	const { errorMessage, successMessage } = action
	switch (action.type) {
		case VERIFY_RESET_TOKEN_REQUEST:
			return {
				...state,
				successMessage: "",
				errorMessage: "",
			}
		case VERIFY_RESET_TOKEN_SUCCESS:
			return {
				...state,
				successMessage,
			}

		case VERIFY_RESET_TOKEN_FAILURE:
			return {
				...state,
				errorMessage,
			}
		case CHANGE_PASSWORD_REQUEST:
		case FORGOT_PASSWORD_REQUEST:
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				successMessage: "",
				errorMessage: "",
			}
		case RESET_PASSWORD_SUCCESS:
		case CHANGE_PASSWORD_SUCCESS:
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				successMessage,
			}
		case CHANGE_PASSWORD_FAILURE:
		case FORGOT_PASSWORD_FAILURE:
		case RESET_PASSWORD_FAILURE:
			return {
				...state,
				errorMessage,
			}
		default:
			return state
	}
}
