import { push } from "connected-react-router"
import { startSubmit } from "redux-form"

import apiClient from "../../helpers/apiClient"
import { formId as signUpFormId } from "../../views/modules/SignUpForm"
import { showMessageModal } from "./Modal"
import { createLoadingSelector } from "./Loading"
import { logout } from "./Auth"
import { getToken } from "./XsrfToken"
import { createErrorMessageSelector } from "./Error"
import React from "react"

export const CREATE_ACCOUNT = "CREATE_ACCOUNT"
export const CREATE_ACCOUNT_REQUEST = "CREATE_ACCOUNT_REQUEST"
export const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS"
export const CREATE_ACCOUNT_FAILURE = "CREATE_ACCOUNT_FAILURE"

export const UNREGISTER = "UNREGISTER"
export const UNREGISTER_REQUEST = "UNREGISTER_REQUEST"
export const UNREGISTER_SUCCESS = "UNREGISTER_SUCCESS"
export const UNREGISTER_FAILURE = "UNREGISTER_FAILURE"

export const FETCH_MEMBER_REWARD = "FETCH_MEMBER_REWARD"
export const FETCH_MEMBER_REWARD_REQUEST = "FETCH_MEMBER_REWARD_REQUEST"
export const FETCH_MEMBER_REWARD_SUCCESS = "FETCH_MEMBER_REWARD_SUCCESS"
export const FETCH_MEMBER_REWARD_FAILURE = "FETCH_MEMBER_REWARD_FAILURE"

export const VERIFY_MEMBER = "VERIFY_MEMBER"
export const VERIFY_MEMBER_REQUEST = "VERIFY_MEMBER_REQUEST"
export const VERIFY_MEMBER_SUCCESS = "VERIFY_MEMBER_SUCCESS"
export const VERIFY_MEMBER_FAILURE = "VERIFY_MEMBER_FAILURE"

export const VERIFY_UNREGISTER_MEMBER = "VERIFY_UNREGISTER_MEMBER"
export const VERIFY_UNREGISTER_MEMBER_REQUEST = "VERIFY_UNREGISTER_MEMBER_REQUEST"
export const VERIFY_UNREGISTER_MEMBER_SUCCESS = "VERIFY_UNREGISTER_MEMBER_SUCCESS"
export const VERIFY_UNREGISTER_MEMBER_FAILURE = "VERIFY_UNREGISTER_MEMBER_FAILURE"

const initialState = {
	data: {},
	didLoaded: false,
	errorMessage: "",
	successMessage: "",
}

export const submittingCreateAccountSelector = createLoadingSelector([CREATE_ACCOUNT])
export const createAccount = (caModel) => (dispatch, getState) => {
	const isFetching = submittingCreateAccountSelector(getState())
	if (!caModel || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(signUpFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [
					CREATE_ACCOUNT_REQUEST,
					CREATE_ACCOUNT_SUCCESS,
					CREATE_ACCOUNT_FAILURE,
				],
				callAPI: (config) =>
					apiClient.post("api/account/register", caModel, config),
				payload: { caModel, formId: signUpFormId },
			})
		)
		.then((resp) => {
			const { successMessage } = getState().account
			const htmlValueObject = React.createElement("span", {
				dangerouslySetInnerHTML: { __html: successMessage },
			})
			if (successMessage)
				return dispatch(
					showMessageModal(htmlValueObject, () => dispatch(push(`/sign-in`)))
				)
			return resp
		})
}

