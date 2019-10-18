import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Translate, getTranslate, getActiveLanguage } from "react-localize-redux"

import {
	createValidator,
	required,
	maxLength,
	noVnChars,
	noSpecialChars,
} from "../../../helpers/validator"
import TextField from "../../components/fields/TextField"
import { currency } from "../../../configs"
import Button from "../../components/forms/Button"

const validate = createValidator({
	cardNo: [required],
	printedName: [required, maxLength(120), noVnChars, noSpecialChars],
})

export const formId = "cardEdit"

class CardEdit extends React.Component {
	renderCardValue = (storedValueBalance) => (
		<div className="card-value mt-4">
			<div className="">
				<Translate id="defaultCardForm.copy._storeValue" />:
			</div>
			<div className="value f2">
				<Translate
					id="_currencyBalance"
					data={{
						currency: currency,
						balance: storedValueBalance.formatMoney(2),
					}}
				/>
			</div>
		</div>
	)

	render() {
		const {
			cardDetails: {
				printedName,
				cardNo,
				storedValueBalance,
				expiryDate,
				isDefault,
				isActive,
			},
			error,
			handleSubmit,
			pristine,
			translate,
			submitting,
			isEditing,
			onEditCard,
			onCancelEditCard,
		} = this.props

		return (
			<div>
				{!isEditing && (
					<div>
						<div className="card-info">
							<div className="card-title">
								{/* <span>{printedName}</span> */}
								{/* {isActive && (
									<a
										onClick={onEditCard}
										title="Edit card name"
										className="link link-underline">
										<i className="icon icon-edit mb-1 ml-1" />
									</a>
								)} */}
							</div>
							<div className="card-no">#{cardNo}</div>
						</div>
						{this.renderCardValue(storedValueBalance)}
						<div className="card-exp mt-3">
							<div className="card-number">{`Expiry Date: ${expiryDate &&
								expiryDate.split(" ")[0]}`}</div>
						</div>
						{/* <div
							className={classnames("card-default color-primary", {
								"d-none": isDefault !== true,
							})}>
							<Translate id="cardDetails.defaultCard" />
						</div> */}
					</div>
				)}

				{isEditing && (
					<form name="form" onSubmit={handleSubmit} className="form">
						<div className="card-info">
							<div className="card-title">
								<Field
									name="printedName"
									type="text"
									required={true}
									maxLength={120}
									disabled={submitting}
									component={TextField}
									hideLabel={false}
									className="mb-3 fw-normal"
									label={translate("_shared.form.label._printedName")}
								/>
							</div>
							<Field
								name="cardNo"
								type="textbox"
								component={TextField}
								className="d-none"
							/>
							<div className="card-no">{cardNo}</div>
						</div>
						{this.renderCardValue(storedValueBalance)}
						{error && (
							<div className="mt-3">
								<span className="form-error">{error}</span>
							</div>
						)}
						<div className="mt-2">
							<Button
								type="submit"
								className="btn btn-primary mr-3"
								disabled={pristine}
								loading={submitting}>
								<Translate
									id={submitting ? "_Submitting" : "_saveChanges"}
								/>
							</Button>
							<Button
								className="btn"
								disabled={submitting}
								onClick={onCancelEditCard}>
								<Translate id={"_Cancel"} />
							</Button>
						</div>
					</form>
				)}
			</div>
		)
	}
}

CardEdit.propTypes = {
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
})(connect(mapStateToProps)(CardEdit))
