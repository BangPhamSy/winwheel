import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Link from "react-router-dom/Link"
import { getTranslate, getActiveLanguage } from "react-localize-redux"

import Wrapper from "../components/common/Wrapper"
import { verifyingMemberSelector, verifyMember } from "../../redux/modules//Account"

class Verification extends Component {
	constructor(props) {
		super(props)

		this.state = { isVerified: false }
	}

	componentDidMount() {
		const { mid, cn, ts } = this.props.match.params
		mid &&
			cn &&
			ts &&
			this.props
				.verifyMember({ mid, cn, ts })
				.then(() => this.setState({ isVerified: true }))
	}

	render() {
		const { isVerifying, errorMessage, successMessage, currentLanguage } = this.props

		return (
			<Wrapper
				errorMessage={!this.state.isVerified ? errorMessage : ""}
				isFetching={isVerifying}>
				<div className="row py-5">
					<div className="col-12 text-center">{successMessage}</div>
					<div className="col-12 text-center my-3">
						<Link
							to={`/${currentLanguage}/sign-in`}
							className="link link-underline link-primary">
							Click here to SignIn
						</Link>
					</div>
				</div>
			</Wrapper>
		)
	}
}

Verification.propTypes = {
	isVerifying: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
	successMessage: PropTypes.string,
}

const mapStateToProps = ({ account, locale, loading }) => ({
	isVerifying: verifyingMemberSelector({ loading }),
	errorMessage: account.errorMessage,
	successMessage: account.successMessage,
	translate: getTranslate(locale),
	currentLanguage: getActiveLanguage(locale).code,
})

const mapDispatchToProps = (dispatch) => ({
	verifyMember: bindActionCreators(verifyMember, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Verification))
