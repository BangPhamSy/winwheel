import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { reduxForm, FormSection } from "redux-form"
import { Translate, getTranslate, getActiveLanguage } from "react-localize-redux"
import Loadable from "react-loadable"

import { createValidator, required, noVnChars } from "../../helpers/validator"

import Button from "../components/forms/Button"
import Loading from "../components/shared/Loading"
const AsyncAddressSection = Loadable({
	loader: () => import("./AddressSection"),
	loading: Loading,
})

const validate = createValidator({
	address: {
		address1: [required, noVnChars],
		city: [required],
		district: [required],
		ward: [required],
	},
})

export const formId = "reportLoss"

class ConfirmAddressForm extends React.PureComponent {
	render() {
		const { error, desc, handleSubmit, invalid, submitting } = this.props

		return (
			<form onSubmit={handleSubmit} className="form justify-content-center">
				<div className="box p-4">
					<div className="row p-3">
						<div className="col-12 mb-3">
							<h5 className="color-text-1">{desc}</h5>
						</div>
						<div className="col-12">
							<FormSection name="address">
								<AsyncAddressSection
									formId={formId}
									isEditable={!submitting}
									colorInverted={true}
									requiredFields={{
										street1: true,
										street2: true,
										city: true,
										district: true
									}}
								/>
							</FormSection>
						</div>
						{error && (
							<div className="col-12">
								<span className="form-error">{error}</span>
							</div>
						)}
					</div>
				</div>
				<div className="col-12 text-right cta-buttons mt-4">
					<Button
						type="submit"
						className="btn btn-primary m1-1"
						disabled={invalid}
						loading={submitting}>
						<Translate id={submitting ? "_Submitting" : "_confirmAddress"} />
					</Button>
					<br />
				</div>
			</form>
		)
	}
}

ConfirmAddressForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	invalid: PropTypes.bool.isRequired,
	pristine: PropTypes.bool.isRequired,
	translate: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	desc: PropTypes.string,
}

const mapStateToProps = ({ locale }) => {
	return {
		translate: getTranslate(locale),
		currentLanguage: getActiveLanguage(locale).code,
	}
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ConfirmAddressForm = reduxForm({
	form: formId, // a unique identifier for this form
	validate,
	enableReinitialize: true,
	destroyOnUnmount: false,
})(ConfirmAddressForm)

export default connect(mapStateToProps)(ConfirmAddressForm)
