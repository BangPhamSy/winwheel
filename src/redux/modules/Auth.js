import { push } from "connected-react-router"
import { getActiveLanguage } from "react-localize-redux"
import { startSubmit } from "redux-form"
import jwtDecode from "jwt-decode"

import apiClient from "../../helpers/apiClient"
import { createLoadingSelector } from "./Loading"
import { setCookie, deleteCookie, getCookie, stringToBoolean } from "../../helpers"
import { JWT_TOKEN, NO_OF_TRIES, VERIFY_GOLD_CARD_ADDRESS } from "../../constants"
import { getToken } from "./XsrfToken"

export const LOGIN = "LOGIN"
export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const LOGOUT = "LOGOUT"
export const LOGOUT_REQUEST = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"

export const REFRESH_TOKEN = "REFRESH_TOKEN"
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST"
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS"
export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE"

export const SET_KEEP_LOGIN = "SET_KEEP_LOGIN"

export const CSO_LOGIN = "CSO_LOGIN"
export const CSO_LOGIN_REQUEST = "CSO_LOGIN_REQUEST"
export const CSO_LOGIN_SUCCESS = "CSO_LOGIN_SUCCESS"
export const CSO_LOGIN_FAILURE = "CSO_LOGIN_FAILURE"

const cookieToken = getCookie(JWT_TOKEN)
const cookieNoOfTries = getCookie(NO_OF_TRIES)
const userCk = cookieToken ? jwtDecode(cookieToken) : null

const initialState = {
	isAuthenticated: cookieToken ? true : false,
	// isAuthenticated: true,
	noOfTries: cookieNoOfTries ? parseInt(cookieNoOfTries, 10) : 0,
	token: cookieToken,
	keepLogin: userCk && stringToBoolean(userCk.keep_login),
	errorMessage: "",
}

const setKeepLogin = (value) => {
	return {
		type: SET_KEEP_LOGIN,
		payload: { keepLogin: stringToBoolean(value) },
	}
}

const loadingLoginSelector = createLoadingSelector([LOGIN])
export const login = (values, formId) => (dispatch, getState) => {
	const isFetching = loadingLoginSelector(getState())
	if (!values || isFetching) return Promise.resolve()

	return Promise.resolve(dispatch(startSubmit(formId)))
		.then(() => dispatch(getToken()))
		.then(() =>
			dispatch({
				types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
				callAPI: (config) =>
					apiClient.post(`api/account/authenticate`, values, config),
				payload: { values, formId, isCaptcha: true },
			})
		)
		.then(
			(resp) => {
				const { token } = resp.payload
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				return Promise.resolve()
					.then(() => {
						const user = jwtDecode(token)
						return dispatch(setKeepLogin(user.keep_login))
					})
					.then(() => {
						setCookie(JWT_TOKEN, token, 999)
						deleteCookie(NO_OF_TRIES)
						return Promise.resolve()
					})
					.then(() => {
						const currentLanguage = getActiveLanguage(getState().locale).code
						// redirect to card page after success login
						dispatch(push(`/${currentLanguage}/cards`))
						return Promise.resolve()
					})
			},
			(error) => {
				increaseNoOfTries()
				return Promise.reject(error)
			}
		)
}

const increaseNoOfTries = () => {
	// store no of tries into cookie to show captcha even after page refreshes
	let noOfTries = getCookie(NO_OF_TRIES)
	noOfTries = noOfTries ? parseInt(noOfTries, 10) : 0
	//set captcha for 1 hours
	setCookie(NO_OF_TRIES, ++noOfTries, 1 / 24)
}

