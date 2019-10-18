import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Translate } from "react-localize-redux"

import SingleCard from "../components/common/SingleCard"
import Wrapper from "../components/common/Wrapper"
import AddCardImg from "../../images/addcard-lg.svg"

class CardList extends Component {
	render() {
		const { cards, enableAddCard, isFetching, errorMessage } = this.props

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<Translate>
					{(translate, activeLanguage) => (
						<div className="card-list row" id="cardList">
							{enableAddCard && (
								<div className="card-item col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 mb-4">
									<Link
										to={`/${activeLanguage.code}/cards/add-card`}
										className="card-img"
										id="addNewCard">
										<img src={AddCardImg} alt="add card" />
										<span className="add-card-text">
											{translate("cards._addCard")}
										</span>
									</Link>
								</div>
							)}

							{cards.map((card, index) => (
								<SingleCard
									key={index}
									card={card}
									langCode={activeLanguage.code}
									showExpiryDate
									showTransactionButton
									className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 mb-4 gift-card"
								/>
							))}
						</div>
					)}
				</Translate>
			</Wrapper>
		)
	}
}

CardList.defaultProps = {
	cards: [
		{
			cardNo: '2930129837286351',
			printedName: 'Linda Lim',
			storedValueBalance: 165,
			expiryDate: '11 Nov 2024',
			isDefault: true,
		},
		{
			cardNo: '2931',
			printedName: 'Linda Lim',
			storedValueBalance: 65,
			expiryDate: '21 Nov 2024',
			isDefault: false,
		}
	],
	errorMessage: "",
	isFetching: false,
	enableAddCard: false,
}

CardList.propTypes = {
	enableAddCard: PropTypes.bool.isRequired,
	cards: PropTypes.array.isRequired,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
}

export default CardList
