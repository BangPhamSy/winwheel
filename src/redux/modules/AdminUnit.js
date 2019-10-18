import apiClient from "../../helpers/apiClient"
import { createLoadingSelector } from "./Loading"
import { isEmptyObj, arrayToObject, objectToArray } from "../../helpers"
import { getActiveLanguage } from "react-localize-redux"
export const FETCH_CITIES = "FETCH_CITIES"
export const FETCH_CITIES_REQUEST = "FETCH_CITIES_REQUEST"
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS"
export const FETCH_CITIES_FAILURE = "FETCH_CITIES_FAILURE"
export const FETCH_DISTRICTS = "FETCH_DISTRICTS"
export const FETCH_DISTRICTS_REQUEST = "FETCH_DISTRICTS_REQUEST"
export const FETCH_DISTRICTS_SUCCESS = "FETCH_DISTRICTS_SUCCESS"
export const FETCH_DISTRICTS_FAILURE = "FETCH_DISTRICTS_FAILURE"
export const FETCH_WARDS = "FETCH_WARDS"
export const FETCH_WARDS_REQUEST = "FETCH_WARDS_REQUEST"
export const FETCH_WARDS_SUCCESS = "FETCH_WARDS_SUCCESS"
export const FETCH_WARDS_FAILURE = "FETCH_WARDS_FAILURE"

const initialState = {
	cities: {},
	wards: {
		byName: {},
		byCode: {},
		allDistrictCodes: {},
	},
	districts: {
		byName: {},
		byCode: {},
		allCityCodes: {},
	},
	errorMessage: "",
}

export const loadingCitiesSelector = createLoadingSelector([FETCH_CITIES])
export const fetchCities = () => (dispatch) => {
	return dispatch({
		types: [FETCH_CITIES_REQUEST, FETCH_CITIES_SUCCESS, FETCH_CITIES_FAILURE],
		shouldCallAPI: (state) =>
			!loadingCitiesSelector(state) && isEmptyObj(state.adminUnit.cities),
		callAPI: (config) => apiClient.get(`api/adminUnit/getCityList`, config),
		payload: {},
	})
}

export const getCityOptions = () => (dispatch, getState) => {
	return dispatch(fetchCities()).then((resp) => {
		const cities = getState().adminUnit.cities
		const currentLanguage = getActiveLanguage(getState().locale).code
		if (cities) {
			const cityOptions = objectToArray(cities).reduce((options, city) => {
				options.push({
					value: city.englishName,
					label: currentLanguage === "en" ? city.englishName : city.cityName,
				})
				return options
			}, [])

			return { options: cityOptions }
		}
	})
}

export const loadingDistrictsSelector = createLoadingSelector([FETCH_DISTRICTS])
export const fetchDistricts = (cityCode) => (dispatch) => {
	return dispatch({
		types: [
			FETCH_DISTRICTS_REQUEST,
			FETCH_DISTRICTS_SUCCESS,
			FETCH_DISTRICTS_FAILURE,
		],
		shouldCallAPI: (state) =>
			cityCode &&
			!loadingDistrictsSelector(state) &&
			(isEmptyObj(state.adminUnit.districts.allCityCodes) ||
				!state.adminUnit.districts.allCityCodes[cityCode]),
		callAPI: (config) =>
			apiClient.get(`api/adminUnit/getDistrictList/${cityCode}`, config),
		payload: { cityCode },
	})
}

export const loadingWardsSelector = createLoadingSelector([FETCH_WARDS])
export const fetchWards = (cityCode, districtCode) => (dispatch) => {
	return dispatch({
		types: [FETCH_WARDS_REQUEST, FETCH_WARDS_SUCCESS, FETCH_WARDS_FAILURE],
		shouldCallAPI: (state) =>
			cityCode &&
			districtCode &&
			!loadingWardsSelector(state) &&
			(isEmptyObj(state.adminUnit.wards.allDistrictCodes) ||
				!state.adminUnit.wards.allDistrictCodes[districtCode]),
		callAPI: (config) =>
			apiClient.get(
				`api/adminUnit/getWardList/${cityCode}/${districtCode}`,
				config
			),
		payload: { cityCode, districtCode },
	})
}

export default function reducer(state = initialState, action) {
	const { payload, errorMessage } = action
	switch (action.type) {
		case FETCH_CITIES_REQUEST:
		case FETCH_DISTRICTS_REQUEST:
		case FETCH_WARDS_REQUEST:
			return {
				...state,
				errorMessage: "",
				successMessage: "",
			}
		//#region CITIES
		case FETCH_CITIES_FAILURE:
			return {
				...state,
				errorMessage,
			}
		case FETCH_CITIES_SUCCESS:
			const sorted_city = payload.sort(function (a, b) {
				return a.englishName.localeCompare(b.englishName)
			})
			return {
				...state,
				cities: {
					...state.cities,
					...arrayToObject(sorted_city, "englishName"),
				},
			}
		//#endregion CITIES

		//#region WARDS
		case FETCH_WARDS_FAILURE:
			return {
				...state,
				errorMessage,
			}
		case FETCH_WARDS_SUCCESS:
			return {
				...state,
				wards: {
					byName: {
						...state.wards.byName,
						...arrayToObject(payload, "englishName"),
					},
					byCode: {
						...state.wards.byCode,
						...arrayToObject(payload, "wardCode"),
					},
					allDistrictCodes: {
						...state.wards.allDistrictCodes,
						...arrayToObject(payload, "districtCode"),
					},
				},
			}
		//#endregion WARDS

		//#region DISTRICTS
		case FETCH_DISTRICTS_SUCCESS:
			return {
				...state,
				districts: {
					byName: {
						...state.districts.byName,
						...arrayToObject(payload, "englishName"),
					},
					byCode: {
						...state.districts.byCode,
						...arrayToObject(payload, "districtCode"),
					},
					allCityCodes: {
						...state.districts.allCityCodes,
						...arrayToObject(payload, "cityCode"),
					},
				},
			}
		case FETCH_DISTRICTS_FAILURE:
			return {
				...state,
				errorMessage,
			}

		//#endregion DISTRICTS
		default:
			return state
	}
}
