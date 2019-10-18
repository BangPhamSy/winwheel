import React from "react"
import PropTypes from "prop-types"

const secondsPerMin = 60
const millisecondsPerSecond = 1000
const minute = millisecondsPerSecond * secondsPerMin

class IdleMonitor extends React.PureComponent {
	constructor(props) {
		super(props)

		this.events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"]

		this.warn = this.warn.bind(this)
		this.expired = this.expired.bind(this)
		this.start = this.start.bind(this)
		this.destroy = this.destroy.bind(this)
		this.resetTimeout = this.resetTimeout.bind(this)
	}

	clearTimeout() {
		if (this.warnTimeout) clearTimeout(this.warnTimeout)

		if (this.expiredTimeout) clearTimeout(this.expiredTimeout)
	}

	setTimeout() {
		const { warnTimeoutMins, expiredTimeoutMins } = this.props

		this.warnTimeout = setTimeout(this.warn, warnTimeoutMins * minute)

		this.expiredTimeout = setTimeout(this.expired, expiredTimeoutMins * minute)
	}

	setIntervalResetToken() {
		const { refreshIntervalMins } = this.props

		this.intervalRefreshToken = setInterval(() => {
			this.props.onRefreshInterval()
		}, refreshIntervalMins * minute)
	}

	clearIntervalResetToken() {
		if (this.intervalRefreshToken) clearInterval(this.intervalRefreshToken)
	}

	resetTimeout() {
		this.clearTimeout()
		this.setTimeout()
	}

	warn() {
		this.props.onWarn && this.props.onWarn()
	}

	expired() {
		this.props.onExpired && this.props.onExpired()
		this.destroy()
	}

	destroy() {
		this.clearTimeout()

		this.clearIntervalResetToken()

		for (var i in this.events) {
			window.removeEventListener(this.events[i], this.resetTimeout)
		}

		this.props.onDestroy && this.props.onDestroy()
	}

	start() {
		//start even listeners
		for (var i in this.events) {
			window.addEventListener(this.events[i], this.resetTimeout)
		}

		//set refresh token every 5 mins
		this.setIntervalResetToken()

		this.props.onStart && this.props.onStart()
	}

	componentDidMount() {
		console.log("IdleMonitor", "Started")
		this.start()
	}

	componentWillUnmount() {
		console.log("IdleMonitor", "Destroyed")
		this.destroy()
	}

	render() {
		return null
	}
}
IdleMonitor.defaultProps = {
	warnTimeoutMins: 10,
	expiredTimeoutMins: 15,
	refreshIntervalMins: 5,
}

IdleMonitor.propTypes = {
	onWarn: PropTypes.func,
	onExpired: PropTypes.func,
	onStart: PropTypes.func,
	onDetroy: PropTypes.func,
	onRefreshInterval: PropTypes.func,
	warnTimeoutMins: PropTypes.number.isRequired,
	expiredTimeoutMins: PropTypes.number.isRequired,
	refreshIntervalMins: PropTypes.number.isRequired,
}

export default IdleMonitor
