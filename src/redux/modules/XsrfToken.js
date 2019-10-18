import { createLoadingSelector } from "./Loading"

import apiClient from "../../helpers/apiClient"

export const GET_TOKEN = "GET_TOKEN"
export const GET_TOKEN_REQUEST = "GET_TOKEN_REQUEST"
export const GET_TOKEN_FAILURE = "GET_TOKEN_FAILURE"
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS"

const initialState = {
	isSuccess: false,
}

export const loadingTokenSelector = createLoadingSelector([GET_TOKEN])
export const getToken = () => (dispatch, getState) => {
	return dispatch({
		types: [GET_TOKEN_REQUEST, GET_TOKEN_SUCCESS, GET_TOKEN_FAILURE],
		shouldCallAPI: (state) => !loadingTokenSelector(state),
		callAPI: (config) => apiClient.get(`api/XsrfToken/getToken`, config),
		payload: {},
	}).catch((err) => console.error(err))
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_TOKEN_FAILURE:
		case GET_TOKEN_REQUEST:
			return {
				...state,
				isSuccess: false,
			}
		case GET_TOKEN_SUCCESS:
			return {
				...state,
				isSuccess: true,
			}
		default:
			return state
	}
}
