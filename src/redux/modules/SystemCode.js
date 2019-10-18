import apiClient from "../../helpers/apiClient"
import { isEmptyObj } from "../../helpers/validator"
import { arrayToObject, objectToArray } from "../../helpers/utility"
import { createLoadingSelector } from "./Loading"

export const FETCH_SYSTEM_CODES = "FETCH_SYSTEM_CODES"
export const FETCH_SYSTEM_CODES_REQUEST = "FETCH_SYSTEM_CODES_REQUEST"
export const FETCH_SYSTEM_CODES_SUCCESS = "FETCH_SYSTEM_CODES_SUCCESS"
export const FETCH_SYSTEM_CODES_FAILURE = "FETCH_SYSTEM_CODES_FAILURE"

const initialState = {
	data: {},
	errorMessage: "",
}

export const loadingSysCodesSelector = createLoadingSelector([FETCH_SYSTEM_CODES])
export const fetchSysCodes = (parentCode) => (dispatch) => {
	return dispatch({
		types: [
			FETCH_SYSTEM_CODES_REQUEST,
			FETCH_SYSTEM_CODES_SUCCESS,
			FETCH_SYSTEM_CODES_FAILURE,
		],
		shouldCallAPI: (state) =>
			!loadingSysCodesSelector(state) &&
			(isEmptyObj(state.systemCode.data) || !state.systemCode.data[parentCode]),
		callAPI: (config) =>
			apiClient.get(`api/systemCode/getSystemCodes/${parentCode}`, config),
		payload: {},
	})
}

export const getSysCodeOptions = (parentCode) => (dispatch, getState) => {
	return dispatch(fetchSysCodes(parentCode)).then((resp) => {
		const salutations = getState().systemCode.data[parentCode]
		if (salutations) {
			const salutationOptions = objectToArray(salutations).reduce((acc, sa) => {
				acc.push({ value: sa.name, label: sa.name })
				return acc
			}, [])
			return { options: salutationOptions }
		}
	})
}

export default function reducer(state = initialState, action) {
	const { payload, errorMessage } = action
	switch (action.type) {
		case FETCH_SYSTEM_CODES_REQUEST:
			return {
				...state,
				errorMessage: "",
				successMessage: "",
			}
		case FETCH_SYSTEM_CODES_FAILURE:
			return {
				...state,
				errorMessage,
			}
		case FETCH_SYSTEM_CODES_SUCCESS:
			const currentParentCode = state.data[payload[0].parentCode]
			return {
				...state,
				data: {
					...state.payload,
					[payload[0].parentCode]: {
						...currentParentCode,
						...arrayToObject(payload, "systemCode"),
					},
				},
			}
		default:
			return state
	}
}
