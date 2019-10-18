import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { push } from "connected-react-router"

import { fetchCards, loadingCardsSelector } from "../../redux/modules/Card"
import {
	fetchProfileWithAddress,
	updateAddress,
	loadingProfileSelector,
} from "../../redux/modules/Profile"
import { Translate, getTranslate, getActiveLanguage } from "react-localize-redux"
import { CardInfo } from "../modules/CardInfo"
import Wrapper from "../components/common/Wrapper"
import ConfirmAddressForm, { formId } from "../modules/ConfirmAddressForm"
import { isEmptyObj } from "../../helpers"
import { showMessageModal } from "../../redux/modules/Modal"

class ReportLoss extends Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const {
			fetchProfileWithAddress,
			redirect,
			fetchCards,
			cardNo,
			currentLanguage,
		} = this.props

		if (cardNo) return Promise.all([fetchCards(), fetchProfileWithAddress()])
		return redirect(`/${currentLanguage}/cards`)
	}

	handleSubmit = (values, dispatch) => {
		const {
			redirect,
			updateAddress,
			currentLanguage,
			showMessageModal,
			translate,
		} = this.props

		updateAddress({ ...values }, formId).then(() => {
			showMessageModal(translate("reportLost.message._updateAddress"), () =>
				redirect(`/${currentLanguage}/cards`)
			)
		})
	}

	render() {
		const {
			cardDetails,
			isFetching,
			errorMessage,
			translate,
			initialValues,
		} = this.props

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<div id="my-card-details" className="my-4 my-lg-5">
					<div className="row justify-content-center">
						<div className="col-12 col-xl-8">
							{/* --- Page Content starts here --- */}

							<h4 className="mb-3">
								<Translate id="cardDetails._title" />
							</h4>

							<section className="card-item">
								<CardInfo cardDetails={cardDetails} />
							</section>

							<section className="report-loss-form mt-3">
								<ConfirmAddressForm
									initialValues={initialValues}
									onSubmit={this.handleSubmit}
									desc={translate("reportLost.copy._message")}
								/>
							</section>
							{/* --- Page Content ends here --- */}
						</div>
					</div>
				</div>
			</Wrapper>
		)
	}
}

ReportLoss.propTypes = {
	cards: PropTypes.array,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool,
	isUpdating: PropTypes.bool,
	fetchCards: PropTypes.func.isRequired,
}

const mapStateToProps = ({ card, locale, profile, loading }, { match: { params } }) => {
	const cardNo = params.cardNo,
		cardDetails = cardNo ? card.data[params.cardNo] : null

	return {
		initialValues: { address: profile.data.address },
		cardNo,
		cardsObj: card.data,
		cardDetails,
		isFetching:
			loadingCardsSelector({ loading }) ||
			isEmptyObj(cardDetails) ||
			loadingProfileSelector({ loading }),
		errorMessage: card.errorMessage,
		translate: getTranslate(locale),
		currentLanguage: getActiveLanguage(locale).code,
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchCards: bindActionCreators(fetchCards, dispatch),
	fetchProfileWithAddress: bindActionCreators(fetchProfileWithAddress, dispatch),
	updateAddress: bindActionCreators(updateAddress, dispatch),
	showMessageModal: bindActionCreators(showMessageModal, dispatch),
	redirect: bindActionCreators(push, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportLoss))
