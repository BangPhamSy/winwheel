import React, { Component } from "react"
import PropTypes from "prop-types"
import { Translate } from "react-localize-redux"

import { currency } from "../../configs"
//import { PLUS_ADJUSTMENT } from "../../constants"

class SingleTransaction extends Component {
	renderTxnRow = ({ description, quantity, price, discount }, index, defaultDesc) => (
		<div>
			{quantity > 0 && (
				<div className="row mx--2 mt-1" key={index}>
					<div className="col-7 px-2 word-break-all">
						{quantity} x {(description ? description : defaultDesc) || "N.A"}
					</div>
					<div className="col-5 text-left">
						<Translate
							id="_currencyBalance"
							data={{
								currency: "",
								balance: (quantity * price).formatMoney(2),
							}}
						/>
					</div>
				</div>
			)}
			{discount > 0 && (
				<div className="row mx--2 mt-1">
					<div className="col-7 px-2 word-break-all">
						<Translate id="transactionDetails.bottom.discount" />
					</div>
					<div className="col-5 text-left">
						<Translate
							id="_currencyBalance"
							data={{
								currency: "",
								balance: "-" + discount.formatMoney(2),
							}}
						/>
					</div>
				</div>
			)}
		</div>
	)

	renderFundTransferRow = ({ price }, index, cardNo, cardNoA) => (
		<div className="row mx--2 mt-1" key={index}>
			<div className="col-7 px-2 word-break-all">
				From {cardNoA} to {cardNo}
			</div>
			<div className="col-5 text-left">
				<Translate
					id="_currencyBalance"
					data={{
						currency: "",
						balance: price.formatMoney(2),
					}}
				/>
			</div>
		</div>
	)

	renderTopUpTxnRow = ({ description, quantity, net }, index) => (
		<div className="row mx--2 mt-1" key={index}>
			<div className="col-7 px-2 word-break-all">
				{quantity} x {<Translate id={`transactionDetails.type.TOP UP`} />}
			</div>
			<div className="col-5 text-left">
				<Translate
					id="_currencyBalance"
					data={{
						currency: currency,
						balance: net.formatMoney(2),
					}}
				/>
			</div>
		</div>
	)

	renderPaymentRow = (
		{ type, value, currency, ref1 },
		index,
		strCard,
		strCredit,
		strCash
	) => (
		<div className="row mx--2 mt-1" key={index}>
			{type.toUpperCase() === strCard && (
				<div className="col-7 px-2">
					<Translate id="transactionDetails.paymentType.CARD" />
					{ref1 !== "" && <span> ({ref1})</span>}
				</div>
			)}
			{type.toUpperCase() === strCredit && (
				<div className="col-7 px-2">
					<Translate id="transactionDetails.paymentType.CREDIT" />
				</div>
			)}
			{type.toUpperCase() === strCash && (
				<div className="col-7 px-2">
					<Translate id="transactionDetails.paymentType.CASH" />
				</div>
			)}
			<div className="col-5 text-left">
				<Translate
					id="_currencyBalance"
					data={{
						currency: "",
						balance: value.formatMoney(2),
					}}
				/>
			</div>
		</div>
	)

	renderRedemptionRow = ({ transactType, voucherTypeName }, index) => (
		<div className="row mx--2 mt-1" key={index}>
			<div className="col-7 px-2">{voucherTypeName}</div>
			{voucherTypeName !== null && (
				<div className="col-5 text-left">
					<Translate id="transactionDetails.type.redeemed" />
				</div>
			)}
		</div>
	)

