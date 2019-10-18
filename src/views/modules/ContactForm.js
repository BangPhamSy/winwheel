import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Field, reduxForm, reset } from "redux-form"
import { Translate, getTranslate, getActiveLanguage } from "react-localize-redux"
import { bindActionCreators } from "redux"

import {
	createValidator,
	email,
	required,
	integer,
	maxFileSize,
	allowedFileExtensions,
	noVnChars,
	noSpecialChars,
	fixedLength,
} from "../../helpers/validator"
import { getSysCodeOptions } from "../../redux/modules/SystemCode"
import TextField from "../components/fields/TextField"
import TextAreaField from "../components/fields/TextAreaField"
import CheckField from "../components/fields/CheckField"
import FileUploadField from "../components/fields/FileUploadField"
import Button from "../components/forms/Button"
import AsyncSelectField from "../components/fields/AsyncSelectField"
import { normalizePhone } from "../../helpers"
import { getCardOptions } from "../../redux/modules/Card"

const fileExtensions = ["jpeg", "jpg", "gif", "png", "pdf"]

const validate = createValidator({
	topic: [required],
	email: [required, email],
	firstName: [required, noVnChars, noSpecialChars],
	lastName: [required, noVnChars, noSpecialChars],
	cardNo: [fixedLength(16)],
	mobileNo: [required, integer],
	countryCode: [required],
	message: [required],
	privacyAgreement: [required],
	attachment: [maxFileSize(3), allowedFileExtensions(fileExtensions)],
})

export const formId = "contact"

class ContactForm extends React.Component {
	render() {
		const {
			error,
			handleSubmit,
			pristine,
			translate,
			submitting,
			getSysCodeOptions,
			getCardOptions,
			currentLanguage,
			reset,
		} = this.props

		return (
			<form onSubmit={handleSubmit} className="form">
				<div className="">
					<Field
						name="topic"
						type="text"
						cache={false}
						parse={(option) => (option ? option.value : null)}
						loadOptions={() =>
							getSysCodeOptions(`${currentLanguage.toUpperCase()}CaseType`)
						}
						key={currentLanguage} // to force react-select reload options
						searchable={false}
						disabled={submitting}
						required={true}
						component={AsyncSelectField}
						label={translate("_shared.form.label._topic")}
					/>
					<Field
						name="firstName"
						type="text"
						autocomplete="given-name"
						required={true}
						disabled={submitting}
						component={TextField}
						label={translate("_shared.form.label._firstName")}
					/>
					<Field
						name="lastName"
						type="text"
						autocomplete="family-name"
						required={true}
						disabled={submitting}
						component={TextField}
						label={translate("_shared.form.label._lastName")}
					/>
					<Field
						name="email"
						type="email"
						autocomplete="email"
						required={true}
						disabled={submitting}
						component={TextField}
						label={translate("_shared.form.label._email")}
					/>
					<div className="row mb-3">
						<div className="col-12">
							<label className="font-sub color-text-2" data-required={true}>
								{translate("_shared.form.label._mobileNo")} {" :"}
							</label>
						</div>
						<div className="col-4 pr-1">
							<Field
								name="countryCode"
								type="text"
								autocomplete="country-code"
								disabled={true}
								component={TextField}
								hideLabel={true}
								label={translate("_shared.form.label._countryCode")}
							/>
						</div>
						<div className="col-8 pl-1">
							<Field
								name="mobileNo"
								type="text"
								normalize={normalizePhone}
								autocomplete="phone"
								component={TextField}
								disabled={submitting}
								hideLabel={true}
								label={translate("_shared.form.label._mobileNo")}
							/>
						</div>
					</div>
					<Field
						name="cardNo"
						type="text"
						cache={false}
						parse={(option) => (option ? option.value : null)}
						loadOptions={getCardOptions}
						searchable={false}
						disabled={submitting}
						required={false}
						component={AsyncSelectField}
						label={translate("_shared.form.label._cardNo")}
					/>
					<Field
						name="message"
						type="text"
						component={TextAreaField}
						required={true}
						disabled={submitting}
						rows={6}
						label={translate("_shared.form.label._message")}
					/>
					<Field
						name="attachment"
						type="file"
						component={FileUploadField}
						maxSize={3}
						required={false}
						disabled={submitting}
						multiple={false}
						allowedFileExtensions={fileExtensions}
						accept={"image/*,application/pdf"}
						label={translate("_shared.form.label._attachment")}
					/>
					<div className="form-guide">
						<Translate id="_shared.form._fileUploadRules" />
					</div>
					<Field
						id="privacyAgreement"
						name="privacyAgreement"
						type="checkbox"
						required={true}
						disabled={submitting}
						component={CheckField}
						label={translate("contact.form.label._privacyAgreement")}
						text={translate("contact.form.name._privacyAgreement")}
						className="font-sub"
					/>
				</div>

				{error && (
					<div className="my-2 text-left">
						<span className="form-error">{error}</span>
					</div>
				)}

				<div className="text-right mt-4 cta-buttons">
					<Button
						type="submit"
						className="btn btn-primary"
						disabled={pristine}
						loading={submitting}>
						<Translate id={submitting ? "_Submitting" : "_Submit"} />
					</Button>
					<br />
					<Button
						type="button"
						className="btn btn-black mt-2"
						disabled={submitting}
						onClick={() => reset(formId)}>
						<Translate id="_Cancel" />
					</Button>
				</div>
			</form>
		)
	}
}

ContactForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	profileErrorMessage: PropTypes.string,
	submitting: PropTypes.bool.isRequired,
	currentLanguage: PropTypes.string.isRequired,
}

const mapStateToProps = ({ profile, locale }) => ({
	profileErrorMessage: profile.errorMessage,
	translate: getTranslate(locale),
	currentLanguage: getActiveLanguage(locale).code,
})

const mapDispatchToProps = (dispatch) => ({
	getSysCodeOptions: bindActionCreators(getSysCodeOptions, dispatch),
	getCardOptions: bindActionCreators(getCardOptions, dispatch),
	reset: bindActionCreators(reset, dispatch),
})

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ContactForm = reduxForm({
	form: formId, // a unique identifier for this form
	validate,
	enableReinitialize: true,
	destroyOnUnmount: false,
})(ContactForm)

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)
