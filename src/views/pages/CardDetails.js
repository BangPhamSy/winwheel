import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { push } from "connected-react-router"
import { Translate, getTranslate, getActiveLanguage } from "react-localize-redux"
import { submit } from "redux-form"

import {
	reportLost,
	fetchCards,
	loadingCardsSelector,
	removeCard,
	removingCardsSelector,
	reportingLostSelector,
} from "../../redux/modules/Card"
import { objectToArray } from "../../helpers/utility"
import { showConfirmMessage, showMessageModal } from "../../redux/modules/Modal"
import { isEmptyObj } from "../../helpers"

import Wrapper from "../components/common/Wrapper"
import ReportLossForm from "../../views/modules/ReportLossForm"
import { CardInfo } from "../modules/CardInfo"
// import MyCards from "../modules/MyCards"
import { GOLD } from "../../constants"

class CardDetails extends Component {
	constructor(props) {
		super(props)

		this.handleRemoveCard = this.handleRemoveCard.bind(this)
		// this.handleReportLoss = this.handleReportLoss.bind(this)
		this.handleTransactionHistory = this.handleTransactionHistory.bind(this)
	}

	componentDidMount() {
		this.props.fetchCards()
	}

	handleFormSubmit = (form, cardNo) => {
		const { redirect, currentLanguage, showMessageModal, reportLost } = this.props
		const { isNewVirtualCard } = form
		reportLost({ cardNo, isNewVirtualCard }).then(
			({ successMessage }) => {
				return showMessageModal(successMessage, () =>
					redirect(`/${currentLanguage}/cards`)
				)
			},
			({ errorMessage }) => showMessageModal(errorMessage)
		)
	}

	dummyHandleReportLoss = (cardNo) => {
		const { showConfirmMessage } = this.props
		showConfirmMessage(
			<ReportLossForm
				onSubmit={(values) => this.handleFormSubmit(values, cardNo)}
			/>,
			() => this.props.submitReportLost(),
			null,
			"Proceed",
			"Cancel"
		)
	}

	handleReportLoss = (cardNo) => {
		return this.dummyHandleReportLoss(cardNo) // mocked handler
		const {
			cards,
			cardsObj,
			redirect,
			currentLanguage,
			showConfirmMessage,
			showMessageModal,
			translate,
			reportLost,
		} = this.props
		const hasStoreValue = cardsObj[cardNo] && cardsObj[cardNo].storedValueBalance > 0
		const numberOfActiveCards = cards.filter((card) => card.isActive).length
		const isGoldCard = cardsObj[cardNo].tierCode === GOLD
		//const isDefaultCard = cardsObj[cardNo].isDefault

		//if (isDefaultCard && numberOfActiveCards > 1) {
		//	showMessageModal(translate("cardDetails.message._reportCardIsDefault"))
		//} else {
		showConfirmMessage(
			translate("cardDetails.message._reportLostCardConfirmation"),
			() =>
				reportLost({ cardNo }).then(
					({ successMessage }) => {
						if (numberOfActiveCards > 1 && hasStoreValue) {
							return showConfirmMessage(
								translate(
									"cardDetails.message._transferBalanceOfSuspendedCard"
								),
								() =>
									redirect(
										`/${currentLanguage}/cards/transfer/${cardNo}`
									)
							)
						} else if (numberOfActiveCards > 1 && !isGoldCard) {
							return showMessageModal(successMessage, () =>
								redirect(`/${currentLanguage}/cards`)
							)
						} else {
							//only 1 card or more than 1 but gold card
							// redirect user to confirm address page
							return showMessageModal(
								translate("cardDetails.message._verifyAddress"),
								() =>
									redirect(
										`/${currentLanguage}/cards/report-loss/${cardNo}`
									)
							)
						}
					},
					({ errorMessage }) => showMessageModal(errorMessage)
				)
		)
		//}
	}

	handleRemoveCard = (cardNo) => {
		const {
			cardsObj,
			removeCard,
			redirect,
			currentLanguage,
			showMessageModal,
			showConfirmMessage,
			translate,
		} = this.props
		const hasStoreValue = cardsObj[cardNo] && cardsObj[cardNo].storedValueBalance > 0

		if (hasStoreValue) {
			showConfirmMessage(translate("cardDetails.message._hasStoreBalance"), () =>
				redirect(`/${currentLanguage}/cards/transfer/${cardNo}`)
			)
		} else {
			showConfirmMessage(
				translate("cardDetails.message._removeCardConfirmation"),
				() =>
					removeCard(cardNo).then(
						({ successMessage }) =>
							showMessageModal(successMessage, () =>
								redirect(`/${currentLanguage}/cards`)
							),
						({ errorMessage }) => showMessageModal(errorMessage)
					)
			)
		}
	}