// no cso login for now
// #region cso
export const csoLoginMemberSelector = createLoadingSelector([CSO_LOGIN])
export const csoLoginMember = (token) => (dispatch, getState) => {
	const isFetching = csoLoginMemberSelector(getState())
	if (!token || isFetching) return Promise.resolve()

	return dispatch({
		types: [CSO_LOGIN_REQUEST, CSO_LOGIN_SUCCESS, CSO_LOGIN_FAILURE],
		callAPI: (config) => apiClient.post("api/account/csoLogin", token, config),
		payload: { token },
	}).then((resp) => {
		const { token, returnAction } = resp.payload
		// store user details and jwt token in local storage to keep user logged in between page refreshes
		return Promise.resolve()
			.then(() => {
				const user = jwtDecode(token)
				return dispatch(setKeepLogin(user.keep_login))
			})
			.then(() => {
				setCookie(JWT_TOKEN, token, 999)
				deleteCookie(NO_OF_TRIES)
				return Promise.resolve()
			})
			.then(
				() => {
					const currentLanguage = getActiveLanguage(getState().locale).code

					switch (returnAction) {
						case VERIFY_GOLD_CARD_ADDRESS:
							dispatch(
								push(`/${currentLanguage}/cards/verify-gold-card-address`)
							)
							break

						default:
							dispatch(push(`/${currentLanguage}/account`))
							break
					}

					return Promise.resolve()
				},
				(error) => {
					increaseNoOfTries()
					return Promise.reject(error)
				}
			)
	})
}
// #endregion cso

const loadingRefreshTokenSelector = createLoadingSelector([LOGIN])
export const refreshToken = () => (dispatch, getState) => {
	const isFetching = loadingRefreshTokenSelector(getState())
	if (isFetching || !getState().auth.isAuthenticated) return Promise.resolve()

	return dispatch({
		types: [REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE],
		callAPI: (config) => apiClient.get(`api/account/refreshToken`, config),
	}).then((resp) => {
		const { token } = resp.payload
		// store user details and jwt token in local storage to keep user logged in between page refreshes
		return Promise.resolve()
			.then(() => {
				const user = jwtDecode(token)
				return dispatch(setKeepLogin(user.keep_login))
			})
			.then(() => {
				setCookie(JWT_TOKEN, token, 999)
				return Promise.resolve()
			})
	})
}

const requestLogout = () => (dispatch) => {
	dispatch({
		type: LOGOUT_REQUEST,
		payload: {
			isAuthenticated: true,
			errorMessage: "",
			successMessage: "",
		},
	})

	return Promise.resolve()
}

const receiveLogout = () => (dispatch, getState) => {
	dispatch({
		type: LOGOUT_SUCCESS,
		payload: { isAuthenticated: false, errorMessage: "" },
	})
	const currentLanguage = getActiveLanguage(getState().locale).code
	// redirect to card page after success login
	dispatch(push(`/${currentLanguage}/`))
	return Promise.resolve()
}

export const logout = () => (dispatch, getState) => {
	if (!getState().auth.isAuthenticated) return Promise.resolve()

	return Promise.resolve()
		.then(() => dispatch(requestLogout()))
		.then(() => {
			//remove token from cookie
			deleteCookie(JWT_TOKEN)
			deleteCookie(NO_OF_TRIES)

			return Promise.resolve()
		})
		.then(() => dispatch(receiveLogout()))
}

export default function reducer(state = initialState, action) {
	const { errorMessage, payload } = action
	switch (action.type) {
		case SET_KEEP_LOGIN:
		case LOGOUT_REQUEST:
		case REFRESH_TOKEN_SUCCESS:
			return {
				...state,
				...payload,
			}
		case LOGOUT_SUCCESS:
		case LOGIN_REQUEST:
		case CSO_LOGIN_REQUEST:
			return {
				...state,
				token: "",
				isAuthenticated: false,
				keepLogin: false,
				errorMessage: "",
			}
		case LOGIN_SUCCESS:
		case CSO_LOGIN_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				noOfTries: 0,
			}
		case LOGIN_FAILURE:
		case CSO_LOGIN_FAILURE:
			return {
				...state,
				noOfTries: ++state.noOfTries,
				errorMessage,
			}
		case REFRESH_TOKEN_FAILURE:
			return {
				...state,
				errorMessage,
			}
		default:
			return state
	}
}
