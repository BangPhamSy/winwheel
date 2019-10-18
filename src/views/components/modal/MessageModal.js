import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { hideModal } from "../../../redux/modules/Modal"
import MessageBaseModal from "./MessageBaseModal"

class MessageModal extends Component {
	constructor(props) {
		super(props)

		this.handleCloseClick = this.handleCloseClick.bind(this)
	}

	handleCloseClick() {
		const { hideModal, onCloseClick } = this.props
		onCloseClick && onCloseClick()
		hideModal()
	}

	render() {
		return (
			<MessageBaseModal {...this.props} onConfirmClick={this.handleCloseClick}>
				{this.props.message}
			</MessageBaseModal>
		)
	}
}
MessageModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	hideModal: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	title: PropTypes.string,
	onCloseClick: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
	hideModal: () => dispatch(hideModal()),
})

export default connect(null, mapDispatchToProps)(MessageModal)