	handleTransactionHistory = (cardNo) => {
		const { redirect, currentLanguage } = this.props
		redirect(`/${currentLanguage}/transactions/${cardNo}`)
	}

	render() {
		const {
			cards,
			activeCards,
			cardDetails,
			isFetching,
			translate,
			currentLanguage,
			cardNo,
		} = this.props
		let { errorMessage } = this.props

		if (!isFetching && isEmptyObj(cardDetails) && !errorMessage)
			errorMessage = translate("_shared.page.params._invalidCardNo")

		// const allowToTransfer =
		// 	cards.length > 1 &&
		// 	cardDetails &&
		// 	cardDetails.storedValueBalance > 0 &&
		// 	((!cardDetails.isActive && activeCards.length >= 1) ||
		// 		(cardDetails.isActive && activeCards.length > 1))

		const mockedErrorMessage = ""

		return (
			<Wrapper errorMessage={mockedErrorMessage} isFetching={isFetching}>
				<div id="my-card-details" className="my-4 my-lg-5">
					<div className="row justify-content-center">
						<div className="col-12 col-xl-11">
							{/* --- Page Content starts here --- */}

							<h4 className="mb-3">
								<Translate id="cardDetails._title" />
							</h4>

							<section className="card-item container">
								<CardInfo cardDetails={cardDetails} />
								<a
									className="btn btn-primary row mt-3"
									onClick={
										cardDetails && cardDetails.isActive
											? () => this.handleReportLoss(cardNo)
											: null
									}>
									{cardDetails && cardDetails.isActive
										? "Mark As Lost"
										: "This card is marked as lost"}
								</a>
							</section>

							{/* <section className="table-card-info mt-4">
								<MyCards
									cards={cards}
									activeCardNo={cardNo}
									isFetching={isFetching}
									onRemoveCard={this.handleRemoveCard}
									onReportLoss={this.handleReportLoss}
									onTransactionHistory={this.handleTransactionHistory}
									errorMessage={mockedErrorMessage}
								/>
							</section> */}

							{/* <section className="text-right mt-3">
								{allowToTransfer && (
									<Link
										className="btn btn-primary mt-2"
										to={`/${currentLanguage}/cards/transfer/${cardNo}`}>
										<Translate id="cardDetails.button._transferBalance" />
									</Link>
								)}
							</section> */}
							{/* --- Page Content ends here --- */}
						</div>
					</div>
				</div>
			</Wrapper>
		)
	}
}

CardDetails.propTypes = {
	cards: PropTypes.array,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool,
	isUpdating: PropTypes.bool,
	fetchCards: PropTypes.func.isRequired,
}

const mapStateToProps = ({ card, locale, loading }, { match: { params } }) => {
	const cardNo = params.cardNo,
		cards = objectToArray(card.data)
			.filter((card) => !card.isRemoved)
			.sort((card) => !card.isDefault),
		activeCards = cards.filter((card) => card.isActive),
		cardDetails = cardNo ? card.data[params.cardNo] : null

	return {
		cardNo,
		cards,
		activeCards,
		cardsObj: card.data,
		cardDetails,
		isFetching:
			loadingCardsSelector({ loading }) ||
			reportingLostSelector({ loading }) ||
			removingCardsSelector({ loading }),
		errorMessage: card.errorMessage,
		translate: getTranslate(locale),
		currentLanguage: getActiveLanguage(locale).code,
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchCards: bindActionCreators(fetchCards, dispatch),
	removeCard: bindActionCreators(removeCard, dispatch),
	reportLost: bindActionCreators(reportLost, dispatch),
	submitReportLost: bindActionCreators(() => submit("report-loss"), dispatch),
	redirect: bindActionCreators(push, dispatch),
	showConfirmMessage: bindActionCreators(showConfirmMessage, dispatch),
	showMessageModal: bindActionCreators(showMessageModal, dispatch),
})

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(CardDetails)
)
