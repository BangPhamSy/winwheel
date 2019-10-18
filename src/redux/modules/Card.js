import apiClient from "../../helpers/apiClient"
import { startSubmit, reset } from "redux-form"

import { showMessageModal } from "./Modal"
import { arrayToObject, removeProperty, objectToArray } from "../../helpers/utility"
import { createLoadingSelector } from "./Loading"
import { getToken } from "./XsrfToken"

export const FETCH_CARDS = "FETCH_CARDS"
export const FETCH_CARDS_REQUEST = "FETCH_CARDS_REQUEST"
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS"
export const FETCH_CARDS_FAILURE = "FETCH_CARDS_FAILURE"

export const SET_DEFAULT_CARD = "SET_DEFAULT_CARD"
export const SET_DEFAULT_CARD_REQUEST = "SET_DEFAULT_CARD_REQUEST"
export const SET_DEFAULT_CARD_SUCCESS = "SET_DEFAULT_CARD_SUCCESS"
export const SET_DEFAULT_CARD_FAILURE = "SET_DEFAULT_CARD_FAILURE"

export const REMOVE_CARD = "REMOVE_CARD"
export const REMOVE_CARD_REQUEST = "REMOVE_CARD_REQUEST"
export const REMOVE_CARD_SUCCESS = "REMOVE_CARD_SUCCESS"
export const REMOVE_CARD_FAILURE = "REMOVE_CARD_FAILURE"

export const REPORT_LOST = "REPORT_LOST"
export const REPORT_LOST_REQUEST = "REPORT_LOST_REQUEST"
export const REPORT_LOST_SUCCESS = "REPORT_LOST_SUCCESS"
export const REPORT_LOST_FAILURE = "REPORT_LOST_FAILURE"

export const ADD_CARD = "ADD_CARD"
export const ADD_CARD_REQUEST = "ADD_CARD_REQUEST"
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS"
export const ADD_CARD_FAILURE = "ADD_CARD_FAILURE"

export const UPDATE_CARD = "UPDATE_CARD"
export const UPDATE_CARD_REQUEST = "UPDATE_CARD_REQUEST"
export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS"
export const UPDATE_CARD_FAILURE = "UPDATE_CARD_FAILURE"

export const TRANSFER_BALANCE = "TRANSFER_BALANCE"
export const TRANSFER_BALANCE_REQUEST = "TRANSFER_BALANCE_REQUEST"
export const TRANSFER_BALANCE_SUCCESS = "TRANSFER_BALANCE_SUCCESS"
export const TRANSFER_BALANCE_FAILURE = "TRANSFER_BALANCE_FAILURE"

const initialState = {
	data: {},
	errorMessage: "",
	successMessage: "",
}

export const loadingDefaultCardSelector = createLoadingSelector([FETCH_CARDS])
export const setDefaultCard = (values, setDefaultCardFormId) => (dispatch, getState) => {
	const isFetching = loadingDefaultCardSelector(getState())
	if (!values || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(setDefaultCardFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [
					SET_DEFAULT_CARD_REQUEST,
					SET_DEFAULT_CARD_SUCCESS,
					SET_DEFAULT_CARD_FAILURE,
				],
				callAPI: (config) =>
					apiClient.post(`api/card/setDefaultCard`, values, config),
				payload: { values, formId: setDefaultCardFormId },
			})
		)
		.then((resp) => {
			const { successMessage } = getState().card
			if (successMessage) return dispatch(showMessageModal(successMessage))
			return resp
		})
}

export const loadingCardsSelector = createLoadingSelector([FETCH_CARDS])
export const fetchCards = () => (dispatch, getState) => {
	return dispatch({
		types: [FETCH_CARDS_REQUEST, FETCH_CARDS_SUCCESS, FETCH_CARDS_FAILURE],
		callAPI: (config) => apiClient.get(`api/card/getCardList/1`, config),
		payload: {},
	})
}

export const getCardOptions = () => (dispatch, getState) => {
	return dispatch(fetchCards()).then((resp) => {
		const cards = getState().card.data

		if (cards) {
			const cardOptions = objectToArray(cards).reduce((options, card) => {
				options.push({
					value: card.cardNo,
					label: card.cardNo,
				})
				return options
			}, [])

			return { options: cardOptions }
		}
	})
}

export const updatingCardsSelector = createLoadingSelector([UPDATE_CARD])
export const updateCard = (values, editCardFormId) => (dispatch, getState) => {
	const isFetching = updatingCardsSelector(getState())
	if (!values || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(editCardFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [UPDATE_CARD_REQUEST, UPDATE_CARD_SUCCESS, UPDATE_CARD_FAILURE],
				callAPI: (config) =>
					apiClient.put(`api/card/updateCardInfo`, values, config),
				payload: { values, formId: editCardFormId },
			})
		)
		.then((resp) => {
			const { successMessage } = getState().card
			if (successMessage) dispatch(showMessageModal(successMessage))
			return resp
		})
}

