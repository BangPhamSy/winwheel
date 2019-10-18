import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Translate } from "react-localize-redux"
import Select from "react-select"

import {
	fetchTransactions,
	loadingTransactionsSelector,
} from "../../redux/modules/Transaction"
import MyTransactions from "../modules/MyTransactions"
import Wrapper from "../components/common/Wrapper"
import { objectToArray } from "../../helpers"

const filterOptions = [
	{ value: "all", label: "All" },
	{ value: "current", label: "This Month" },
	{ value: "previous", label: "Prev Month" },
	{ value: "next", label: "Next Month" },
]

class Transactions extends Component {
	state = {
		filter: filterOptions[0].value,
	}

	componentDidMount() {
		const { cardNo } = this.props
		if (cardNo) {
			this.props.fetchTransactions(cardNo)
		} else {
			this.props.fetchTransactions("")
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.cardNo !== this.props.cardNo) {
			this.props.fetchTransactions(this.props.cardNo)
		}
	}

	handleOnSelectFilter = (selectedOption) => {
		const { filter } = this.state
		const selectedFilter =
			selectedOption && selectedOption.value ? selectedOption.value : null
		if (selectedFilter !== filter) this.setState({ filter: selectedFilter })
	}

	render() {
		const { transactions, isFetching, errorMessage, cardNo } = this.props
		const { filter } = this.state
		const mockedErrorMessage = ""
		const mockedTransactions = [
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "112121AS",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "10 Jan 2019",
				originalDate: "15 Jan 2019",
				autoID: "AS1",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "11 Feb 2018",
				originalDate: "17 Feb 2018",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "11 Apr 2019",
				originalDate: "17 Apr 2019",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "11 May 2019",
				originalDate: "17 May 2019",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "11 Jun 2019",
				originalDate: "17 Jun 2019",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "11 Aug 2019",
				originalDate: "17 Aug 2019",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "11 Sep 2018",
				originalDate: "17 Sep 2018",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "11 Oct 2018",
				originalDate: "17 Oct 2018",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "8 Nov 2018",
				originalDate: "9 Nov 2018",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "11 Nov 2018",
				originalDate: "17 Nov 2018",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
			{
				nettSpent: 1.0,
				remark: "Funds Transfer",
				points: 1.0,
				spendingAmt: 12.0,
				itemCode: "SD13",
				receiptNo: "1121909S",
				transactOutletName: "Orchord",
				transactOutletCode: "A1",
				transactTime: "16:41:51",
				transactDate: "11 Dec 2018",
				originalDate: "17 Dec 2018",
				autoID: "AS2",
				cardNo: "C21",
				transactType: "PLUS ADJUSTMENT",
				transactionDetailsList: [],
				paymentList: [],
				salesRelatedTransactionList: [],
				comment: "Success",
				ref1: "REF1",
				ref2: "CCC",
				ref3: "REF3",
				ref4: "434343",
				ref5: "REF5",
			},
		]
		const filteredTransactions = transactions.filter((transaction) => {
			const currentDate = new Date()
			const currentMonth = currentDate.getMonth()
			switch (filter) {
				case "current":
					return new Date(transaction.transactDate).getMonth() == currentMonth
				case "previous":
					return currentMonth != 0
						? new Date(transaction.transactDate).getMonth() ==
								currentMonth - 1
						: new Date(transaction.transactDate).getMonth() == 11
				case "next":
					return currentMonth != 11
						? new Date(transaction.transactDate).getMonth() ==
								currentMonth + 1
						: new Date(transaction.transactDate).getMonth() == 0
				default:
					return transaction
			}
		})
		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<div className="mb-4 text-left col-3 pl-0">
					{/* <Select
						value={filter}
						options={filterOptions}
						searchable={false}
						disabled={false}
						onChange={(option) => this.handleOnSelectFilter(option)}
					/> */}
				</div>
				<MyTransactions
					transactions={filteredTransactions}
					filter={filter}
					isFetching={isFetching}
					errorMessage={errorMessage}
				/>
			</Wrapper>
		)
	}
}

const mapStateToProps = ({ transaction: { data, errorMessage }, loading }) => ({
	transactions: objectToArray(data).reverse(),
	isFetching: loadingTransactionsSelector({ loading }),
	errorMessage,
})

const mapDispatchToProps = (dispatch) => ({
	fetchTransactions: bindActionCreators(fetchTransactions, dispatch),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Transactions)
