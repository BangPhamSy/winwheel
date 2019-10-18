import React, { Component } from "react"
import PropTypes from "prop-types"
import { Translate, getActiveLanguage } from "react-localize-redux"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { formValueSelector, Field, change } from "redux-form"

import TextField from "../components/fields/TextField"
import {
	getCityOptions,
	loadingDistrictsSelector,
	fetchWards,
	fetchDistricts,
	loadingWardsSelector,
} from "../../redux/modules/AdminUnit"
// import SelectField from "../components/fields/SelectField"
import AsyncSelectField from "../components/fields/AsyncSelectField"
import { objectToArray } from "../../helpers"

class AddressSection extends Component {

	handleCityChange = (selectedValue) => {
		const {
			cities,
			fetchDistricts,
			changeFieldValue,
			selectedCity,
			formId,
		} = this.props,
			city = cities[selectedValue],
			shouldFetchDistrict = city && selectedValue && selectedValue !== selectedCity

		if (!!selectedValue) {
			changeFieldValue(formId, "address.district", null)
			changeFieldValue(formId, "address.ward", null)
		}

		if (shouldFetchDistrict) {
			fetchDistricts(city.cityCode)
		}
	}

	// handleDistrictChange = (selectedValue) => {
	// 	const {
	// 		selectedCity,
	// 		selectedDistrict,
	// 		cities,
	// 		districts,
	// 		fetchWards,
	// 		changeFieldValue,
	// 		formId,
	// 	} = this.props

	// 	if (!!selectedValue) changeFieldValue(formId, "address.ward", null)

	// 	const city = cities[selectedCity],
	// 		district = districts.byName[selectedValue]

	// 	const shouldFetchNewWards =
	// 		city &&
	// 		district &&
	// 		selectedValue &&
	// 		selectedCity &&
	// 		selectedDistrict !== selectedValue
	// 	if (shouldFetchNewWards) {
	// 		fetchWards(city.cityCode, district.districtCode)
	// 	}
	// }

	render() {
		const {
			// districtOptions,
			// wardOptions,
			// isDistrictsFetching,
			// isWardsFetching,
			isEditable,
			getCityOptions,
			colorInverted,
			requiredFields,
		} = this.props

		return (
			<Translate>
				{(translate, activeLanguage) => [
					<Field
						name="street1"
						key="street1"
						type="text"
						required={requiredFields["street1"]}
						inputClassName={colorInverted && "textbox-primary-inverted"}
						autocomplete="street-address"
						component={TextField}
						disabled={!isEditable}
						label={translate("_shared.form.label._address1")}
					/>,
					<Field
						name="street2"
						key="street2"
						type="text"
						required={requiredFields["street2"]}
						inputClassName={colorInverted && "textbox-primary-inverted"}
						autocomplete="street-address2"
						component={TextField}
						disabled={!isEditable}
						label={translate("_shared.form.label._address2")}
					/>,
					<Field
						name="postalCode"
						key="postalCode"
						type="number"
						required={requiredFields["postalCode"]}
						inputClassName={colorInverted && "textbox-primary-inverted"}
						autocomplete="street-address2"
						component={TextField}
						disabled={!isEditable}
						label={translate("_shared.form.label._postalCode")}
					/>,
					<Field
						name="city"
						type="text"
						key="city"
						required={requiredFields["city"]}
						autocomplete="address-level2"
						selectClassName={colorInverted && "Select-inverted"}
						parse={(option) => (option ? option.value : null)}
						onChange={(option) =>
							this.handleCityChange(option ? option.value : null)
						}
						loadOptions={getCityOptions}
						disabled={!isEditable}
						component={AsyncSelectField}
						label={translate("_shared.form.label._city")}
					/>,
					// <Field
					// 	name="country"
					// 	type="text"
					// 	key="country"
					// 	required={requiredFields["country"]}
					// 	selectClassName={colorInverted && "Select-inverted"}
					// 	autocomplete="address-line1"
					// 	parse={(option) => (option ? option.value : null)}
					// 	onChange={(option) =>
					// 		this.handleDistrictChange(option ? option.value : null)
					// 	}
					// 	options={districtOptions}
					// 	component={SelectField}
					// 	disabled={isDistrictsFetching || !isEditable}
					// 	isLoading={isDistrictsFetching}
					// 	label={translate("_shared.form.label._country")}
					// />
					// <Field
					// 	name="district"
					// 	type="text"
					// 	key="district"
					// 	required={requiredFields["district"]}
					// 	selectClassName={colorInverted && "Select-inverted"}
					// 	autocomplete="address-line1"
					// 	parse={(option) => (option ? option.value : null)}
					// 	onChange={(option) =>
					// 		this.handleDistrictChange(option ? option.value : null)
					// 	}
					// 	options={districtOptions}
					// 	component={SelectField}
					// 	disabled={isDistrictsFetching || !isEditable}
					// 	isLoading={isDistrictsFetching}
					// 	label={translate("_shared.form.label._district")}
					// />,
					// <Field
					// 	name="ward"
					// 	type="text"
					// 	key="ward"
					// 	required={requiredFields["ward"]}
					// 	selectClassName={colorInverted && "Select-inverted"}
					// 	autocomplete="address-line2"
					// 	parse={(option) => (option ? option.value : null)}
					// 	options={wardOptions}
					// 	disabled={isWardsFetching || !isEditable}
					// 	component={SelectField}
					// 	searchable={false}
					// 	isLoading={isWardsFetching}
					// 	label={translate("_shared.form.label._ward")}
					// />,
				]}
			</Translate>
		)
	}
}

