import React, { Component } from "react"
import PropTypes from "prop-types"
import { Translate } from "react-localize-redux"
import LazyLoad from "react-lazyload"

import Wrapper from "../components/common/Wrapper"

class MyRewards extends Component {
	renderRow = ({ validTo, name, voucherTypeDescription, imageLink }, index) => (
		<div key={index} className="row no-gutters table-row">
			<div className="table-col table-col-icon col-12 col-sm-9">
				<div className="col-icon">
					<LazyLoad height={60}>
						<img src={imageLink} alt={name} className="reward-icon" />
					</LazyLoad>
				</div>
				<div className="col-text">
					<div className="fw-bolder rewards-title">{name}</div>
					<div className="mt-1 rewards-description">
						{voucherTypeDescription}
					</div>

					<div className="mt-3 d-block d-sm-none">
						<div className="fw-bolder">
							<Translate id="myRewards.header._validUntil" />:
						</div>
						<div>
							<time dateTime={validTo}>{validTo}</time>
						</div>
					</div>
				</div>
			</div>
			<div className="table-col d-none d-sm-block col-4 col-sm-3 text-center">
				<time dateTime={validTo}>{validTo}</time>
			</div>
		</div>
	)

	render() {
		const { vouchers, isFetching, errorMessage } = this.props

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<Translate>
					{(translate, activeLanguage) => (
						<div className="box p-2">
							<div className="table table-rewards">
								<div className="row no-gutters table-row table-header">
									<div className="table-col col-12 col-sm-9">
										<Translate id="myRewards.header._rewards" />
									</div>
									<div className="table-col d-none d-sm-block col-sm-3 text-center">
										<Translate id="myRewards.header._validUntil" />
									</div>
								</div>
								{vouchers.length <= 0 && (
									<div className="text-center py-2">
										{translate("myRewards.body._noAvailableRecord")}
									</div>
								)}
								{vouchers.length > 0 &&
									vouchers.map((voucher, index) =>
										this.renderRow(voucher, index)
									)}
							</div>
						</div>
					)}
				</Translate>
			</Wrapper>
		)
	}
}

MyRewards.defaultProps = {
	vouchers: [],
	errorMessage: "",
	isFetching: false,
}

MyRewards.propTypes = {
	vouchers: PropTypes.array.isRequired,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
}

export default MyRewards
