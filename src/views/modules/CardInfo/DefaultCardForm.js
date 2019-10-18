import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Translate, getTranslate, getActiveLanguage } from "react-localize-redux"

import { createValidator, required } from "../../../helpers/validator"
import TextField from "../../components/fields/TextField"

const validate = createValidator({
	cardNo: [required],
})

export const formId = "defaultCard"

class DefaultCardForm extends React.Component {
	render() {
		const { error, handleSubmit, pristine, submitting } = this.props
		return (
			<form name="form" className="row justify-content-start form">
				<div className="col-12">
					<Field
						name="cardNo"
						type="textbox"
						disabled={submitting}
						component={TextField}
						className="d-none"
					/>
				</div>
				{error && (
					<div className="my-2 col-12 text-left">
						<div className="form-error">{error}</div>
					</div>
				)}
				<div className="col-12 mt-1">
					<a
						onClick={handleSubmit}
						className="link link-primary link-underline"
						disabled={pristine || submitting}>
						<Translate id={submitting ? "_Submitting" : "_SetAsDefault"} />
					</a>
				</div>
			</form>
		)
	}
}

DefaultCardForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	pristine: PropTypes.bool.isRequired,
	submitting: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ card, locale }) => ({
	translate: getTranslate(locale),
	currentLanguage: getActiveLanguage(locale).code,
})

export default reduxForm({
	form: formId, // a unique identifier for this form
	validate,
	enableReinitialize: true,
	destroyOnUnmount: false,
})(connect(mapStateToProps)(DefaultCardForm))
