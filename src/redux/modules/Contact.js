import apiClient from "../../helpers/apiClient"
import { reset, startSubmit } from "redux-form"

import { showMessageModal } from "./Modal"
import { createLoadingSelector } from "./Loading"
import { getToken } from "./XsrfToken"

export const SUBMIT_CONTACT_FORM = "SUBMIT_CONTACT_FORM"
export const SUBMIT_CONTACT_FORM_REQUEST = "SUBMIT_CONTACT_FORM_REQUEST"
export const SUBMIT_CONTACT_FORM_SUCCESS = "SUBMIT_CONTACT_FORM_SUCCESS"
export const SUBMIT_CONTACT_FORM_FAILURE = "SUBMIT_CONTACT_FORM_FAILURE"

const initialState = {
	errorMessage: "",
	successMessage: "",
}

export const submittingContactFormsSelector = createLoadingSelector([SUBMIT_CONTACT_FORM])
export const submitContactForm = (values, formId) => (dispatch, getState) => {
	const isFetching = submittingContactFormsSelector(getState())
	if (!values || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(formId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [
					SUBMIT_CONTACT_FORM_REQUEST,
					SUBMIT_CONTACT_FORM_SUCCESS,
					SUBMIT_CONTACT_FORM_FAILURE,
				],
				callAPI: (config) =>
					apiClient.post("api/contact/submitContactUs", values, config),
				payload: { values, formId },
			})
		)
		.then((resp) => {
			const { successMessage } = getState().contact
			if (successMessage)
				return Promise.all([
					dispatch(showMessageModal(successMessage)),
					dispatch(reset(formId)),
				])
			return resp
		})
}

export default function reducer(state = initialState, action) {
	const { errorMessage, successMessage } = action
	switch (action.type) {
		case SUBMIT_CONTACT_FORM_REQUEST:
			return {
				...state,
				successMessage: "",
				errorMessage: "",
			}
		case SUBMIT_CONTACT_FORM_SUCCESS:
			return {
				...state,
				successMessage,
			}
		case SUBMIT_CONTACT_FORM_FAILURE:
			return {
				...state,
				errorMessage,
			}
		default:
			return state
	}
}
