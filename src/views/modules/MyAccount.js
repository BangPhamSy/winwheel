import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Translate, getActiveLanguage } from "react-localize-redux"
import classNames from "classnames"

import CircleChart from "../components/common/CircleChart"
import Wrapper from "../components/common/Wrapper"
import { GOLD, GREEN } from "../../constants"
import { noOfStarsForFreeDrink } from "../../configs"

class MyAccount extends Component {
	render() {
		const { account, isFetching, errorMessage, currentLanguage } = this.props
		const noOfRemainingStarsToFeeDrink =
			noOfStarsForFreeDrink - account.pointsBAL % noOfStarsForFreeDrink

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				{!isFetching && (
					<div className="row justify-content-center">
						<div className="col-12 col-xl-6 col-lg-8 col-md-8 col-sm-9">
							<div className="box p-3">
								<div className="row align-items-center text-center font-small color-text-2">
									<div className="col-6 box-divider">
										<h1 className="fw-bolder color-text-1">
											{account.cmcEarnedPoints.formatPoints(0)}
										</h1>
										<p>
											<Translate id="myAccount.copy._totalStarEarner" />
										</p>
										<p
											className={classNames(
												"fw-bolder",
												{
													"color-secondary":
														account.tierCode === GOLD,
												},
												{
													"color-primary":
														account.tierCode === GREEN,
												}
											)}>
											{currentLanguage === "en" && (
												<span>
													<Translate
														id={`myAccount.copy._xLevel_${
															account.tierCode
														}`}
														data={{
															tierCode: account.tierCode,
														}}
													/>
													<Translate id="myAccount.copy._xLevel_tier" />
												</span>
											)}
											{currentLanguage === "vi" && (
												<span>
													<Translate id="myAccount.copy._xLevel_tier" />
													<Translate
														id={`myAccount.copy._xLevel_${
															account.tierCode
														}`}
														data={{
															tierCode: account.tierCode,
														}}
													/>
												</span>
											)}
										</p>
										<div>
											<Translate
												id="myAccount.copy._anniversaryDate"
												data={{ date: account.expiryDate }}
											/>
										</div>
									</div>
									<div className="col-6">
										<div className="row justify-content-center">
											<div className="reward-progress-box mb-2 col-lg-7 col-md-6 col-sm-6 col-8">
												{account.tierCode === GOLD && (
													<CircleChart
														valueTo={account.pointsBAL}
														maxValue={
															account.pointsToNextTier +
															account.pointsBAL
														}
														colorCode="#c0a65c"
													/>
												)}
												{account.tierCode !== GOLD && (
													<CircleChart
														valueTo={account.pointsBAL}
														maxValue={
															account.pointsToNextTier +
															account.pointsBAL
														}
														colorCode="#02a860"
													/>
												)}
											</div>
											{account.tierCode === GOLD && (
												<div className="col-12 mb-1">
													<Translate
														id="myAccount.copy._xStarsUntilFreeDrink"
														data={{
															stars: noOfRemainingStarsToFeeDrink.formatPoints(),
														}}
													/>
												</div>
											)}

											<div className="col-12">
												{account.tierCode === GOLD && (
													<Translate
														id={
															account.pointsToNextTier === 0
																? "myAccount.copy._extendXLevel"
																: "myAccount.copy._xStarsToRetain"
														}
														data={{
															stars: account.pointsToNextTier.formatPoints(),
															nextTierCode:
																account.nextTierCode,
														}}
													/>
												)}
												{account.tierCode !== GOLD && (
													<Translate
														id="myAccount.copy._xStarsUntilReward"
														data={{
															stars: account.pointsToNextTier.formatPoints(),
															nextTierCode:
																account.nextTierCode,
														}}
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<h5 className="my-3 fw-normal">
								<Translate
									id="myAccount.copy._asOfXDate"
									data={{ date: account.currentDate }}
								/>
							</h5>
						</div>
					</div>
				)}
			</Wrapper>
		)
	}
}

MyAccount.propTypes = {
	account: PropTypes.object.isRequired,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ locale }) => ({
	currentLanguage: getActiveLanguage(locale).code,
})

export default connect(mapStateToProps)(MyAccount)
