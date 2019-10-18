import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import PropTypes from "prop-types"
import { Translate } from "react-localize-redux"

import { fetchCards, loadingCardsSelector } from "../../redux/modules/Card"
import { objectToArray } from "../../helpers/utility"

import SingleCard from "../components/common/SingleCard"
import TransactionTable from "../modules/TransactionTable"
import Wrapper from "../components/common/Wrapper"

class Cards extends Component {
	state = {
		selectedCardNo: null,
	}

	componentDidMount() {
		this.props.fetchCards()
		const {
			location: { state },
			activeCards,
		} = this.props
		if (state && state.cardNo) {
			this.setState({ selectedCardNo: state.cardNo })
		} else {
			if (activeCards && activeCards.length > 0) {
				this.setState({ selectedCardNo: activeCards[0].cardNo })
			}
		}
	}

	handleOnSelectCard = (cardNo) => {
		const { selectedCardNo } = this.state
		if (cardNo !== selectedCardNo) {
			this.setState({ selectedCardNo: cardNo })
		}
	}

	render() {
		const { activeCards, isFetching, errorMessage, cards } = this.props
		const { selectedCardNo } = this.state
		const mockedCards = [
			{
				cardNo: "2930",
				printedName: "Linda Lim",
				storedValueBalance: 165,
				expiryDate: "11 Nov 2024",
				isDefault: true,
			},
			{
				cardNo: "2931",
				printedName: "Linda Lim",
				storedValueBalance: 65,
				expiryDate: "21 Nov 2024",
				isDefault: false,
			},
		]
		const mockedErrorMessage = ""
		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<div id="my-cards" className="my-4 my-lg-5">
					<div className="row justify-content-center">
						<div className="col-12 col-xl-11">
							{/* --- Page Content starts here --- */}
							<section
								id="myCards"
								className="row no-gutters justify-content-center">
								<div className="col-12 transaction-card-list">
									<h4 className="mb-3">
										<Translate id="myTransactions._title" />
									</h4>
									<div className="transactions-card-container">
										{cards.map((card, index) => (
											<SingleCard
												key={index}
												card={card}
												langCode={"en"}
												className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 mb-4"
												linkTo={"transactions"}
												onImageClick={this.handleOnSelectCard}
												isSelected={
													card && card.cardNo == selectedCardNo
												}
											/>
										))}
									</div>
									<h5 className="mb-3 mt-3">VIEW TRANSACTION</h5>
									{selectedCardNo && (
										<TransactionTable cardNo={selectedCardNo} />
									)}
								</div>
							</section>
							{/* --- Page Content ends here --- */}
						</div>
					</div>
				</div>
			</Wrapper>
		)
	}
}

Cards.propTypes = {
	cards: PropTypes.array,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool,
}

const mapStateToProps = ({ card, loading }) => {
	const cards = objectToArray(card.data).sort((card) => !card.isDefault)
	return {
		cards,
		activeCards: cards.filter((card) => card.isActive),
		suspendedCards: cards.filter((card) => !card.isActive && !card.isRemoved),
		isFetching: loadingCardsSelector({ loading }),
		errorMessage: card.errorMessage,
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchCards: bindActionCreators(fetchCards, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
