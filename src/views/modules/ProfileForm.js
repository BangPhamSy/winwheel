import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Field, reduxForm, FormSection, formValueSelector } from "redux-form";
import {
  Translate,
  getTranslate,
  getActiveLanguage
} from "react-localize-redux";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import Loadable from "react-loadable";

import {
  createValidator,
  email,
  required,
  integer,
  noVnChars,
  noSpecialChars,
  minLength
} from "../../helpers/validator";
import { objectToArray } from "../../helpers";
import { getSysCodeOptions } from "../../redux/modules/SystemCode";

import CheckField from "../components/fields/CheckField";
import Button from "../components/forms/Button";
import AsyncSelectField from "../components/fields/AsyncSelectField";
import Loading from "../components/shared/Loading";
import TextField from "../components/fields/TextField";
import DatePickerField from "../components/fields/DatePickerField";
import SelectField from "../components/fields/SelectField";
import MobileNumberField from "./MobileNumberField";
import CountryNames from "../../resources/general/CountryName";
import salutationOptions from "../../resources/general/SalutationOptions";

const AsyncAddressSection = Loadable({
  loader: () => import("./AddressSection"),
  loading: Loading
});

const validate = createValidator({
  email: [required, email],
  firstName: [required, noVnChars, noSpecialChars],
  lastName: [required, noVnChars, noSpecialChars],
  mobileNo: [required, minLength(8)],
  dob: [required],
  nationality: [required],
  countryOfResidence: [required]
  // countryCode: [required],
  // address: {
  // 	street1: [required, noVnChars],
  // },
});

const countryNameOptions = [];
Object.keys(CountryNames).map(key => {
  return countryNameOptions.push({
    value: CountryNames[key],
    label: CountryNames[key],
    code: key
  });
});

