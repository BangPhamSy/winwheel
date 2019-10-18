import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import PropTypes from "prop-types"
import { getTranslate, getActiveLanguage } from "react-localize-redux"

import {
	fetchTransactionDetails,
	loadingTransactionDetailsSelector,
} from "../../redux/modules/Transaction"
import Wrapper from "../components/common/Wrapper"
import { isEmptyObj } from "../../helpers"
import SingleTransaction from "../modules/SingleTransaction"

class TransactionDetails extends Component {
	componentDidMount() {
		const { receiptNo, autoID, fetchTransactionDetails } = this.props

		if (receiptNo) fetchTransactionDetails(receiptNo, autoID)
	}

	render() {
		const { isFetching, transactionDetails, translate } = this.props
		let { errorMessage } = this.props

		if (isEmptyObj(transactionDetails) && !errorMessage && !isFetching)
			errorMessage = translate("transactionDetails.params._invalidReceiptNo")

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<SingleTransaction transactionDetails={transactionDetails} />
			</Wrapper>
		)
	}
}

TransactionDetails.propTypes = {
	transactionDetails: PropTypes.object,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired,
}

const mapStateToProps = ({ transaction, loading, locale }, { match: { params } }) => {
	const transactionDetails = params.autoID ? transaction.data[params.autoID] : null

	return {
		receiptNo: params.receiptNo,
		autoID: params.autoID,
		isFetching: loadingTransactionDetailsSelector({ loading }),
		transactionDetails,
		errorMessage: transaction.errorMessage,
		translate: getTranslate(locale),
		currentLanguage: getActiveLanguage(locale).code,
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchTransactionDetails: bindActionCreators(fetchTransactionDetails, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetails)
