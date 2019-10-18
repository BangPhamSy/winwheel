import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import ContactForm, { formId } from "../modules/ContactForm"
import { Translate } from "react-localize-redux"
import { fetchProfile, loadingProfileSelector } from "../../redux/modules/Profile"
import { submitContactForm } from "../../redux/modules/Contact"
import Wrapper from "../components/common/Wrapper"
import { isEmptyObj } from "../../helpers"

const iniValues = {
	topic: "",
	email: "",
	firstName: "",
	lastName: "",
	dob: "01/01/2018",
	mobileNo: "",
	countryCode: "+84",
	message: "",
	attachment: undefined,
	attachmentName: "",
	privacyAgreement: undefined,
}

class ContactUs extends React.Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const { fetchProfile } = this.props
		fetchProfile()
	}

	handleSubmit = (values, dispatch) => {
		// submit
		dispatch(
			submitContactForm(
				{
					...values,
					attachment: values.attachment && values.attachment.content,
					attachmentName: values.attachment && values.attachment.name,
				},
				formId
			)
		)
	}

	render() {
		const { isFetching, errorMessage, initialValues } = this.props

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<div id="contact-us" className="my-4 my-lg-5">
					<div className="row justify-content-center">
						<div className="col-12 col-xl-11">
							{/* --- Page Content starts here --- */}

							<div className="row justify-content-center">
								<div className="col-12 col-xl-6 col-lg-7 col-md-8 col-sm-9 form-size-layout">
									<h4 className="mb-3">
										<Translate id="contact._title" />
									</h4>

									<h5 className="fw-bold mb-3">
										<Translate id="contact.subTitle._howCanWeHelp" />
									</h5>
									<Translate id="contact.form._description" />

									<div className="mt-3">
										<ContactForm
											initialValues={initialValues}
											onSubmit={this.handleSubmit}
										/>
									</div>
								</div>
							</div>

							{/* --- Page Content ends here --- */}
						</div>
					</div>
				</div>
			</Wrapper>
		)
	}
}
const mapStateToProps = ({ profile, loading }) => ({
	initialValues: profile.data
		? {
				...iniValues,
				email: profile.data.email,
				firstName: profile.data.firstName,
				lastName: profile.data.lastName,
				dob: profile.data.dob,
				mobileNo: profile.data.mobileNo,
				// countryCode: profile.data.countryCode,
		  }
		: iniValues,
	isFetching: loadingProfileSelector({ loading }) || isEmptyObj(profile.data),
	errorMessage: profile.errorMessage,
})

const mapDispatchToProps = (dispatch) => ({
	fetchProfile: bindActionCreators(fetchProfile, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)