AddressSection.defaultProps = {
	requiredFields: {},
}

AddressSection.propTypes = {
	districtOptions: PropTypes.array.isRequired,
	// wardOptions: PropTypes.array.isRequired,
	// isWardsFetching: PropTypes.bool.isRequired,
	// isDistrictsFetching: PropTypes.bool.isRequired,
	// fetchDistricts: PropTypes.func.isRequired,
	// fetchWards: PropTypes.func.isRequired,
	isEditable: PropTypes.bool,
	changeFieldValue: PropTypes.func.isRequired,
	requiredFields: PropTypes.shape({
		street1: PropTypes.bool,
		street2: PropTypes.bool,
		city: PropTypes.bool,
		postalCode: PropTypes.bool,
		// district: PropTypes.bool,
		// ward: PropTypes.bool,
	}),
}

const mapStateToProps = (state, { formId }) => {
	const { loading, adminUnit, locale } = state,
		{ cities, districts, wards } = adminUnit,
		selector = formValueSelector(formId),
		selectedCity = selector(state, "address.city"),
		// selectedDistrict = selector(state, "address.district"),
		// selectedWard = selector(state, "address.ward"),
		isEnglish = getActiveLanguage(locale).code === "en",
		selectedCityObj = cities[selectedCity]
	// selectedDisctrictObj = districts.byName[selectedDistrict]

	return {
		cities,
		// districts,
		// districtOptions: objectToArray(districts.byCode)
		// 	.filter((district) => {
		// 		return (
		// 			district &&
		// 			(!selectedCityObj || district.cityCode === selectedCityObj.cityCode)
		// 		)
		// 	})
		// 	.reduce((options, district) => {
		// 		//to set language base on selected city or city value
		// 		options.push({
		// 			value: district.englishName,
		// 			label: isEnglish ? district.englishName : district.districtName,
		// 		})

		// 		return options
		// 	}, [])
		// 	.sort((a, b) => a.label.localeCompare(b.label, "en", { numeric: true })),
		// wardOptions: objectToArray(wards.byCode)
		// 	.filter((ward) => {
		// 		return (
		// 			ward &&
		// 			(!selectedDisctrictObj ||
		// 				ward.districtCode === selectedDisctrictObj.districtCode)
		// 		)
		// 	})
		// 	.reduce((options, ward) => {
		// 		// set language base on selected district or district value
		// 		options.push({
		// 			value: ward.englishName,
		// 			label: isEnglish ? ward.englishName : ward.wardName,
		// 		})

		// 		return options
		// 	}, [])
		// 	.sort((a, b) => a.label.localeCompare(b.label, "en", { numeric: true })),
		// isWardsFetching: loadingWardsSelector({ loading }),
		// isDistrictsFetching: loadingDistrictsSelector({ loading }),
		// selectedDistrict,
		// selectedWard,
		selectedCity,
	}
}

const mapDispatchToProps = (dispatch) => ({
	// fetchDistricts: bindActionCreators(fetchDistricts, dispatch),
	// fetchWards: bindActionCreators(fetchWards, dispatch),
	changeFieldValue: bindActionCreators(change, dispatch),
	getCityOptions: bindActionCreators(getCityOptions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressSection)
