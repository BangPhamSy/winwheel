import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Translate, getActiveLanguage } from "react-localize-redux"

class ForgotEmail extends React.Component {
	render() {
		return (
			<div id="forgotEmail" className="py-4 py-lg-5">
				<div className="row justify-content-center">
					<div className="col-12 col-xl-11">
						{/* --- Page Content starts here --- */}

						<div className="row justify-content-center">
							<div className="col-12 col-xl-8 col-lg-10">
								<h4 className="mb-3">
									<Translate id="forgotEmail._title" />
								</h4>

								<div className="box font-sub p-md-4 p-3 mt-4">
									<Translate id="forgotEmail._message" />
								</div>
							</div>
						</div>

						{/* --- Page Content ends here --- */}
					</div>
				</div>
			</div>
		)
	}
}

ForgotEmail.propTypes = {
	currentLanguage: PropTypes.string.isRequired,
}

const mapStateToProps = ({ auth, locale }) => ({
	currentLanguage: getActiveLanguage(locale).code,
})

export default connect(mapStateToProps)(ForgotEmail)
