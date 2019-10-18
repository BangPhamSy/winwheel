import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { hideModal } from "../../../redux/modules/Modal"
import BaseModal from "./BaseModal"
import { Translate } from "react-localize-redux"

class ConfirmModal extends Component {
	constructor(props) {
		super(props)

		this.handleCancelClick = this.handleCancelClick.bind(this)
		this.handleConfirmClick = this.handleConfirmClick.bind(this)
	}

	handleCancelClick() {
		const { hideModal, onCancelClick } = this.props
		onCancelClick && onCancelClick()
		hideModal()
	}

	handleConfirmClick() {
		const { hideModal, onConfirmClick } = this.props
		onConfirmClick && onConfirmClick()
		hideModal()
	}

	render() {
		return (
			<Translate>
				{(translate, activeLanguage) => (
					<BaseModal
						{...this.props}
						onConfirmClick={this.handleConfirmClick}
						onCancelClick={this.handleCancelClick}>
						{this.props.message}
					</BaseModal>
				)}
			</Translate>
		)
	}
}

ConfirmModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	hideModal: PropTypes.func.isRequired,
	message: PropTypes.any.isRequired,
	confirmButtonText: PropTypes.string,
	cancelButtonText: PropTypes.string,
	onConfirmClick: PropTypes.func.isRequired,
	onCancelClick: PropTypes.func,
}

ConfirmModal.defaultProps = {
	confirmButtonText: "OK",
	cancelButtonText: "Cancel"
}

const mapDispatchToProps = (dispatch) => ({
	hideModal: () => dispatch(hideModal()),
})

export default connect(null, mapDispatchToProps)(ConfirmModal)