	render() {
		var strCard = "CARD"
		var strCredit = "CREDIT"
		var strCash = "CASH"
		var notSBCard = false
		var AmountSpend = 0
		const { transactionDetails } = this.props
		//const isTopUpTxn =
		//	transactionDetails.transactType === PLUS_ADJUSTMENT &&
		//	transactionDetails.comment.includes("Top up")
		//const txnType = isTopUpTxn ? "TOP UP" : transactionDetails.transactType
		const txnType = transactionDetails.transactType
		var TotalBonusPoints = 0
		var isAdditionalRewards
		var isVoucherRedemption = ""
		var isVoucherRedemption2 = ""

		for (var i = 0; i < transactionDetails.salesRelatedTransactionList.length; i++) {
			if (
				transactionDetails.salesRelatedTransactionList[i].transactType ===
				"ADDITIONAL REWARDS"
			) {
				isAdditionalRewards = "ADDITIONAL REWARDS"
				TotalBonusPoints +=
					transactionDetails.salesRelatedTransactionList[i].points
			}

			if (
				transactionDetails.salesRelatedTransactionList[i].transactType ===
					"VOUCHER REDEMPTION" &&
				transactionDetails.salesRelatedTransactionList[i].voucherTypeName !== null
			) {
				isVoucherRedemption = "VOUCHER REDEMPTION"
			}
		}
		//for (var j = 0; j < transactionDetails.length; j++) {
		if (transactionDetails.transactType === "VOUCHER REDEMPTION") {
			isVoucherRedemption2 = "VOUCHER REDEMPTION"
		}
		//}
		if (transactionDetails.remark === "Funds Transfer") {
			var cardNoA = transactionDetails.receiptNo
			cardNoA = cardNoA.substring(15, 31)
		}

		for (var k = 0; k < transactionDetails.paymentList.length; k++) {
			if (transactionDetails.paymentList[k].type !== "Card") {
				notSBCard = true
			}
			AmountSpend += transactionDetails.paymentList[k].value
		}
		return (
			<Translate>
				{(translate, activeLanguage, languages) => (
					<div id="transaction-details" className="my-4 my-lg-5">
						<div className="row justify-content-center">
							<div className="col-12 col-xl-11">
								{/* --- Page Content starts here --- */}

								<div className="row justify-content-center">
									<div className="col-12 col-xl-8 col-lg-9 col-md-10 col-sm-11">
										<h4 className="mb-3 text-center">
											<Translate id="transactionDetails._title" />
										</h4>
										<div>
											<div className="box p-3 mt-3 text-left">
												{transactionDetails.remark !==
													"Funds Transfer" && (
													<div className="row">
														<div className="col-sm-7 fw-bold mb-1">
															{translate(
																"transactionDetails.headers.transactionId"
															)}
														</div>
														<div className="col-sm-5 word-break-all">
															{transactionDetails.receiptNo}
														</div>
													</div>
												)}

												<div className="row mt-sm-0 mt-3">
													<div className="col-sm-7 fw-bold mb-1">
														{translate(
															"transactionDetails.headers.dateAndTime"
														)}
													</div>
													<div className="col-sm-5">
														{transactionDetails.transactDate}{" "}
														{transactionDetails.transactTime}
													</div>
												</div>

												<div className="row">
													<div className="col-sm-7 fw-bold mb-1">
														{translate(
															"transactionDetails.headers.store"
														)}
													</div>
													<div className="col-sm-5 word-break-all">
														{
															transactionDetails.transactOutletName
														}
													</div>
												</div>

												<div className="row mt-sm-0 mt-3">
													<div className="col-sm-7 fw-bold mb-1">
														{translate(
															"transactionDetails.headers.starsEarned"
														)}
													</div>
													<div className="col-sm-5">
														{transactionDetails.points.formatPoints(
															0
														)}
													</div>
												</div>
												{isAdditionalRewards ===
													"ADDITIONAL REWARDS" && (
													<div className="row mt-sm-0 mt-3">
														<div className="col-sm-7 fw-bold mb-1">
															{translate(
																"transactionDetails.headers.bonusStars"
															)}
														</div>
														<div className="col-sm-5">
															{TotalBonusPoints.formatPoints(
																0
															)}
														</div>
													</div>
												)}

												{transactionDetails.cardNo &&
													transactionDetails.remark !==
														"Funds Transfer" && (
														<div className="row mt-sm-0 mt-3">
															<div className="col-sm-7 fw-bold mb-1">
																{translate(
																	"transactionDetails.headers.cardNo"
																)}
															</div>
															<div className="col-sm-5">
																{transactionDetails.cardNo.formatCardNo(
																	0
																)}
															</div>
														</div>
													)}
												{transactionDetails.remark ===
													"Funds Transfer" && (
													<div className="row mt-sm-0 mt-3">
														<div className="col-sm-7 fw-bold mb-1">
															{translate(
																"transactionDetails.headers.cardNo"
															)}
														</div>
														<div className="col-sm-5">
															{cardNoA.formatCardNo(0)}
														</div>
													</div>
												)}
												{transactionDetails.ref2 !== "CCC" &&
													txnType !== "ADDITIONAL REWARDS" && (
														<div className="tbl-transactions">
															<div className="row mt-3 font-sub">
																<div className="col-7 color-primary fw-bolder">
																	{translate(
																		"transactionDetails.headers.title"
																	)}
																</div>
																<div className="col-5 text-left color-primary fw-bolder">
																	{translate(
																		"transactionDetails.headers.amount"
																	)}{" "}
																	({currency})
																</div>
															</div>

															{transactionDetails.remark ===
																"Funds Transfer" && (
																<div className="mt-2 font-sub fw-bolder">
																	{translate(
																		`transactionDetails.type.FUNDS TRANSFER`
																	)}
																</div>
															)}
															{transactionDetails.remark !==
																"Funds Transfer" &&
																transactionDetails.ref2 !==
																	"CCC" &&
																isVoucherRedemption2 !==
																	"VOUCHER REDEMPTION" && (
																	<div className="mt-2 font-sub fw-bolder">
																		{translate(
																			`transactionDetails.type.${txnType}`
																		)}
																	</div>
																)}
															{transactionDetails.remark ===
																"Funds Transfer" && (
																<div className="mt-2 font-sub">
																	{transactionDetails.transactionDetailsList.map(
																		(
																			details,
																			index
																		) =>
																			this.renderFundTransferRow(
																				details,
																				index,
																				transactionDetails.cardNo,
																				cardNoA
																			)
																	)}
																</div>
															)}

															{transactionDetails.remark !==
																"Funds Transfer" &&
																transactionDetails.ref2 !==
																	"CCC" &&
																isVoucherRedemption2 !==
																	"VOUCHER REDEMPTION" && (
																	<div className="mt-2 font-sub">
																		{transactionDetails.transactionDetailsList.map(
																			(
																				details,
																				index
																			) =>
																				this.renderTxnRow(
																					details,
																					index,
																					translate(
																						`transactionDetails.type.${txnType}`
																					)
																				)
																		)}
																	</div>
																)}
															{transactionDetails.ref2 !==
																"CCC" &&
																isVoucherRedemption2 !==
																	"VOUCHER REDEMPTION" && (
																	<div className="row mt-2 font-sub fw-bolder">
																		<div className="col-7">
																			{translate(
																				"transactionDetails.bottom.total"
																			)}
																		</div>
																		{transactionDetails.remark ===
																			"In Store Reload" && (
																			<div className="col-5 text-left">
																				<Translate
																					id="_currencyBalance"
																					data={{
																						currency:
																							"",
																						balance: parseFloat(
																							transactionDetails.spendingAmt
																						).formatMoney(
																							2
																						),
																					}}
																				/>
																			</div>
																		)}
																		{transactionDetails.remark ===
																			"Funds Transfer" && (
																			<div className="col-5 text-left">
																				<Translate
																					id="_currencyBalance"
																					data={{
																						currency:
																							"",
																						balance: parseFloat(
																							transactionDetails.ref5
																						).formatMoney(
																							2
																						),
																					}}
																				/>
																			</div>
																		)}
																		{transactionDetails.remark !==
																			"In Store Reload" &&
																			transactionDetails.remark !==
																				"Funds Transfer" && (
																				<div className="col-5 text-left">
																					{!notSBCard && (
																						<Translate
																							id="_currencyBalance"
																							data={{
																								currency:
																									"",
																								balance: transactionDetails.nettSpent.formatMoney(
																									2
																								),
																							}}
																						/>
																					)}
																					{notSBCard && (
																						<Translate
																							id="_currencyBalance"
																							data={{
																								currency:
																									"",
																								balance: AmountSpend.formatMoney(
																									2
																								),
																							}}
																						/>
																					)}
																				</div>
																			)}
																	</div>
																)}
															{isVoucherRedemption ===
																"VOUCHER REDEMPTION" && (
																<div className="tbl-redemption">
																	<div className="mt-2 font-sub fw-bolder">
																		{translate(
																			`transactionDetails.type.VOUCHER REDEMPTION`
																		)}
																	</div>

																	<div className="mt-2 font-sub">
																		{transactionDetails.salesRelatedTransactionList.map(
																			(
																				details,
																				index
																			) =>
																				this.renderRedemptionRow(
																					details,
																					index,
																					translate(
																						`transactionDetails.type.${txnType}`
																					)
																				)
																		)}
																	</div>
																</div>
															)}

															{isVoucherRedemption2 ===
																"VOUCHER REDEMPTION" && (
																<div className="tbl-redemption">
																	<div className="mt-2 font-sub fw-bolder">
																		{translate(
																			`transactionDetails.type.VOUCHER REDEMPTION`
																		)}
																	</div>

																	<div className="mt-2 font-sub">
																		{transactionDetails.transactionDetailsList.map(
																			(
																				details,
																				index
																			) =>
																				this.renderRedemptionRow(
																					details,
																					index,
																					translate(
																						`transactionDetails.type.${txnType}`
																					)
																				)
																		)}
																	</div>
																</div>
															)}
														</div>
													)}
												{transactionDetails.paymentList &&
													transactionDetails.paymentList
														.length > 0 && (
														<div className="tbl-payments">
															<div className="row mt-3 font-sub">
																<div className="col-7 color-primary fw-bolder">
																	{translate(
																		"transactionDetails.headers.payment"
																	)}
																</div>
																<div className="col-5 text-left color-primary fw-bolder">
																	{translate(
																		"transactionDetails.headers.amount"
																	)}{" "}
																	({currency})
																</div>
															</div>
															<div className="mt-2 font-sub">
																{transactionDetails.paymentList.map(
																	(payment, index) =>
																		this.renderPaymentRow(
																			payment,
																			index,
																			strCard,
																			strCredit,
																			strCash
																		)
																)}
															</div>

															<div className="row mt-2 font-sub fw-bolder">
																<div className="col-7">
																	{translate(
																		"transactionDetails.bottom.total"
																	)}
																</div>
																<div className="col-5 text-left">
																	{!notSBCard && (
																		<Translate
																			id="_currencyBalance"
																			data={{
																				currency:
																					"",
																				balance: transactionDetails.nettSpent.formatMoney(
																					2
																				),
																			}}
																		/>
																	)}
																	{notSBCard && (
																		<Translate
																			id="_currencyBalance"
																			data={{
																				currency:
																					"",
																				balance: AmountSpend.formatMoney(
																					2
																				),
																			}}
																		/>
																	)}
																</div>
															</div>
														</div>
													)}
											</div>
										</div>
									</div>
								</div>

								{/* --- Page Content ends here --- */}
							</div>
						</div>
					</div>
				)}
			</Translate>
		)
	}
}

SingleTransaction.propTypes = {
	transactionDetails: PropTypes.object,
}

export default SingleTransaction
