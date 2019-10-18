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
import SingleCard from "../components/common/SingleCard"
import Wrapper from "../components/common/Wrapper"
import { objectToArray } from "../../helpers"

const filterOptions = [
	{ value: "all", label: "All" },
	{ value: "current", label: "This Month" },
	{ value: "previous", label: "Prev Month" },
	{ value: "next", label: "Next Month" },
]

// NOTE: this component is deprecated. use CardTransactions instead

class Transactions extends Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: filterOptions[0].value,
			selectedCardNo: null,
		}

		this.handleOnSelectCard = this.handleOnSelectCard.bind(this)
		this.handleOnSelectFilter = this.handleOnSelectFilter.bind(this)
	}

	componentDidMount() {
		const {
			location: { state },
		} = this.props
		if (state && state.cardNo) {
			this.props.fetchTransactions(state.cardNo)
			this.setState({ selectedCardNo: state.cardNo })
		} else {
			this.props.fetchTransactions("")
		}
	}

	handleOnSelectFilter = (selectedOption) => {
		const { filter } = this.state
		const selectedFilter =
			selectedOption && selectedOption.value ? selectedOption.value : null
		if (selectedFilter !== filter) this.setState({ filter: selectedFilter })
	}

	handleOnSelectCard = (cardNo) => {
		const { selectedCardNo } = this.state
		if (cardNo !== selectedCardNo) {
			this.setState({ selectedCardNo: cardNo })
			this.props.fetchTransactions(cardNo)
		}
	}

	render() {
		const { transactions, isFetching, errorMessage, cardNo } = this.props
		const { filter, selectedCardNo } = this.state
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
				transactDate: "11 Jan 2019",
				originalDate: "17 Jan 2019",
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
		return (
			<div id="my-transactions" className="my-4 my-lg-5">
				<div className="row justify-content-center">
					<div className="col-12 col-xl-11">
						<h4 className="mb-3">
							<Translate id="myTransactions._title" />
						</h4>
						{mockedCards.map((card, index) => (
							<SingleCard
								key={index}
								card={card}
								langCode={"en"}
								className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 mb-4"
								linkTo={"transactions"}
								onImageClick={this.handleOnSelectCard}
								isSelected={card && card.cardNo == selectedCardNo}
							/>
						))}
						<h5 className="mb-3 mt-3">VIEW TRANSACTION</h5>
						<div className="mb-4 text-left col-3 pl-0">
							<Select
								value={filter}
								options={filterOptions}
								placeholder={"Select filter"}
								searchable={false}
								disabled={false}
								onChange={(option) => this.handleOnSelectFilter(option)}
							/>
						</div>
						{selectedCardNo && (
							<Wrapper
								errorMessage={mockedErrorMessage}
								isFetching={isFetching}>
								<MyTransactions
									transactions={mockedTransactions}
									filter={filter}
									isFetching={isFetching}
									errorMessage={mockedErrorMessage}
								/>
							</Wrapper>
						)}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (
	{ transaction: { data, errorMessage }, loading },
	{ match: { params } }
) => ({
	// cardNo: params.cardNo,
	transactions: objectToArray(data).reverse(),
	isFetching: loadingTransactionsSelector({ loading }),
	errorMessage,
})

const mapDispatchToProps = (dispatch) => ({
	fetchTransactions: bindActionCreators(fetchTransactions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
