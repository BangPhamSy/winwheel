import { getCookie, setCookie } from "."
import { CULTURE } from "../constants"

export default function userCulture(culture = null) {
	return (culture = culture ? culture : getCookie(CULTURE))
}

export const setActiveCultureToCookie = (culture) => {
	setCookie(CULTURE, culture, 999)
}

export const getActiveCultureFromCookie = () => {
	return getCookie(CULTURE)
}

export const setActiveCultureToCookieAsync = (culture) => {
	new Promise((resolve) => resolve(setActiveCultureToCookie(culture)))
}

export const getActiveCultureFromCookieAsync = () => {
	return new Promise((resolve) => resolve(getActiveCultureFromCookie()))
}
