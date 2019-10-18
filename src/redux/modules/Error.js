// api/errorReducer.js
export default function reducer(state = {}, action) {
	const { type, errorMessage } = action
	const matches = /(.*)_(REQUEST|FAILURE)/.exec(type)

	// not a *_REQUEST / *_FAILURE actions, so we ignore them
	if (!matches) return state

	const [, requestName, requestState] = matches
	return {
		...state,
		// Store errorMessage
		// e.g. stores errorMessage when receiving GET_TODOS_FAILURE
		//      else clear errorMessage when receiving GET_TODOS_REQUEST OR GET_TODOS_SUCCESS
		[requestName]: requestState === "FAILURE" ? errorMessage : "",
	}
}

export const createErrorMessageSelector = (actions) => (state) => {
	const errors = actions.map((action) => state.error[action])
	if (errors && errors[0]) {
		return errors[0]
	}
	return ""
}
