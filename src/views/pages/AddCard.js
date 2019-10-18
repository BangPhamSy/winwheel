import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Field, reduxForm, reset } from "redux-form"
import { push } from "connected-react-router"
import { Translate, getTranslate, getActiveLanguage } from "react-localize-redux"

import {
	createValidator,
	required,
	maxLength,
	integer,
	noVnChars,
	noSpecialChars,
	fixedLength,
} from "../../helpers/validator"
import { recaptchaKey } from "../../configs"
import { addCard } from "../../redux/modules/Card"
import { showMessageModal } from "../../redux/modules/Modal"

import TextField from "../components/fields/TextField"
import RecaptchaField from "../components/fields/RecaptchaField"
import Button from "../components/forms/Button"
import scratch from "../../images/scratch.svg"

const initialValues = {
	printedName: "",
	cardNo: "",
	securityCode: "",
	// recaptcha: "",
}

const validate = createValidator({
	printedName: [maxLength(120), noVnChars, noSpecialChars],
	cardNo: [required, fixedLength(16), integer],
	securityCode: [required, fixedLength(8), integer],
	// recaptcha: [required],
})

export const formId = "addCard"
class AddCard extends React.Component {
	submit = (values) => {
		const { showMessageModal, push, currentLanguage, addCard } = this.props
		//add card
		addCard(values, formId).then((resp) => {
			const { successMessage } = resp
			if (successMessage) {
				return showMessageModal(successMessage, () =>
					push(`/${currentLanguage}/cards`)
				)
			}
			return Promise.resolve()
		})
	}

	render() {
		const {
			error,
			handleSubmit,
			submitting,
			pristine,
			translate,
			currentLanguage,
			reset,
			invalid,
		} = this.props

		const isServerError = !!(error && !error.startsWith("_"))

		return (
			<div id="add-card" className="my-4 my-lg-5">
				<div className="row justify-content-center">
					<div className="col-12 col-xl-11">
						{/* --- Page Content starts here --- */}

						<div className="row justify-content-center">
							<div className="col-12 col-xl-6 col-lg-7 col-md-8 col-sm-9 form-size-layout">
								<h4 className="mb-3">
									<Translate id="addCard._title" />
								</h4>

								<form
									name="form"
									onSubmit={handleSubmit(this.submit)}
									className="my-3 row form form-container-box">
									<div className="col-10">
										<Field
											name="cardNo"
											type="number"
											required={true}
											fixedLength={16}
											component={TextField}
											disabled={submitting}
											label={translate(
												"_shared.form.label._cardNo"
											)}
										/>
										<div className="form-guide">
											<Translate id="_shared.form._cardNoRules" />
										</div>
										<Field
											name="securityCode"
											type="password"
											autocomplete="new-password"
											required={true}
											fixedLength={8}
											disabled={submitting}
											component={TextField}
											label={translate(
												"_shared.form.label._securityCode"
											)}
										/>
										{/* <div className="form-guide">
											<img
												src={scratch}
												alt={translate("signUp.form._Scratch")}
												className="w-25 pr-1"
											/>
											<span className="color-text-2">
												{translate("signUp.form._Scratch")}
											</span>
										</div> */}
										{/* <Field
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
										/> */}
									</div>
									{error && (
										<div className="col-12 mt-2">
											<span className="form-error">{error}</span>
										</div>
									)}
									<div className="col-12 text-center mt-4 cta-buttons">
										<Button
											type="submit"
											className="btn btn-primary"
											loading={submitting}
											disabled={pristine || invalid}>
											<Translate
												id={
													submitting
														? "_Submitting"
														: "addCard.form.button._addCard"
												}
											/>
										</Button>
										<br />
										{/* <Button
											type="button"
											disabled={submitting}
											className="btn btn-black mt-2"
											onClick={() => reset(formId)}>
											<Translate id="_Cancel" />
										</Button> */}
									</div>
								</form>
							</div>
						</div>

						{/* --- Page Content ends here --- */}
					</div>
				</div>
			</div>
		)
	}
}

AddCard.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	submitting: PropTypes.bool.isRequired,
	pristine: PropTypes.bool.isRequired,
	translate: PropTypes.func.isRequired,
}

const mapStateToProps = ({ account, locale }) => ({
	errorMessage: account.errorMessage,
	translate: getTranslate(locale),
	currentLanguage: getActiveLanguage(locale).code,
})

const mapDispatchToProps = (dispatch) => ({
	reset: bindActionCreators(reset, dispatch),
	showMessageModal: bindActionCreators(showMessageModal, dispatch),
	addCard: bindActionCreators(addCard, dispatch),
	push: bindActionCreators(push, dispatch),
})

export default reduxForm({
	form: formId, // a unique identifier for this form
	validate,
	initialValues,
	enableReinitialize: true,
	destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(AddCard))
