import { getCookie } from "."
import { JWT_TOKEN } from "../constants"

export default function authHeader(token = null) {
	// return authorization header with jwt token
	token = token ? token : getCookie(JWT_TOKEN)

	if (token) {
		return { Authorization: "Bearer " + token }
	} else {
		return {}
	}
}
