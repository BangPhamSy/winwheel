import React, { Component } from "react"
import PropTypes from "prop-types"
import { Translate } from "react-localize-redux"
import classnames from "classnames"
// import { Link } from "react-router-dom"

import Wrapper from "../components/common/Wrapper"

import { PLUS_ADJUSTMENT } from "../../constants"
import { currency } from "../../configs"

class MyTransactions extends Component {
	renderRow = (
		{
			autoID,
			receiptNo,
			transactType,
			nettSpent,
			spendingAmt,
			points,
			originalDate,
			transactDate,
			transactTime,
			transactOutletName,
			remark,
			ref2,
			ref4,
			ref5,
			voidOn,
		},
		activeLanguage,
		index
	) => {
		let voidOnArray = voidOn ? voidOn.split(" ") : ["01/01/0001", "07:07:00"]
		let voidOnDate = voidOnArray[0]
		let voidOnTime = voidOnArray[1]
		return voidOnDate && voidOnDate == "01/01/0001" ? (
			<div key={index} className={classnames("row no-gutters table-row font-sub")}>
				<div className="table-col col-2 pt-0 pb-1 py-md-2 text-md-center">
					{originalDate && originalDate.split(" ")[0]}
				</div>
				<div className="table-col col-2 pt-0 pb-1 py-md-2 text-md-center">
					{transactTime}
				</div>
				<div className="table-col col-4 pt-0 pt-md-2 text-md-center">
					{remark}
				</div>
				<div className="table-col col-2 pt-0 pt-md-2 text-md-center">
					<Translate
						id="_currencyBalance"
						data={{
							currency: currency,
							balance: spendingAmt.formatMoney(2),
						}}
					/>
				</div>
				<div className="table-col col-2 pt-0 pt-md-2 text-md-center">
					{transactOutletName}
				</div>
			</div>
		) : (
			// voided transaction
			<React.Fragment key={`fragment-${index}`}>
				<div
					key={`${index}-voided`}
					className={classnames("row no-gutters table-row font-sub voided")}>
					<div className="table-col col-2 pt-0 pb-1 py-md-2 text-md-center">
						{voidOnDate}
					</div>
					<div className="table-col col-2 pt-0 pb-1 py-md-2 text-md-center">
						{voidOnTime}
					</div>
					<div className="table-col col-4 pt-0 pt-md-2 text-md-center">
						{`Voided Transaction: ${remark} on ${originalDate &&
							originalDate.split(" ")[0]}`}
					</div>
					<div className="table-col col-2 pt-0 pt-md-2 text-md-center">
						<Translate
							id="_currencyBalance"
							data={{
								currency: currency,
								balance: spendingAmt.formatMoney(2) * -1,
							}}
						/>
					</div>
					<div className="table-col col-2 pt-0 pt-md-2 text-md-center">
						{transactOutletName}
					</div>
				</div>
				<div
					key={index}
					className={classnames("row no-gutters table-row font-sub")}>
					<div className="table-col col-2 pt-0 pb-1 py-md-2 text-md-center">
						{originalDate && originalDate.split(" ")[0]}
					</div>
					<div className="table-col col-2 pt-0 pb-1 py-md-2 text-md-center">
						{transactTime}
					</div>
					<div className="table-col col-4 pt-0 pt-md-2 text-md-center">
						{remark}
					</div>
					<div className="table-col col-2 pt-0 pt-md-2 text-md-center">
						<Translate
							id="_currencyBalance"
							data={{
								currency: currency,
								balance: spendingAmt.formatMoney(2),
							}}
						/>
					</div>
					<div className="table-col col-2 pt-0 pt-md-2 text-md-center">
						{transactOutletName}
					</div>
				</div>
			</React.Fragment>
		)
	}

	render() {
		const { transactions, isFetching, errorMessage } = this.props

		var filteredTransaction = transactions.filter(function(item) {
			if (item.transactType === PLUS_ADJUSTMENT) {
				if (item.ref2 === "CCC") {
					return item
				} else if (item.remark === "In Store Reload") {
					return false
				} else if (item.remark === "Funds Transfer") {
					return item
				}
			} else {
				return item
			}
			return false
		})
		var sortedTransactions = filteredTransaction.sort((a, b) => {
			var a_split = a.originalDate.split("/")
			var dateA = [a_split[1], a_split[0], a_split[2]].join("/")

			var b_split = b.originalDate.split("/")
			var dateB = [b_split[1], b_split[0], b_split[2]].join("/")

			var aDate = new Date(dateA + " " + a.transactTime)
			var bDate = new Date(dateB + " " + b.transactTime)
			return bDate.getTime() - aDate.getTime()
		})
		var AmountSpend = 0
		for (var j = 0; j < sortedTransactions.length; j++) {
			for (var k = 0; k < sortedTransactions[j].paymentList.length; k++) {
				AmountSpend += sortedTransactions[j].paymentList[k].value
			}
			sortedTransactions[j].ref4 = AmountSpend
			AmountSpend = 0
		}

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<Translate>
					{(translate, activeLanguage, languages) => (
						<div className="box p-1" id="my-transactions">
							<div className="table table-transactions">
								<div className="row no-gutters table-row table-header">
									{/* <div className="table-col col-sm-1 d-none d-md-block" /> */}
									<div className="table-col col-2 text-md-center">
										<Translate id="myTransactions.header._date" />
									</div>
									<div className="table-col col-2 text-md-center">
										<Translate id="myTransactions.header._time" />
									</div>
									<div className="table-col col-4 text-md-center">
										<Translate id="myTransactions.header._description" />
									</div>
									<div className="table-col col-2 text-md-center">
										<Translate id="myTransactions.header._amount" />
									</div>
									<div className="table-col col-2 text-md-center">
										<Translate id="myTransactions.header._outlet" />
									</div>
								</div>
								{sortedTransactions.length <= 0 && (
									<div className="text-center py-2 px-1">
										{translate(
											"myTransactions.body._noAvailableRecord"
										)}
									</div>
								)}
								{sortedTransactions.length > 0 &&
									sortedTransactions.map((transaction, index) =>
										this.renderRow(transaction, activeLanguage, index)
									)}
							</div>
						</div>
					)}
				</Translate>
			</Wrapper>
		)
	}
}

MyTransactions.propTypes = {
	transactions: PropTypes.array.isRequired,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
}

export default MyTransactions
