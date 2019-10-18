import apiClient from "../../helpers/apiClient"
import { startSubmit } from "redux-form"

import { fetchDistricts, fetchWards } from "./AdminUnit"
import { createLoadingSelector } from "./Loading"
import { getToken } from "./XsrfToken"

export const FETCH_PROFILE = "FETCH_PROFILE"
export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST"
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS"
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE"

export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST"
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS"
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE"

export const UPDATE_ADDRESS = "UPDATE_ADDRESS"
export const UPDATE_ADDRESS_REQUEST = "UPDATE_ADDRESS_REQUEST"
export const UPDATE_ADDRESS_SUCCESS = "UPDATE_ADDRESS_SUCCESS"
export const UPDATE_ADDRESS_FAILURE = "UPDATE_ADDRESS_FAILURE"
export const CLEAR_PROFILE_MESSAGE = "CLEAR_PROFILE_MESSAGE"

const initialState = {
	data: {},
	didLoaded: false,
	errorMessage: "",
	successMessage: "",
}

export const clearProfileMessage = () => (dispatch) => {
	return dispatch({
		type: CLEAR_PROFILE_MESSAGE,
		successMessage: "",
		errorMessage: "",
	})
}

export const fetchProfileWithAddress = () => (dispatch, getState) => {
	const isFetching = loadingProfileSelector(getState())
	if (isFetching) return Promise.resolve()

	return dispatch(fetchProfile()).then(() =>
		dispatch(() => {
			const promises = [],
				{ profile } = getState()

			if (profile.data) {
				const { cityCode, districtCode } = profile.data.address
				if (cityCode) promises.push(dispatch(fetchDistricts(cityCode)))

				if (districtCode && cityCode)
					promises.push(dispatch(fetchWards(cityCode, districtCode)))
			}
			return Promise.all(promises)
		})
	)
}

export const loadingProfileSelector = createLoadingSelector([FETCH_PROFILE])
export const fetchProfile = () => (dispatch) => {
	return dispatch({
		types: [FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE],
		shouldCallAPI: (state) =>
			!loadingProfileSelector(state) && !state.profile.didLoaded,
		callAPI: (config) => apiClient.get("api/account/getMemberProfile", config),
		payload: {},
	})
}

const updatingProfileSelector = createLoadingSelector([UPDATE_PROFILE])
export const updateProfile = (profile, profileFormId) => (dispatch, getState) => {
	const isFetching = updatingProfileSelector(getState())
	if (!profile || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(profileFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [
					UPDATE_PROFILE_REQUEST,
					UPDATE_PROFILE_SUCCESS,
					UPDATE_PROFILE_FAILURE,
				],
				callAPI: (config) =>
					apiClient.put("api/account/updateProfile", profile, config),
				payload: { profile, formId: profileFormId },
			})
		)
}

const updatingAddressSelector = createLoadingSelector([UPDATE_ADDRESS])
export const updateAddress = (address, addressFormId) => (dispatch, getState) => {
	const isFetching = updatingAddressSelector(getState())
	if (!address || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(addressFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [
					UPDATE_ADDRESS_FAILURE,
					UPDATE_ADDRESS_SUCCESS,
					UPDATE_ADDRESS_FAILURE,
				],
				callAPI: (config) =>
					apiClient.put("api/account/updateAddress", address, config),
				payload: { address, formId: addressFormId },
			})
		)
}

export default function reducer(state = initialState, action) {
	const { payload, errorMessage, successMessage } = action

	switch (action.type) {
		case FETCH_PROFILE_REQUEST:
			return {
				...state,
				didLoaded: false,
				errorMessage: "",
				successMessage: "",
			}
		case UPDATE_PROFILE_REQUEST:
		case UPDATE_ADDRESS_REQUEST:
			return {
				...state,
				errorMessage: "",
				successMessage: "",
			}
		case FETCH_PROFILE_SUCCESS:
			return {
				...state,
				data: payload,
				didLoaded: true,
			}
		case FETCH_PROFILE_FAILURE:
			return {
				...state,
				errorMessage,
			}
		case UPDATE_ADDRESS_SUCCESS:
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				data: { ...state.data, ...payload },
				successMessage,
			}
		case UPDATE_ADDRESS_FAILURE:
		case UPDATE_PROFILE_FAILURE:
			return {
				...state,
				errorMessage,
			}
		case CLEAR_PROFILE_MESSAGE:
			return {
				...state,
				errorMessage: "",
				successMessage: "",
			}
		default:
			return state
	}
}
