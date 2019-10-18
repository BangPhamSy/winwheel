export const TOGGLE_MOBILE_MENU = "TOGGLE_MOBILE_MENU"
export const OPEN_MOBILE_MENU = "OPEN_MOBILE_MENU"
export const CLOSE_MOBILE_MENU = "CLOSE_MOBILE_MENU"

const initialState = {
	isMenuOpen: false,
}

export const toggleMobileMenu = () => (dispatch, getState) => {
	dispatch({
		type: TOGGLE_MOBILE_MENU,
		payload: { isMenuOpen: !getState().mobileMenu.isMenuOpen },
	})
	return Promise.resolve()
}

export const openMobileMenu = () => (dispatch, getState) => {
	if (getState().mobileMenu.isMenuOpen) return Promise.resolve()

	dispatch({
		type: TOGGLE_MOBILE_MENU,
		payload: { sMenuOpen: true },
	})

	return Promise.resolve()
}

export const closeMobileMenu = () => (dispatch, getState) => {
	if (!getState().mobileMenu.isMenuOpen) return Promise.resolve()

	dispatch({
		type: TOGGLE_MOBILE_MENU,
		payload: { isMenuOpen: false },
	})

	return Promise.resolve()
}

export default function reducer(state = initialState, action) {
	const { payload } = action
	switch (action.type) {
		case TOGGLE_MOBILE_MENU:
		case OPEN_MOBILE_MENU:
		case CLOSE_MOBILE_MENU:
			return {
				...state,
				...payload,
			}
		default:
			return state
	}
}
