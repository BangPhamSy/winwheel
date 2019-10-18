import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Translate, getActiveLanguage, getTranslate } from "react-localize-redux"

import { showConfirmMessage, showMessageModal } from "../../redux/modules/Modal"
import { fetchCards, loadingCardsSelector } from "../../redux/modules/Card"
import { unRegister, submittingUnregisterSelector } from "../../redux/modules/Account"
import Wrapper from "../components/common/Wrapper"
import { objectToArray } from "../../helpers"
import { fetchProfile, loadingProfileSelector } from "../../redux/modules/Profile"
class UnRegister extends React.Component {
	componentDidMount() {
		this.props.fetchCards()
		const { fetchProfile } = this.props
		fetchProfile()
	}

	submit = () => {
		const {
			showConfirmMessage,
			showMessageModal,
			unRegister,
			cards,
			translate,
			myName,
		} = this.props

		const cardHasStoreValue = cards.find((card) => card.storedValueBalance > 0)

		if (cardHasStoreValue) {
			showMessageModal(translate("unregister.message._hasStoreBalance"))
		} else {
			showConfirmMessage(
				translate("unregister.message._confirmation_", {
					MyName: myName,
				}),
				() => unRegister()
			)
		}
	}

	render() {
		const { isFetching, isSubmitting, errorMessage } = this.props

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<div id="unregister" className="my-4 my-lg-5 section-remove-account">
					<div className="row justify-content-center">
						<div className="col-12 col-xl-11">
							{/* --- Page Content starts here --- */}

							<h4 className="mb-3">
								<Translate id="unregister._title" />
							</h4>
							<div className="box font-sub p-md-4 p-3">
								<Translate id="unregister._content" />
							</div>
							<div className="mt-4 text-right">
								<button
									className="btn btn-primary"
									disabled={isSubmitting}
									onClick={() => this.submit()}>
									{
										<Translate
											id={
												isSubmitting
													? "_Submitting"
													: "unregister._removeButton"
											}
										/>
									}
								</button>
							</div>

							{/* --- Page Content ends here --- */}
						</div>
					</div>
				</div>
			</Wrapper>
		)
	}
}

UnRegister.propTypes = {
	cardsObj: PropTypes.object.isRequired,
	showMessageModal: PropTypes.func.isRequired,
	showConfirmMessage: PropTypes.func.isRequired,
	fetchCards: PropTypes.func.isRequired,
	unRegister: PropTypes.func.isRequired,
	isFetching: PropTypes.bool,
	isSubmitting: PropTypes.bool,
}

const mapStateToProps = ({ profile, card, loading, locale }) => ({
	cardsObj: card.data,
	cards: objectToArray(card.data),
	myName: profile.data.name,
	isFetching:
		loadingProfileSelector({ loading }) ||
		loadingCardsSelector({ loading }) ||
		submittingUnregisterSelector({ loading }),
	isSubmitting: submittingUnregisterSelector({ loading }),
	errorMessage: card.errorMessage,
	currentLanguage: getActiveLanguage(locale).code,
	translate: getTranslate(locale),
})

const mapDispatchToProps = (dispatch) => ({
	showConfirmMessage: bindActionCreators(showConfirmMessage, dispatch),
	showMessageModal: bindActionCreators(showMessageModal, dispatch),
	fetchCards: bindActionCreators(fetchCards, dispatch),
	unRegister: bindActionCreators(unRegister, dispatch),
	fetchProfile: bindActionCreators(fetchProfile, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(UnRegister)
