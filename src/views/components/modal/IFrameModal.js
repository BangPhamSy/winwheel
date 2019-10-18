import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { hideModal } from "../../../redux/modules/Modal"
import BaseModal from "./BaseModal"

class IFrameModal extends Component {
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
			<BaseModal
				onConfirmClick={this.handleCloseClick}
				onCancelClick={this.handleCloseClick}
				{...this.props}>
				<div>
					<iframe
						src={this.props.src}
						height={this.props.height}
						width={this.props.width}
						title="iframe"
					/>
				</div>
			</BaseModal>
		)
	}
}
IFrameModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	hideModal: PropTypes.func.isRequired,
	src: PropTypes.string.isRequired,
	title: PropTypes.string,
	onCloseClick: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
	hideModal: () => dispatch(hideModal()),
})

export default connect(null, mapDispatchToProps)(IFrameModal)
