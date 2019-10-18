import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { loadingCardsSelector, fetchCards } from "../../redux/modules/Card"
import { getTranslate, getActiveLanguage, Translate } from "react-localize-redux"
import { push } from "connected-react-router"

import { objectToArray, isEmptyObj } from "../../helpers"
import TransferBalanceForm, { formId } from "../modules/TransferBalanceForm"
import { CardInfo } from "../modules/CardInfo"
import Wrapper from "../components/common/Wrapper"
import { transferBalance } from "../../redux/modules/Card"
import { showMessageModal } from "../../redux/modules/Modal"
import { invalidateDidLoaded } from "../../redux/modules/Transaction"

class TransferBalance extends Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit = ({ fromCardNo, toCardNo }) => {
		const {
			redirect,
			currentLanguage,
			transferBalance,
			invalidateTxnDidLoaded,
		} = this.props

		transferBalance({ fromCardNo, toCardNo }, formId)
			.then(() => invalidateTxnDidLoaded())
			.then(() => redirect(`/${currentLanguage}/cards`))
	}

	componentDidMount() {
		const { fetchCards } = this.props
		fetchCards()
	}

	render() {
		const { cards, cardDetails, isFetching, cardNo, translate } = this.props

		let { errorMessage } = this.props

		if (isEmptyObj(cardDetails) && !errorMessage && !isFetching)
			errorMessage = translate("_shared.page.params._invalidCardNo")

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<div id="my-card-details" className="my-4 my-lg-5">
					<div className="row justify-content-center">
						<div className="col-12 col-xl-11">
							<h4 className="mb-3">
								<Translate id="cardDetails._title" />
							</h4>

							<section className="card-item">
								<CardInfo cardDetails={cardDetails} />
							</section>

							<section className="mt-4">
								<TransferBalanceForm
									cards={cards}
									initialValues={{
										fromCardNo: cardNo,
										toCardNo: undefined,
									}}
									onSubmit={this.handleSubmit}
								/>
							</section>

							<section className="text-right mt-3 cta-buttons" />
						</div>
					</div>
				</div>
			</Wrapper>
		)
	}
}

TransferBalance.propTypes = {
	cards: PropTypes.array,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool,
	isUpdating: PropTypes.bool,
	fetchCards: PropTypes.func.isRequired,
}

const mapStateToProps = ({ card, locale, loading }, { match: { params } }) => {
	const cardNo = params.cardNo,
		cards = objectToArray(card.data),
		cardDetails = cardNo ? card.data[params.cardNo] : {}

	return {
		cardNo,
		cards,
		cardDetails,
		isFetching: loadingCardsSelector({ loading }),
		errorMessage: card.errorMessage,
		translate: getTranslate(locale),
		currentLanguage: getActiveLanguage(locale).code,
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchCards: bindActionCreators(fetchCards, dispatch),
	showMessageModal: bindActionCreators(showMessageModal, dispatch),
	transferBalance: bindActionCreators(transferBalance, dispatch),
	invalidateTxnDidLoaded: bindActionCreators(invalidateDidLoaded, dispatch),
	redirect: bindActionCreators(push, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferBalance)
