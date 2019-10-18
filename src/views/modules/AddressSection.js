import React, { Component } from "react";
import PropTypes from "prop-types";
import { Translate, getActiveLanguage } from "react-localize-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { formValueSelector, Field, change } from "redux-form";
import axios from "axios";

import TextField from "../components/fields/TextField";
import { getCityOptions } from "../../redux/modules/AdminUnit";
import SelectField from "../components/fields/SelectField";
import { objectToArray } from "../../helpers";

class AddressSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      isCitiesFetching: false
    };
    this.fetchCities = this.fetchCities.bind(this);
    this.getCities = this.getCities.bind(this);
  }

  componentDidMount() {
    this.getCities();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.countryKey == this.props.countryKey) return;
    this.getCities();
  }

  fetchCities = url => {
    return axios.get(url);
  };

  getCities = () => {
    const { countryKey } = this.props;
    this.setState({ isCitiesFetching: true });

    // get current root url
    const currentLoc = window.location.href;
    const arrayCurrentLoc = currentLoc.split("/");
    arrayCurrentLoc.splice(arrayCurrentLoc.length - 2, 2);
    const rootURL = arrayCurrentLoc.join("/");

    return this.fetchCities(`${rootURL}/cities.json`).then(resp => {
      // debugger;
      const allCities = resp.data;
      const cities = allCities.filter(city => city.country === countryKey);
      if (cities && cities.length > 0) {
        const cityOptions = objectToArray(cities).reduce((options, city) => {
          options.push({
            value: city.name,
            label: city.name
          });
          return options;
        }, []);
        this.setState({ cities: cityOptions });
      } else {
        this.setState({ cities: [] });
      }
      this.setState({ isCitiesFetching: false });
    });
  };

  render() {
    const {
      isEditable,
      getCityOptions,
      colorInverted,
      requiredFields
    } = this.props;
    const { cities, isCitiesFetching } = this.state;
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
            className="mb-4"
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
            className="mb-4"
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
            className="mb-2"
          />
        ]}
      </Translate>
    );
  }
}

AddressSection.defaultProps = {
  requiredFields: {}
};

AddressSection.propTypes = {
  // districtOptions: <PropTy></PropTy>pes.array.isRequired,
  isEditable: PropTypes.bool,
  changeFieldValue: PropTypes.func.isRequired,
  requiredFields: PropTypes.shape({
    street1: PropTypes.bool,
    street2: PropTypes.bool,
    city: PropTypes.bool,
    postalCode: PropTypes.bool
  }),
  countryKey: PropTypes.string
};

const mapStateToProps = (state, { formId }) => {
  const { loading, adminUnit, locale } = state,
    { cities, districts, wards } = adminUnit,
    selector = formValueSelector(formId),
    selectedCity = selector(state, "address.city"),
    isEnglish = getActiveLanguage(locale).code === "en",
    selectedCityObj = cities[selectedCity];

  return {
    cities,
    selectedCity
  };
};

const mapDispatchToProps = dispatch => ({
  changeFieldValue: bindActionCreators(change, dispatch),
  getCityOptions: bindActionCreators(getCityOptions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressSection);
