import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Field, reduxForm, reset } from "redux-form"
import { Translate, getTranslate, getActiveLanguage } from "react-localize-redux"
import { bindActionCreators } from "redux"

import { recaptchaKey } from "../../configs"
import { createValidator, email, required } from "../../helpers/validator"
import { forgotPassword } from "../../redux/modules/Password"

import TextField from "../components/fields/TextField"
import RecaptchaField from "../components/fields/RecaptchaField"
import Button from "../components/forms/Button"
import Link from "react-router-dom/Link"

const initialValues = {
	email: "",
	recaptcha: "",
}

const validate = createValidator({
	email: [required, email],
	recaptcha: [required],
})

export const formId = "forgotPassword"
class ForgotPassword extends React.Component {
	constructor(props) {
		super(props)
		this.handleCancel = this.handleCancel.bind(this)
	}

	handleCancel = (evt) => {
		const { reset } = this.props
		// debugger
		// evt.preventDefault()
		// push(`${currentLanguage}/sign-in/`)
		reset(formId)
	}

	submit = ({ email, recaptcha }, dispatch) => {
		dispatch(forgotPassword({ email, recaptcha }, formId))
	}

	render() {
		const {
			error,
			handleSubmit,
			pristine,
			translate,
			submitting,
			currentLanguage,
			invalid,
			reset,
		} = this.props

		const isServerError = !!(error && !error.startsWith("_"))

		return (
			<div id="forgotPassword" className="py-4 py-lg-5">
				<div className="row justify-content-center">
					<div className="col-12 col-xl-11">
						{/* --- Page Content starts here --- */}

						<div className="row justify-content-center">
							<div className="container-box">
								<div className="col-12 col-xl-6 col-lg-7 col-md-8 col-sm-9 form-size-layout">
									<h4 className="mb-3">
										<Translate id="forgotPassword._title" />
									</h4>

									<div className="my-3">
										<Translate id="forgotPassword._description" />
									</div>

									<form
										name="form"
										onSubmit={handleSubmit(this.submit)}
										className="my-3 row justify-content-center form">
										<div className="col-12">
											<Field
												name="email"
												type="email"
												component={TextField}
												labelClassName=""
												secondary={false}
												required={true}
												disabled={submitting}
												className="text-left"
												label={translate(
													"_shared.form.label._email"
												)}
											/>
											<div className="mb-2 color-text-2 font-sub">
												<Translate id="_shared.form._required" />
											</div>
											<Field
												name="recaptcha"
												component={RecaptchaField}
												reset={isServerError}
												disabled={submitting}
												sitekey={recaptchaKey}
												label={translate(
													"_shared.form.label._recaptcha"
												)}
												required={true}
												hl={currentLanguage}
											/>
										</div>
										{error && (
											<div className="col-12 form-error">
												{error}
											</div>
										)}
										<div className="col-12 text-center cta-buttons mt-4">
											<Button
												type="submit"
												className="btn btn-primary"
												disabled={pristine || invalid}
												loading={submitting}>
												<Translate
													id={
														submitting
															? "_Submitting"
															: "_btnResetPassword"
													}
												/>
											</Button>
											<Link
												to={`/sign-in/`}
												disabled={submitting}
												className="btn btn-secondary mt-3"
												onClick={this.handleCancel}>
												<Translate id="_Cancel" />
											</Link>
										</div>
									</form>
								</div>
							</div>
						</div>

						{/* --- Page Content ends here --- */}
					</div>
				</div>
			</div>
		)
	}
}

ForgotPassword.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	pristine: PropTypes.bool.isRequired,
	translate: PropTypes.func.isRequired,
	invalid: PropTypes.bool.isRequired,
	currentLanguage: PropTypes.string.isRequired,
	errorMessage: PropTypes.string,
}

const mapStateToProps = ({ auth, locale }) => ({
	errorMessage: auth.errorMessage,
	translate: getTranslate(locale),
	currentLanguage: getActiveLanguage(locale).code,
})

const mapDispatchToProps = (dispatch) => ({
	reset: bindActionCreators(reset, dispatch),
})

export default reduxForm({
	form: formId, // a unique identifier for this form
	validate,
	initialValues,
	enableReinitialize: true,
	destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword))
