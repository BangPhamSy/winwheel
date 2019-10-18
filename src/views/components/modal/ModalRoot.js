import React from "react"
import { connect } from "react-redux"

// These are regular React components we will write soon
import MessageModal from "./MessageModal"
import ConfirmModal from "./ConfirmModal"
import IFrameModal from "./IFrameModal"

const MODAL_COMPONENTS = {
	MESSAGE: MessageModal,
	CONFIRM_MESSAGE: ConfirmModal,
	IFRAME: IFrameModal,
	/* other modals */
}

const ModalRoot = ({ modalType, modalProps, isOpen }) => {
	if (!modalType) {
		return null
	}

	const SpecificModal = MODAL_COMPONENTS[modalType]
	return (
		<SpecificModal
			className="modal"
			overlayClassName="modal-overlay"
			closeTimeoutMS={200}
			isOpen={isOpen}
			{...modalProps}
		/>
	)
}

export default connect((state) => state.modal)(ModalRoot)
