export const SHOW_MODAL = "SHOW_MODAL"
export const HIDE_MODAL = "HIDE_MODAL"
export const DESTROY_MODAL = "DESTROY_MODAL"

//Modal name
export const CONFIRM_MESSAGE = "CONFIRM_MESSAGE"
export const MESSAGE = "MESSAGE"
export const IFRAME = "IFRAME"

const initialState = {
	modalType: null,
	modalProps: {},
	isOpen: false,
}

export const hideModal = () => (dispatch, getState) => {
	const { isOpen } = getState().modal

	if (!isOpen) return Promise.resolve()

	dispatch({
		type: HIDE_MODAL,
		payload: { isOpen: false },
	})

	return Promise.resolve()
}

export const destroyModal = () => (dispatch) => {
	dispatch({
		type: DESTROY_MODAL,
	})

	return Promise.resolve()
}

export const showMessageModal = (message, onCloseClick) => (dispatch) => {
	return dispatch(showModal(MESSAGE, { message, onCloseClick }))
}

export const showIFrameModal = (src, height, width, onCloseClick) => (dispatch) => {
	return dispatch(showModal(IFRAME, { src, height, width, onCloseClick }))
}

export const showConfirmMessage = (
	message,
	onConfirmClick,
	onCancelClick,
	confirmButtonText,
	cancelButtonText
) => (dispatch) => {
	return dispatch(
		showModal(CONFIRM_MESSAGE, {
			message, onConfirmClick, onCancelClick, confirmButtonText, cancelButtonText
		})
	)
}

export const showModal = (modalType, modalProps) => (dispatch, getState) => {
	const { modalType: currentModalType, isOpen } = getState().modal
	const shouldShowModal = currentModalType === modalType && isOpen

	if (shouldShowModal) return Promise.resolve()

	dispatch({
		type: SHOW_MODAL,
		payload: {
			modalType,
			modalProps,
			isOpen: true,
		},
	})

	return Promise.resolve()
}

export default function reducer(state = initialState, action) {
	const { payload } = action
	switch (action.type) {
		case SHOW_MODAL:
		case HIDE_MODAL:
			return {
				...state,
				...payload,
			}
		case DESTROY_MODAL:
			return initialState
		default:
			return state
	}
}
