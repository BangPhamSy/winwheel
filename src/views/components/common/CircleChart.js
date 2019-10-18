import React from "react"
import PropTypes from "prop-types"

const CircleChart = (props) => {
	const { valueTo, maxValue, colorCode } = props,
		value = valueTo / maxValue * (534 / 100) * 100

	return (
		<div className="circle-chart">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="circle-chart-svg"
				viewBox="0 0 180 180">
				<g>
					<circle
						className="circle-chart-background"
						stroke="#d9d9d9"
						strokeWidth="8"
						fill="none"
						cx="90"
						cy="90"
						r="85"
					/>
					<circle
						className="circle-chart-circle"
						stroke={colorCode}
						strokeWidth="8"
						strokeDasharray={`${value},534`}
						strokeLinecap="round"
						fill="none"
						cx="90"
						cy="90"
						r="85"
						transform="rotate(-90, 90, 90)"
					/>
					<g stroke="null" id="svg_8">
						<path
							stroke="null"
							strokeWidth="0"
							id="svg_7"
							fill={colorCode}
							d="m91.705678,48.524394l9.40895,29.214233l30.720087,-0.03305c1.278623,0 2.327965,1.016292 2.327965,2.294915c0,0.753952 -0.392471,1.441813 -0.950192,1.869394l0,0l-24.884674,17.999919l9.541161,29.212174c0.392471,1.212523 -0.262341,2.491145 -1.474863,2.885686c-0.787002,0.26233 -1.640113,0.0661 -2.228815,-0.425521l-24.657453,-18.001978l-24.818574,18.099059c-1.049332,0.753962 -2.491145,0.524671 -3.212057,-0.491611c-0.458571,-0.623821 -0.557721,-1.410833 -0.32843,-2.065635l-0.03305,0l9.5742,-29.212174l-24.884664,-18.001978c-1.049342,-0.753962 -1.278633,-2.195775 -0.524671,-3.214127c0.491621,-0.687852 1.245573,-1.016292 2.032585,-0.950192l30.556886,0.03305l9.442011,-29.214233c0.392471,-1.212523 1.671094,-1.869394 2.885686,-1.507913c0.753952,0.2644 1.276564,0.820062 1.507913,1.509983l0,0zm5.540022,32.22799l-7.737857,-24.031562l-7.770907,24.033621l0,0c-0.295391,0.950192 -1.179473,1.607063 -2.195765,1.607063l-25.246154,-0.035109l20.458014,14.787851l0,0c0.787012,0.590771 1.148492,1.607063 0.820062,2.590306l-7.834947,24.000582l20.360934,-14.851892c0.787012,-0.590771 1.902454,-0.623821 2.753486,-0.03305l20.391925,14.884942l-7.803957,-23.901432c-0.361491,-0.950192 -0.0661,-2.065635 0.787002,-2.689456c6.830358,-4.92928 13.660716,-9.858571 20.491075,-14.787851l-25.180054,0.03305c-1.014223,0.0661 -1.964415,-0.590771 -2.292856,-1.607063l0,0z"
						/>
					</g>
				</g>
			</svg>
		</div>
	)
}

CircleChart.defaultProps = {
	valueTo: 0,
	maxValue: 100,
}

CircleChart.propTypes = {
	valueTo: PropTypes.number.isRequired,
	maxValue: PropTypes.number,
}

export default CircleChart
