import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getTranslate, getActiveLanguage } from "react-localize-redux"

import Wrapper from "../components/common/Wrapper"
import {
	verifyingUnregisterMemberSelector,
	verifyUnregisterMember,
} from "../../redux/modules/Account"

class UnregisterVerification extends Component {
	constructor(props) {
		super(props)

		this.state = { isVerified: false }
	}

	componentDidMount() {
		const { mid, cn } = this.props.match.params
		mid &&
			cn &&
			this.props
				.verifyUnregisterMember({ mid, cn })
				.then(() => this.setState({ isVerified: true }))
	}

	render() {
		const { isVerifying, errorMessage, successMessage } = this.props

		return (
			<Wrapper
				errorMessage={!this.state.isVerified ? errorMessage : ""}
				isFetching={isVerifying}>
				<div className="row py-5">
					<div className="col-12 text-center">{successMessage}</div>
					<div className="col-12 text-center my-3" />
				</div>
			</Wrapper>
		)
	}
}

UnregisterVerification.propTypes = {
	isVerifying: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
	successMessage: PropTypes.string,
}

const mapStateToProps = ({ account, locale, loading }) => ({
	isVerifying: verifyingUnregisterMemberSelector({ loading }),
	errorMessage: account.errorMessage,
	successMessage: account.successMessage,
	translate: getTranslate(locale),
	currentLanguage: getActiveLanguage(locale).code,
})

const mapDispatchToProps = (dispatch) => ({
	verifyUnregisterMember: bindActionCreators(verifyUnregisterMember, dispatch),
})

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UnregisterVerification)
)