export const unRegisterErrorSelector = createErrorMessageSelector([UNREGISTER])
export const submittingUnregisterSelector = createLoadingSelector([UNREGISTER])
export const unRegister = () => (dispatch, getState) => {
	const isSubmitting = submittingUnregisterSelector(getState())
	if (isSubmitting) return Promise.resolve()

	return dispatch(getToken())
		.then(() =>
			dispatch({
				types: [UNREGISTER_REQUEST, UNREGISTER_SUCCESS, UNREGISTER_FAILURE],
				callAPI: (config) =>
					apiClient.delete(
						"api/account/sendUnregisterVerificationEmail",
						config
					),
				//callAPI: (config) => apiClient.delete("api/account/unregister", config),
				payload: {},
			})
		)
		.then(
			(resp) => {
				const { successMessage } = getState().account
				if (successMessage)
					return dispatch(
						showMessageModal(successMessage, () => dispatch(logout()))
					)
				return resp
			},
			(error) => {
				const errorMessage = unRegisterErrorSelector(getState())
				if (errorMessage) {
					return dispatch(showMessageModal(errorMessage))
				}
				return Promise.reject(error)
			}
		)
}

export const loadingRewardSelector = createLoadingSelector([FETCH_MEMBER_REWARD])
export const fetchMemberReward = () => (dispatch) => {
	return dispatch({
		types: [
			FETCH_MEMBER_REWARD_REQUEST,
			FETCH_MEMBER_REWARD_SUCCESS,
			FETCH_MEMBER_REWARD_FAILURE,
		],
		shouldCallAPI: (state) =>
			!loadingRewardSelector(state) && !state.account.didLoaded,
		callAPI: (config) => apiClient.get("api/card/getMemberReward", config),
		payload: {},
	})
}

export const verifyingMemberSelector = createLoadingSelector([VERIFY_MEMBER])
export const verifyMember = (token) => (dispatch, getState) => {
	const isFetching = verifyingMemberSelector(getState())
	if (!token || isFetching) return Promise.resolve()

	return dispatch({
		types: [VERIFY_MEMBER_REQUEST, VERIFY_MEMBER_SUCCESS, VERIFY_MEMBER_FAILURE],
		callAPI: (config) =>
			apiClient.post("api/account/verifyRegistration", token, config),
		payload: { token },
	})
}

export const verifyingUnregisterMemberSelector = createLoadingSelector([
	VERIFY_UNREGISTER_MEMBER,
])
export const verifyUnregisterMember = (token) => (dispatch, getState) => {
	const isFetching = verifyingUnregisterMemberSelector(getState())
	if (!token || isFetching) return Promise.resolve()

	return dispatch({
		types: [
			VERIFY_UNREGISTER_MEMBER_REQUEST,
			VERIFY_UNREGISTER_MEMBER_SUCCESS,
			VERIFY_UNREGISTER_MEMBER_FAILURE,
		],
		callAPI: (config) =>
			apiClient.post("api/account/verifyUnRegistration", token, config),
		payload: { token },
	})
}

export default function reducer(state = initialState, action) {
	const { payload, successMessage, errorMessage } = action
	switch (action.type) {
		case FETCH_MEMBER_REWARD_REQUEST:
		case CREATE_ACCOUNT_REQUEST:
		case UNREGISTER_REQUEST:
		case VERIFY_MEMBER_REQUEST:
		case VERIFY_UNREGISTER_MEMBER_REQUEST:
			return {
				...state,
				successMessage: "",
				errorMessage: "",
			}
		case CREATE_ACCOUNT_SUCCESS:
		case UNREGISTER_SUCCESS:
			return {
				...state,
				successMessage,
			}
		case FETCH_MEMBER_REWARD_SUCCESS:
			return {
				...state,
				data: payload,
				didLoaded: true,
			}
		case VERIFY_MEMBER_SUCCESS:
		case VERIFY_UNREGISTER_MEMBER_SUCCESS: {
			return {
				...state,
				successMessage,
			}
		}
		case CREATE_ACCOUNT_FAILURE:
		case FETCH_MEMBER_REWARD_FAILURE:
		case VERIFY_MEMBER_FAILURE:
		case VERIFY_UNREGISTER_MEMBER_FAILURE:
			return {
				...state,
				errorMessage,
			}
		// case UNREGISTER_FAILURE:
		default:
			return state
	}
}
