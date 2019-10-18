import apiClient from "../../helpers/apiClient"
import { createLoadingSelector } from "./Loading"
import { arrayToObject } from "../../helpers"

export const FETCH_VOUCHERS = "FETCH_VOUCHERS"
export const FETCH_VOUCHERS_REQUEST = "FETCH_VOUCHERS_REQUEST"
export const FETCH_VOUCHERS_SUCCESS = "FETCH_VOUCHERS_SUCCESS"
export const FETCH_VOUCHERS_FAILURE = "FETCH_VOUCHERS_FAILURE"

const initialState = {
	data: {},
	didLoaded: false,
	errorMessage: "",
}
export const loadingVouchersSelector = createLoadingSelector([FETCH_VOUCHERS])
export const fetchVouchers = (voucherStatus) => (dispatch) => {
	return dispatch({
		types: [FETCH_VOUCHERS_REQUEST, FETCH_VOUCHERS_SUCCESS, FETCH_VOUCHERS_FAILURE],
		/*shouldCallAPI: (state) =>
			!loadingVouchersSelector(state) && !state.voucher.didLoaded,*/
		callAPI: (config) =>
			apiClient.get(`api/voucher/getVoucherList/${voucherStatus}`, config),
		payload: {},
	})
}

export default function reducer(state = initialState, action) {
	const { payload, errorMessage } = action
	switch (action.type) {
		case FETCH_VOUCHERS_REQUEST:
			return {
				...state,
				errorMessage: "",
				successMessage: "",
			}
		case FETCH_VOUCHERS_SUCCESS:
			return {
				...state,
				data: { ...state.payload, ...arrayToObject(payload, "voucherNo") },
				didLoaded: true,
			}
		case FETCH_VOUCHERS_FAILURE:
			return {
				...state,
				errorMessage,
			}
		default:
			return state
	}
}
