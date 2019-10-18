import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getTranslate } from "react-localize-redux"
import { bindActionCreators } from "redux"

import SideNavbar from "../layout/SideNavbar"
// import BGImage from "../../images/backgrounds/bg.svg"
import IdleMonitor from "../components/shared/IdleMonitor"
import { showMessageModal, destroyModal } from "../../redux/modules/Modal"
import { logout, refreshToken } from "../../redux/modules/Auth"
import { timeoutConfigs } from "../../configs"

const { warnTimeoutMins, logoutTimeoutMins, refreshIntervalMins } = timeoutConfigs

class PrivateLayout extends Component {
	constructor(props) {
		super(props)
		this.handlewWarn = this.handlewWarn.bind(this)
		this.handleRefreshInterval = this.handleRefreshInterval.bind(this)
		this.handlewExpired = this.handlewExpired.bind(this)
	}

	handleRefreshInterval = () => {
		this.props.refreshToken()
	}

	handlewWarn = () => {
		const { showMessageModal, destroyModal, refreshToken, translate } = this.props
		//destroy any existing modal
		destroyModal().then(() =>
			//show warning timeout
			showMessageModal(translate("idleMonitor.warnMessage", { time: 2 }), () =>
				refreshToken()
			)
		)
	}

	handlewExpired = () => {
		const { showMessageModal, logout, destroyModal, translate } = this.props

		//destroy any existing modal
		destroyModal()
			.then(() =>
				//show session timeout message
				showMessageModal(translate("idleMonitor.sessionExpired"))
			)
			.then(() => logout())
	}

	render() {
		return (
			<div className="body-content">
				<SideNavbar {...this.props} />
				<div className="site-content">{this.props.children}</div>

				{!this.props.keepLogin && (
					<IdleMonitor
						onWarn={this.handlewWarn}
						onExpired={this.handlewExpired}
						onRefreshInterval={this.handleRefreshInterval}
						warnTimeoutMins={warnTimeoutMins}
						expiredTimeoutMins={logoutTimeoutMins}
						refreshIntervalMins={refreshIntervalMins}
					/>
				)}
			</div>
		)
	}
}

PrivateLayout.propTypes = {
	location: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired,
	keepLogin: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ locale }) => ({
	translate: getTranslate(locale),
})

const mapDispatchToProps = (dispatch) => ({
	showMessageModal: bindActionCreators(showMessageModal, dispatch),
	destroyModal: bindActionCreators(destroyModal, dispatch),
	logout: bindActionCreators(logout, dispatch),
	refreshToken: bindActionCreators(refreshToken, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateLayout)