export const formId = "profile";

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryKey: "SG",
      nationalities: [],
      selectedNationalityString: "Singaporean",
      isNationalitiesFetching: false
    };
    this.handleSelectCountryOfResidence = this.handleSelectCountryOfResidence.bind(
      this
    );
    this.getNationalitites = this.getNationalitites.bind(this);
    this.fetchNationalities = this.fetchNationalities.bind(this);
  }

  componentDidMount() {
    const { initialValues } = this.props;
    if (initialValues) {
      let selectedCountry = Object.keys(CountryNames).find(
        code => CountryNames[code] === initialValues.countryOfResidence
      );
      if (selectedCountry) this.setState({ countryKey: selectedCountry });
      this.getNationalitites(initialValues.nationality);
    }
  }

  fetchNationalities = url => {
    return axios.get(url);
  };

  getNationalitites(selectedNationality) {
    this.setState({ isCitiesFetching: true });
    let selectedNationalityString = "Singaporean";

    // get current root url
    const currentLoc = window.location.href;
    const arrayCurrentLoc = currentLoc.split("/");
    arrayCurrentLoc.splice(arrayCurrentLoc.length - 2, 2);
    const rootURL = arrayCurrentLoc.join("/");

    return this.fetchNationalities(`${rootURL}/countries.json`).then(resp => {
      // debugger;
      const allCountries = resp.data;
      if (allCountries && allCountries.length > 0) {
        const countryOptions = objectToArray(allCountries).reduce(
          (options, country) => {
            options.push({
              value: country.alpha_2_code,
              label: country.nationality
            });
            return options;
          },
          []
        );
        const selectedCountryObj = allCountries.find(
          country => country.alpha_2_code == selectedNationality
        );
        selectedNationalityString = selectedCountryObj
          ? selectedCountryObj.nationality
          : "Singaporean";
        this.setState(prevState =>
          prevState.nationalities !== countryOptions
            ? { nationalities: countryOptions }
            : null
        );
        this.setState(prevState =>
          prevState.selectedNationalityString !== selectedNationalityString
            ? { selectedNationalityString }
            : null
        );
      } else {
        this.setState({ nationalities: [] });
      }
      this.setState({ isNationalitiesFetching: false });
    });
  }

  handleSelectCountryOfResidence(option) {
    const { countryKey } = this.state;
    const selectedOption = option ? option.code : null;
    if (selectedOption !== countryKey)
      this.setState({ countryKey: selectedOption });
  }
  render() {
    const {
      onEnableEdit,
      onDisableEdit,
      isEditable,
      error,
      handleSubmit,
      pristine,
      translate,
      submitting,
      currentLanguage,
      getSysCodeOptions,
      selectedSalutation,
      selectedNationality
    } = this.props;
    const {
      countryKey,
      nationalities,
      isNationalitiesFetching,
      selectedNationalityString
    } = this.state;
    return (
      <form onSubmit={handleSubmit} className="row form">
        <div className="col-12 mb-3">
          <h5 className="color-text-2">
            <Translate id="profile.subTitle.personalInformation" />
          </h5>
        </div>
        <div className="col-12">
          <Field
            name="salutation"
            type="text"
            parse={option => (option ? option.value : null)}
            options={salutationOptions}
            key={currentLanguage}
            searchable={false}
            disabled={submitting || !isEditable}
            component={SelectField}
            label={translate("_shared.form.label._salutation")}
            className="mb-4"
          />
          <Field
            name="firstName"
            type="text"
            autocomplete="given-name"
            required={true}
            disabled={submitting || !isEditable}
            component={TextField}
            label={translate("_shared.form.label._firstName")}
            className="mb-4"
          />
          <Field
            name="lastName"
            type="text"
            autocomplete="family-name"
            required={true}
            disabled={submitting || !isEditable}
            component={TextField}
            label={translate("_shared.form.label._lastName")}
            className="mb-4"
          />
          <Field
            name="email"
            type="email"
            autocomplete="email"
            required={true}
            disabled={true}
            component={TextField}
            label={!isEditable ? "Email Address" : "Email Address*"}
            className="mb-4"
          />
          <Field
            name="mobileNo"
            required={true}
            disabled={submitting || !isEditable}
            component={MobileNumberField}
            label={"Mobile Number: "}
            defaultCode={"+65"}
            buttonOtp={false}
          />
          <p className="textbox_label my-2">
            {!isEditable ? "Birthday" : "Birthday*"}
            <br />
            <br />
            Tell us your birthday to receive birthday treats on us!
          </p>
          <Field
            name="dob"
            required={true}
            disabled={submitting || !isEditable}
            component={DatePickerField}
            disabledYear={false}
            label={translate("_shared.form.label._dob")}
          />
          <Link
            to={`/${currentLanguage}/change-password`}
            className="link link-primary link-underline fw-bold"
          >
            {translate("profile.link.changePassword")}
          </Link>
        </div>

        <div className="col-12 mt-5 mb-3">
          <h5 className="color-text-2">
            <Translate id="profile.subTitle.addressInformation" />
          </h5>
        </div>
        <div className="col-12">
          <FormSection name="address">
            <AsyncAddressSection
              formId={formId}
              isEditable={isEditable && !submitting}
              countryKey={countryKey}
              requiredFields={{
                street1: false,
                street2: false,
                postalCode: false
              }}
            />
          </FormSection>
        </div>
        <div className="mt-4 mx-3">
          <Field
            id="tncAgree"
            name="tncAgree"
            type="checkbox"
            disabled={submitting || !isEditable}
            component={CheckField}
            label={
              <span className="textbox_label ml-2">
                I do not wish to receive news, special offers and more from the
                Company
              </span>
            }
            className="font-sub"
          />
        </div>

        {error && (
          <div className="col-12">
            <span className="form-error">{error}</span>
          </div>
        )}
        {isEditable && (
          <div className="col-12 text-left cta-buttons mt-4">
            <Button
              type="submit"
              className="btn btn-save"
              disabled={pristine}
              loading={submitting}
            >
              <Translate id={submitting ? "_Submitting" : "_saveChanges"} />
            </Button>
            <Button
              type="button"
              className="btn btn-edit"
              disabled={submitting}
              onClick={onDisableEdit}
            >
              <Translate id="_Cancel" />
            </Button>
          </div>
        )}
        {!isEditable && (
          <div className="col-12 text-left cta-buttons mt-4">
            <Button
              type="button"
              className="btn btn-edit"
              onClick={onEnableEdit}
            >
              <Translate id="_enableEdit" />
            </Button>
          </div>
        )}
        <ReactTooltip />
      </form>
    );
  }
}

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const selector = formValueSelector(formId);
const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code,
  selectedSalutation: selector(state, "salutation"),
  selectedNationality: selector(state, "nationality")
});

const mapDispatchToProps = dispatch => ({
  getSysCodeOptions: bindActionCreators(getSysCodeOptions, dispatch)
});

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProfileForm = reduxForm({
  form: formId, // a unique identifier for this form
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(ProfileForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);