export const removingCardsSelector = createLoadingSelector([REMOVE_CARD])
export const removeCard = (cardNo) => (dispatch, getState) => {
	const isFetching = removingCardsSelector(getState())
	if (!cardNo || isFetching) return Promise.resolve()

	return dispatch(getToken()).then(() =>
		dispatch({
			types: [REMOVE_CARD_REQUEST, REMOVE_CARD_SUCCESS, REMOVE_CARD_FAILURE],
			callAPI: (config) =>
				apiClient.delete(`api/card/removeCard/${cardNo}`, config),
			payload: { cardNo },
		})
	)
}

export const reportingLostSelector = createLoadingSelector([REPORT_LOST])
export const reportLost = (values) => (dispatch, getState) => {
	const isFetching = reportingLostSelector(getState())
	if (!values || isFetching) return Promise.resolve()

	return dispatch(getToken()).then(() =>
		dispatch({
			types: [REPORT_LOST_REQUEST, REPORT_LOST_SUCCESS, REPORT_LOST_FAILURE],
			callAPI: (config) =>
				apiClient.post(`api/card/reportLostCard`, values, config),
			payload: { values },
		})
	)
}

export const addingCardsSelector = createLoadingSelector([ADD_CARD])
export const addCard = (values, addCardFormId) => (dispatch, getState) => {
	const isFetching = addingCardsSelector(getState())
	if (!values || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(addCardFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [ADD_CARD_REQUEST, ADD_CARD_SUCCESS, ADD_CARD_FAILURE],
				callAPI: (config) => apiClient.post(`api/card/addCard`, values, config),
				payload: { values, formId: addCardFormId, isCaptcha: true },
			})
		)
}

export const transferringBalanceSelector = createLoadingSelector([TRANSFER_BALANCE])
export const transferBalance = (values, transferBalanceFormId) => (
	dispatch,
	getState
) => {
	const isFetching = transferringBalanceSelector(getState())
	if (!values || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(transferBalanceFormId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [
					TRANSFER_BALANCE_REQUEST,
					TRANSFER_BALANCE_SUCCESS,
					TRANSFER_BALANCE_FAILURE,
				],
				callAPI: (config) =>
					apiClient.post(`api/card/transferBalance`, values, config),
				payload: { values, formId: transferBalanceFormId },
			})
		)
		.then((resp) => {
			const { successMessage } = getState().card
			if (successMessage) {
				dispatch(reset(transferBalanceFormId))
				return dispatch(showMessageModal(successMessage))
			}
			return resp
		})
}

export default function reducer(state = initialState, action) {
	const { payload, errorMessage, successMessage } = action
	switch (action.type) {
		case SET_DEFAULT_CARD_REQUEST:
		case ADD_CARD_REQUEST:
		case REMOVE_CARD_REQUEST:
		case REPORT_LOST_REQUEST:
		case UPDATE_CARD_REQUEST:
		case TRANSFER_BALANCE_REQUEST:
			return { ...state, errorMessage: "", successMessage: "" }
		case FETCH_CARDS_SUCCESS:
		case SET_DEFAULT_CARD_SUCCESS:
		case TRANSFER_BALANCE_SUCCESS:
			return {
				...state,
				data: { ...state.data, ...arrayToObject(payload, "cardNo") },
				successMessage,
			}
		case UPDATE_CARD_SUCCESS:
			const currentCardInfo = state.data[payload.cardNo]
			return {
				...state,
				data: {
					...state.data,
					[currentCardInfo.cardNo]: { ...currentCardInfo, ...payload },
				},
				successMessage,
			}
		case ADD_CARD_SUCCESS:
			return {
				...state,
				data: { ...state.data, [payload.cardNo]: payload },
				successMessage,
			}
		case REMOVE_CARD_SUCCESS:
			return {
				...state,
				data: removeProperty(state.data, payload.cardNo),
				successMessage,
			}
		case REPORT_LOST_SUCCESS:
			return {
				...state,
				data: { ...state.data, [payload.cardNo]: payload },
				successMessage,
			}
		case SET_DEFAULT_CARD_FAILURE:
		case ADD_CARD_FAILURE:
		case UPDATE_CARD_FAILURE:
		case TRANSFER_BALANCE_FAILURE:
			return { ...state, errorMessage }
		default:
			return state
	}
}
