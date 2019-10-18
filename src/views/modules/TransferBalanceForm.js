import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { Translate, getActiveLanguage } from "react-localize-redux"
import { Field, reduxForm, formValueSelector, change } from "redux-form"
import { push } from "connected-react-router"

import { required, createValidator } from "../../helpers"
import { currency, maxTransferAmount } from "../../configs"

import SingleCard from "../components/common/SingleCard"
import SelectField from "../components/fields/SelectField"
import Button from "../components/forms/Button"

export const formId = "transferBalance"
const validate = createValidator({
	fromCardNo: [required],
	toCardNo: [required],
})

class TransferBalanceForm extends Component {
	constructor(props) {
		super(props)

		this.handleFromCardChange = this.handleFromCardChange.bind(this)
	}

	handleFromCardChange = ({ value }) => {
		const { fromCardNo, changeFieldValue } = this.props
		if (value !== fromCardNo) changeFieldValue("toCardNo", null)
	}

	componentDidUpdate(prevProps, prevState) {
		const { fromCardNo, changeFieldValue } = this.props
		const { fromCardNo: prevFromCardNo } = prevProps
		if (prevFromCardNo && !fromCardNo) changeFieldValue("fromCardNo", prevFromCardNo)
	}

	render() {
		const {
			fromCard,
			toCard,
			pristine,
			handleSubmit,
			submitting,
			fromCardOptions,
			toCardOptions,
			error,
			invalid,
		} = this.props

		return (
			<Translate>
				{(translate, activeLanguage) => (
					<form name="form" onSubmit={handleSubmit} className="form">
						<div className="box p-2">
							<div className="table">
								<div className="row no-gutters table-row table-header">
									<div className="table-col col-12 col-sm-6">
										{translate(
											"transferBalance.header._transferFrom"
										)}:
									</div>
									<div className="table-col d-none d-sm-block col-sm-6">
										{translate("transferBalance.header._transferTo")}:
									</div>
								</div>
								<div className="row no-gutters table-row">
									<div className="table-col col-12">
										{translate("transferBalance.rules._maxAllow", {
											maxAllow: translate("_currencyBalance", {
												currency: currency,
												balance: maxTransferAmount.formatMoney(2),
											}),
										})}
									</div>
									<div className="table-col col-12 col-sm-6">
										<Field
											name="fromCardNo"
											type="text"
											parse={(option) =>
												option ? option.value : null
											}
											disabled={submitting}
											options={fromCardOptions}
											onChange={this.handleFromCardChange}
											searchable={false}
											hideLabel={true}
											clearable={false}
											component={SelectField}
											selectClassName="Select-secondary"
											label={translate("_shared.form.label._card")}
										/>
										{fromCard && (
											<SingleCard
												className="m-0 p-0 col-xl-6 col-lg-7 col-md-8 col-sm-9 col-10"
												card={fromCard}
												newValueBalance={0.0}
												langCode={activeLanguage.code}
											/>
										)}
									</div>
									<div className="table-col col-12 col-sm-6">
										<Field
											name="toCardNo"
											type="text"
											parse={(option) =>
												option ? option.value : null
											}
											disabled={submitting}
											options={toCardOptions}
											searchable={false}
											clearable={true}
											component={SelectField}
											selectClassName="Select-secondary"
											hideLabel={true}
											label={translate("_shared.form.label._card")}
										/>
										{toCard && (
											<SingleCard
												className="m-0 p-0 col-xl-6 col-lg-7 col-md-8 col-sm-9 col-10"
												card={toCard}
												newValueBalance={
													fromCard.storedValueBalance +
													toCard.storedValueBalance
												}
												langCode={activeLanguage.code}
											/>
										)}
									</div>
									{error && (
										<div className="table-col col-12 text-right">
											<span className="form-error">{error}</span>
										</div>
									)}
									<div className="table-col col-12 text-right">
										<Button
											type="submit"
											className="btn btn-primary ml-1 px-4"
											disabled={pristine || invalid}
											loading={submitting}>
											<Translate
												id={
													submitting
														? "_Submitting"
														: "_Transfer"
												}
											/>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</form>
				)}
			</Translate>
		)
	}
}

TransferBalanceForm.propTypes = {
	fromCardNo: PropTypes.string,
	toCardNo: PropTypes.string,
	cards: PropTypes.array.isRequired,
	initialValues: PropTypes.object.isRequired,
}

const selector = formValueSelector(formId) // <-- same as form name
const mapStateToProps = (state, ownProps) => {
	const fromCardNo = selector(state, "fromCardNo"),
		toCardNo = selector(state, "toCardNo"),
		fromCardOptions = ownProps.cards.reduce((acc, card) => {
			card.storedValueBalance > 0 &&
				acc.push({ value: card.cardNo, label: card.cardNo })
			return acc
		}, []),
		toCardOptions = ownProps.cards
			.filter((card) => card.isActive && card.cardNo !== fromCardNo)
			.reduce((acc, card) => {
				acc.push({ value: card.cardNo, label: card.cardNo })
				return acc
			}, [])

	return {
		fromCardNo,
		toCardNo,
		toCardOptions,
		fromCardOptions,
		fromCard: state.card.data[fromCardNo],
		toCard: state.card.data[toCardNo],
		currentLanguage: getActiveLanguage(state.locale).code,
	}
}
const mapDispatchToProps = (dispatch) => ({
	redirect: bindActionCreators(push, dispatch),
	changeFieldValue: bindActionCreators(
		(field, value) => change(formId, field, value),
		dispatch
	),
})

export default reduxForm({
	form: formId, // a unique identifier for this form
	validate,
	enableReinitialize: true,
	destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(TransferBalanceForm))
