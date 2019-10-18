import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { push } from "connected-react-router"
import { Translate, getTranslate, getActiveLanguage } from "react-localize-redux"

import {
	fetchProfileWithAddress,
	updateAddress,
	loadingProfileSelector,
} from "../../redux/modules/Profile"
import { showMessageModal } from "../../redux/modules/Modal"

import Wrapper from "../components/common/Wrapper"
import ConfirmAddressForm, { formId } from "../modules/ConfirmAddressForm"
import { VERIFY_GOLD_CARD_ADDRESS } from "../../constants"

class VerifyGoldCardAddress extends Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const {
			fetchProfileWithAddress,
			redirect,
			currentLanguage,
			confirmAddressRequired,
		} = this.props

		if (confirmAddressRequired) return fetchProfileWithAddress()
		return redirect(`/${currentLanguage}/account`)
	}

	handleSubmit = (values, dispatch) => {
		const {
			redirect,
			updateAddress,
			currentLanguage,
			showMessageModal,
			translate,
		} = this.props

		updateAddress({ ...values, isUpgradeGoldCardVerified: true }, formId).then(() => {
			showMessageModal(
				translate("verifyGoldCardAddress.message._updateAddress"),
				() => redirect(`/${currentLanguage}/account`)
			)
		})
	}

	render() {
		const { isFetching, errorMessage, translate, initialValues } = this.props

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<div id="my-card-details" className="my-4 my-lg-5">
					<div className="row justify-content-center">
						<div className="col-12 col-xl-8">
							{/* --- Page Content starts here --- */}

							<h3 className="mb-3">
								<Translate id="verifyGoldCardAddress._title" />
							</h3>

							<section className="report-loss-form mt-3">
								<ConfirmAddressForm
									initialValues={initialValues}
									onSubmit={this.handleSubmit}
									desc={translate(
										"verifyGoldCardAddress.copy._message"
									)}
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

VerifyGoldCardAddress.propTypes = {
	cards: PropTypes.array,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool,
	isUpdating: PropTypes.bool,
}

const mapStateToProps = ({ locale, profile, auth, loading }, { match: { params } }) => {
	return {
		initialValues: { address: profile.data.address },
		isFetching: loadingProfileSelector({ loading }),
		errorMessage: profile.errorMessage,
		translate: getTranslate(locale),
		currentLanguage: getActiveLanguage(locale).code,
		confirmAddressRequired: auth.returnAction === VERIFY_GOLD_CARD_ADDRESS,
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchProfileWithAddress: bindActionCreators(fetchProfileWithAddress, dispatch),
	updateAddress: bindActionCreators(updateAddress, dispatch),
	showMessageModal: bindActionCreators(showMessageModal, dispatch),
	redirect: bindActionCreators(push, dispatch),
})

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(VerifyGoldCardAddress)
)
