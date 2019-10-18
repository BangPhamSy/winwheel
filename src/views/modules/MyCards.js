import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Translate } from "react-localize-redux"

import { currency } from "../../configs/Settings"
import Wrapper from "../components/common/Wrapper"

class MyCards extends Component {
	renderCardTableRow = (
		{
			cardNo,
			storedValueBalance,
			expiryDate,
			membershipStatusCode,
			isDefault,
			isActive,
		},
		activeLanguage,
		index,
		noOfCards
	) => {
		const {
			activeCardNo,
			onRemoveCard,
			onReportLoss,
			onTransactionHistory,
		} = this.props

		return (
			<div key={index} className="row no-gutters table-row font-sub">
				<div className="table-col col-12 col-sm-4 col-md-3 fw-bolder">
					{activeCardNo === cardNo && <span>{cardNo}</span>}
					{activeCardNo !== cardNo && (
						<Link
							to={`/${activeLanguage.code}/cards/${cardNo}`}
							className="color-text-1 text-underline">
							{cardNo}
						</Link>
					)}
				</div>
				<div className="table-col col-12 col-sm-5 col-md-6 pt-0 pt-sm-2">
					<div className="row mx--2">
						<div className="col-md-6 px-2 text-md-right">
							<span className="d-inline d-md-none">
								<Translate id="cardDetails.storedValue" /> {": "}
							</span>
							<span className="d-none d-md-inline">
								<Translate
									id="_currencyBalance"
									data={{
										currency: currency,
										balance: storedValueBalance.formatMoney(2),
									}}
								/>
							</span>
							<b className="d-inline d-md-none">
								<Translate
									id="_currencyBalance"
									data={{
										currency: currency,
										balance: storedValueBalance.formatMoney(2),
									}}
								/>
							</b>
						</div>
						<div className="col-md-6 px-2 text-md-center mt-md-0 mt-1">
							<span className="d-inline d-md-none">
								<Translate id="cardDetails.status" /> {": "}
							</span>
							<span className="d-none d-md-inline">
								{membershipStatusCode}
							</span>
							<b className="d-inline d-md-none">{membershipStatusCode}</b>
						</div>
					</div>
				</div>
				<div className="table-col col-12 col-sm-3">
					<div>
						{isActive && (
							<a
								className="link link-primary fw-bold"
								onClick={() => onReportLoss(cardNo)}>
								<Translate id="cardDetails.reportLostCard" />
							</a>
						)}
					</div>

					<div className="mt-1">
						{noOfCards > 1 &&
							isActive && (
								<a
									className="link link-primary fw-bold"
									onClick={() => onRemoveCard(cardNo)}>
									<Translate id="cardDetails.removeCard" />
								</a>
							)}
					</div>
					<div className="mt-1">
						{isActive && (
							<a
								className="link link-primary fw-bold"
								onClick={() => onTransactionHistory(cardNo)}>
								<Translate id="cardDetails.transactionHistory" />
							</a>
						)}
					</div>
				</div>
			</div>
		)
	}

	render() {
		const { cards, isFetching, errorMessage } = this.props
		var noOfCards = 0
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].isActive) {
				noOfCards++
			}
		}

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<Translate>
					{(translate, activeLanguage) => (
						<div className="box p-2">
							<div className="table table-rewards">
								<div className="row no-gutters table-row table-header">
									<div className="table-col col-12 col-md-3">
										<Translate id="cardDetails.cards" />
									</div>
									<div className="table-col col-md-6 d-md-block d-none">
										<div className="row mx--2">
											<div className="table-col px-2 col-sm-6 text-right">
												<Translate id="cardDetails.storedValue" />
											</div>
											<div className="table-col px-2 col-sm-6 text-center">
												<Translate id="cardDetails.status" />
											</div>
										</div>
									</div>
									<div className="table-col col-md-3 d-md-block d-none" />
								</div>
								{cards.map((card, index) =>
									this.renderCardTableRow(
										card,
										activeLanguage,
										index,
										noOfCards
									)
								)}
							</div>
						</div>
					)}
				</Translate>
			</Wrapper>
		)
	}
}

MyCards.defaultProps = {
	cards: [],
	errorMessage: "",
	isFetching: false,
	activeCardNo: "",
}

MyCards.propTypes = {
	cards: PropTypes.array.isRequired,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
	activeCardNo: PropTypes.string,
}

export default MyCards
