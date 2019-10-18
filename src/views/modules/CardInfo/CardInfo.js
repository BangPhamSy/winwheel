import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getTranslate, getActiveLanguage } from "react-localize-redux"
import { bindActionCreators } from "redux"
import { initialize } from "redux-form"
import QRCode from "qrcode.react"

import DefaultCardForm from "./DefaultCardForm"
import CardEdit, { formId as editCardFormId } from "./CardEdit"
import { setDefaultCard, updateCard } from "../../../redux/modules/Card"
import { qrCodePrefix } from "../../../configs"

// import CardImg from "../../../images/abbott-card-front.jpeg"

export const formId = "defaultCard"

class CardInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = { isEditing: false }
		this.handleEditCard = this.handleEditCard.bind(this)
		this.handleCancelEditCard = this.handleCancelEditCard.bind(this)
		this.handleSetDefaultCard = this.handleSetDefaultCard.bind(this)
		this.handleUpdateCard = this.handleUpdateCard.bind(this)
	}

	handleUpdateCard = ({ cardNo, printedName }, dispatch) => {
		dispatch(updateCard({ cardNo, printedName }, editCardFormId)).then(() =>
			this.setState({ isEditing: false })
		)
	}

	handleSetDefaultCard = ({ cardNo }, dispatch) => {
		dispatch(setDefaultCard({ cardNo }, formId))
	}

	handleEditCard(cardNo) {
		const { initialize, cardDetails } = this.props
		this.setState({ isEditing: true })
		initialize(editCardFormId, {
			cardNo: cardDetails.cardNo,
			printedName: cardDetails.printedName,
		})
	}

	handleCancelEditCard() {
		this.setState({ isEditing: false })
	}

	render() {
		const {
			cardDetails: { printedName, cardNo, membershipPhoto, isActive, isDefault },
		} = this.props
		return (
			<div className="row card-item-details">
				<div className="col-lg-8 col-md-8 col-sm-12 col-img pl-0">
					<div className="card-img">
						<img src="https://via.placeholder.com/314x198" alt={printedName} />
						<div className={"qr-container"}>
							<div className="mb-2">Scan to redeem</div>
							<QRCode value={`${qrCodePrefix}${cardNo}`} />
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-4 col-sm-12 col-text">
					<CardEdit
						cardDetails={this.props.cardDetails}
						isEditing={this.state.isEditing}
						onEditCard={this.handleEditCard}
						initialValues={{
							cardNo: cardNo,
							printedName: printedName,
						}}
						onCancelEditCard={this.handleCancelEditCard}
						onSubmit={this.handleUpdateCard}
					/>
					{/* {isActive &&
						!isDefault &&
						!this.state.isEditing && (
							<DefaultCardForm
								initialValues={{ cardNo }}
								onSubmit={this.handleSetDefaultCard}
							/>
						)} */}
				</div>
			</div>
		)
	}
}

CardInfo.propTypes = {
	currentLanguage: PropTypes.string,
	translate: PropTypes.func,
	card: PropTypes.shape({
		cardNo: PropTypes.string.isRequired,
		printedName: PropTypes.string.isRequired,
		// membershipPhoto: PropTypes.string.isRequired,
		storedValueBalance: PropTypes.number.isRequired,
		isDefault: PropTypes.bool.isRequired,
	}),
}

CardInfo.defaultProps = {
	currentLanguage: "en",
	card: {
		cardNo: "2930122121763",
		printedName: "Linda Lim",
		storedValueBalance: 165,
		expiryDate: "11 Nov 2024",
		isDefault: true,
	},
	cardDetails: {
		cardNo: "2930122121763",
		printedName: "Linda Lim",
		storedValueBalance: 165,
		expiryDate: "11 Nov 2024",
		isDefault: true,
	},
}

const mapStateToProps = ({ card, locale }) => ({
	translate: getTranslate(locale),
	currentLanguage: getActiveLanguage(locale).code,
})

const mapDispatchToProps = (dispatch) => ({
	initialize: bindActionCreators(initialize, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardInfo)
