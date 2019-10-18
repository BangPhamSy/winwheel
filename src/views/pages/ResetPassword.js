import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Translate, getTranslate } from "react-localize-redux"
import { withRouter } from "react-router-dom"

import {
	createValidator,
	required,
	match,
	minLength,
	maxLength,
	password,
} from "../../helpers/validator"
import {
	verifyingTokenSelector,
	verifyResetToken,
	resetPassword,
	submittingResetPswSelector,
} from "../../redux/modules/Password"
import TextField from "../components/fields/TextField"
import Wrapper from "../components/common/Wrapper"
import Button from "../components/forms/Button"

const initialValues = {
	newPassword: "",
	confirmNewPassword: "",
}

const validate = createValidator({
	newPassword: [required, minLength(8), password],
	confirmNewPassword: [required, match("newPassword")],
})

export const formId = "resetPassword"
class ResetPassword extends React.Component {
	constructor(props) {
		super(props)

		this.state = { isVerified: false }
		this.submit = this.submit.bind(this)
	}

	submit = (values, dispatch) => {
		const { mid, ts } = this.props.match.params
		dispatch(resetPassword({ ...values, mid, ts }, formId))
	}

	componentDidMount() {
		const { mid, ts } = this.props.match.params
		mid &&
			ts &&
			this.props
				.verifyResetToken({ mid, ts })
				.then(() => this.setState({ isVerified: true }))
	}

	render() {
		const {
			error,
			handleSubmit,
			isVerifying,
			pristine,
			translate,
			submitting,
			errorMessage,
			invalid,
		} = this.props

		return (
			<Wrapper
				errorMessage={!this.state.isVerified ? errorMessage : ""}
				isFetching={isVerifying}>
				<div className="row justify-content-center">
					<div className="col-12 col-xl-4 col-lg-5 py-5">
						<h4 className="text-left">
							<Translate id="resetPassword._title" />
						</h4>
						<form
							name="form"
							onSubmit={handleSubmit(this.submit)}
							className="my-3 row form">
							<div className="col-12">
								<Field
									name="newPassword"
									type="password"
									autocomplete="new-password"
									minLength={8}
									maxLength={15}
									required={true}
									disabled={submitting}
									component={TextField}
									label={translate(
										"resetPassword.form.label._newPassword"
									)}
								/>
								<div className="form-guide">
									<Translate id="signUp.form._passwordRules" />
								</div>
								<Field
									name="confirmNewPassword"
									type="password"
									autocomplete="new-password"
									disabled={submitting}
									match={translate(
										"resetPassword.form.label._newPassword"
									)}
									required={true}
									component={TextField}
									label={translate(
										"resetPassword.form.label._confirmNewPassword"
									)}
								/>
							</div>
							{error && (
								<div className="col-12 my-2">
									<span className="form-error">{error}</span>
								</div>
							)}
							<div className="col-12 text-right mt-3">
								<Button
									type="submit"
									className="btn btn-primary"
									disabled={pristine || invalid}
									loading={submitting}>
									<Translate
										id={
											submitting
												? "_Submitting"
												: "_changeMyPassword"
										}
									/>
								</Button>
							</div>
						</form>
					</div>
				</div>
			</Wrapper>
		)
	}
}

ResetPassword.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	isVerifying: PropTypes.bool.isRequired,
	pristine: PropTypes.bool.isRequired,
	translate: PropTypes.func.isRequired,
}

const mapStateToProps = ({ password, locale, loading }) => ({
	isVerifying: verifyingTokenSelector({ loading }),
	isResetting: submittingResetPswSelector({ loading }),
	errorMessage: password.errorMessage,
	translate: getTranslate(locale),
})

const mapDispatchToProps = (dispatch) => ({
	verifyResetToken: bindActionCreators(verifyResetToken, dispatch),
})

export default withRouter(
	reduxForm({
		form: formId, // a unique identifier for this form
		validate,
		initialValues,
		enableReinitialize: true,
		destroyOnUnmount: false,
	})(connect(mapStateToProps, mapDispatchToProps)(ResetPassword))
)
