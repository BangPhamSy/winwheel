import apiClient from "../../helpers/apiClient"
import { isEmptyObj } from "../../helpers/validator"
import { arrayToObject } from "../../helpers/utility"
import { createLoadingSelector } from "./Loading"

export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS"
export const FETCH_TRANSACTIONS_REQUEST = "FETCH_TRANSACTIONS_REQUEST"
export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS"
export const FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE"

export const FETCH_TRANSACTION_DETAILS = "FETCH_TRANSACTION_DETAILS"
export const FETCH_TRANSACTION_DETAILS_REQUEST = "FETCH_TRANSACTION_DETAILS_REQUEST"
export const FETCH_TRANSACTION_DETAILS_SUCCESS = "FETCH_TRANSACTION_DETAILS_SUCCESS"
export const FETCH_TRANSACTION_DETAILS_FAILURE = "FETCH_TRANSACTION_DETAILS_FAILURE"

export const INVALIDATE_DID_LOADED = "INVALIDATE_DID_LOADED"

const initialState = {
	data: {},
	didLoaded: false,
	errorMessage: "",
}

export const invalidateDidLoaded = () => (dispatch) => {
	dispatch({ type: INVALIDATE_DID_LOADED })
	return Promise.resolve()
}

export const loadingTransactionsSelector = createLoadingSelector([FETCH_TRANSACTIONS])
export const fetchTransactions = (cardNo) => (dispatch) => {
	return dispatch({
		types: [
			FETCH_TRANSACTIONS_REQUEST,
			FETCH_TRANSACTIONS_SUCCESS,
			FETCH_TRANSACTIONS_FAILURE,
		],
		shouldCallAPI: (state) => true,
		///!loadingTransactionsSelector(state) && !state.transaction.didLoaded,
		callAPI: (config) =>
			apiClient.get(`api/transaction/getTransactionList/${cardNo}`, config),
		payload: { cardNo },
	})
}

export const loadingTransactionDetailsSelector = createLoadingSelector([
	FETCH_TRANSACTION_DETAILS,
])
export const fetchTransactionDetails = (receiptNo, autoID) => (dispatch) => {
	return dispatch({
		types: [
			FETCH_TRANSACTION_DETAILS_REQUEST,
			FETCH_TRANSACTION_DETAILS_SUCCESS,
			FETCH_TRANSACTION_DETAILS_FAILURE,
		],
		shouldCallAPI: (state) =>
			!loadingTransactionDetailsSelector(state) &&
			(isEmptyObj(state.transaction.data) ||
				!state.transaction.data[autoID] ||
				!state.transaction.data[autoID].transactionDetailsList ||
				state.transaction.data[autoID].transactionDetailsList.length <= 0),
		callAPI: (config) =>
			apiClient.get(
				`api/transaction/GetTransactionDetails/${receiptNo}/${autoID}`,
				config
			),
		payload: { receiptNo },
	})
}

export default function reducer(state = initialState, action) {
	const { payload, errorMessage } = action
	switch (action.type) {
		case FETCH_TRANSACTIONS_REQUEST:
		case FETCH_TRANSACTION_DETAILS_REQUEST:
			return {
				...state,
				errorMessage: "",
				successMessage: "",
			}
		case FETCH_TRANSACTIONS_FAILURE:
		case FETCH_TRANSACTION_DETAILS_FAILURE:
			return {
				...state,
				errorMessage: errorMessage,
			}
		case FETCH_TRANSACTIONS_SUCCESS:
			return {
				...state,
				data: { ...state.payload, ...arrayToObject(payload, "autoID") },
				didLoaded: true,
			}
		case FETCH_TRANSACTION_DETAILS_SUCCESS:
			const currentTxnDetails = state.data[payload.autoID]
				? state.data[payload.autoID]
				: {}
			return {
				...state,
				data: {
					...state.data,
					[payload.autoID]: {
						...currentTxnDetails,
						...payload,
					},
				},
			}
		case INVALIDATE_DID_LOADED:
			return { ...state, didLoaded: false }
		default:
			return state
	}
}
