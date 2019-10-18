import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Translate } from "react-localize-redux";
import { reset } from "redux-form";

import {
  fetchProfileWithAddress,
  updateProfile,
  loadingProfileSelector
} from "../../redux/modules/Profile";
import { showMessageModal } from "../../redux/modules/Modal";
import { isEmptyObj } from "../../helpers";

import ProfileForm, { formId } from "../modules/ProfileForm";
import Wrapper from "../components/common/Wrapper";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isEditable: false };
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleEnableEdit = this.handleEnableEdit.bind(this)
  }

  componentDidMount() {}

  handleEnableEdit = () => {
    //enable edit
    this.setState({ isEditable: true });
  };

  handleDisableEdit = () => {
    const { reset } = this.props;
    //reset form
    reset(formId);
    //disable edit
    this.setState({ isEditable: false });
  };

  handleSubmit = (values, dispatch) => {
    // submit
    dispatch(updateProfile(values, formId)).then(resp => {
      const { successMessage } = resp;
      if (successMessage) dispatch(showMessageModal(successMessage));
      //disable edit
      this.setState({ isEditable: false });
    });
  };

  render() {
    const { isFetching, initialValues, errorMessage } = this.props;
    const mockedProfileInitValue = {
      salutation: "Mr",
      firstName: "Linda",
      lastName: "Lim",
      countryCode: "+65",
      mobileNo: "+65-87765327",
      email: "linda@gmail.com",
      dob: "01/02/1987",
      tncAgree: true,
      address: {
        street1: "Happy Road 123",
        street2: "Happy Road 123",
        postalCode: "6789"
      }
    };

    return (
      <Wrapper errorMessage={errorMessage} isFetching={isFetching}>
        <div id="my-profile" className="my-4 my-lg-5">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-11">
              {/* --- Page Content starts here --- */}

              <div className="row justify-content-center">
                <div className="col-12 col-xl-6 col-lg-7 col-md-8 col-sm-9 form-size-layout">
                  <h4 className="mb-3">
                    <Translate id="profile.title" />
                  </h4>

                  <ProfileForm
                    initialValues={mockedProfileInitValue}
                    onSubmit={this.handleSubmit}
                    isEditable={this.state.isEditable}
                    onEnableEdit={this.handleEnableEdit}
                    onDisableEdit={this.handleDisableEdit}
                  />
                </div>
              </div>

              {/* --- Page Content ends here --- */}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
const mapStateToProps = state => {
  const {
    profile: { data: initialValues, errorMessage },
    loading
  } = state;

  return {
    initialValues,
    // isFetching: loadingProfileSelector({ loading }) || isEmptyObj(initialValues),
    isFetching: false,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfileWithAddress: bindActionCreators(
    fetchProfileWithAddress,
    dispatch
  ),
  reset: bindActionCreators(reset, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
