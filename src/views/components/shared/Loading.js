import React from "react"

const Loading = (props) => {
	if (props.error) {
		return (
			<div className="w-100 text-center py-5">
				New content is available; please refresh. <br />
				<button
					className="btn mt-4"
					onClick={() => (window.location.href = window.location.href)}>
					Refresh
				</button>
			</div>
		)
	} else if (props.timedOut) {
		return (
			<div className="w-100 text-center py-5">
				Taking a long time...<br />
				<button
					className="btn mt-4"
					onClick={() => (window.location.href = window.location.href)}>
					Retry
				</button>
			</div>
		)
	} else if (props.pastDelay) {
		return <div className="w-100 text-center py-5">Loading...</div>
	} else {
		return null
	}
}
export default Loading
