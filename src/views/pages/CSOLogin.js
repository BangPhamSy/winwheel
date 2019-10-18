import React, { Component } from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Link from "react-router-dom/Link"
import { getTranslate, getActiveLanguage } from "react-localize-redux"
import Wrapper from "../components/common/Wrapper"
import { csoLoginMemberSelector, csoLoginMember } from "../../redux/modules/Auth"

class CSOLogin extends Component {
	constructor(props) {
		super(props)

		this.state = { isVerified: false }
	}

	componentDidMount() {
		//console.log(this.props)
		var search = this.props.location.pathname
		//const urlSearch = new URLSearchParams(search)
		var Param = search.substring(13, search.length + 1)
		//const Param = urlSearch.get("Param")
		//console.error(Param)
		//const { Param } = this.props.match.params
		Param &&
			this.props
				.csoLoginMember({ Param })
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

CSOLogin.propTypes = {
	isVerifying: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
	successMessage: PropTypes.string,
}

const mapStateToProps = ({ account, locale, loading }) => ({
	isVerifying: csoLoginMemberSelector({ loading }),
	errorMessage: account.errorMessage,
	successMessage: account.successMessage,
	translate: getTranslate(locale),
	currentLanguage: getActiveLanguage(locale).code,
})

const mapDispatchToProps = (dispatch) => ({
	csoLoginMember: bindActionCreators(csoLoginMember, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CSOLogin))
