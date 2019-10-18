import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchVouchers, loadingVouchersSelector } from "../../redux/modules/Voucher"
import MyRewards from "../modules/MyRewards"
import { Translate } from "react-localize-redux"
import { objectToArray } from "../../helpers"
import Wrapper from "../components/common/Wrapper"
import { ACTIVE } from "../../constants/voucherStatus"

class Rewards extends Component {
	componentDidMount() {
		this.props.fetchVouchers(ACTIVE)
	}

	render() {
		const { vouchers, isFetching, errorMessage } = this.props

		return (
			<Wrapper errorMessage={errorMessage} isFetching={isFetching}>
				<div id="my-rewards" className="my-4 my-lg-5">
					<div className="row justify-content-center">
						<div className="col-12 col-xl-11">
							<h4 className="mb-3">
								<Translate id="myRewards._title" />
							</h4>

							<MyRewards
								vouchers={vouchers}
								isFetching={isFetching}
								errorMessage={errorMessage}
							/>
						</div>
					</div>
				</div>
			</Wrapper>
		)
	}
}

const mapStateToProps = ({ voucher: { data, errorMessage }, loading }) => ({
	vouchers: objectToArray(data),
	isFetching: loadingVouchersSelector({ loading }),
	errorMessage,
})

const mapDispatchToProps = (dispatch) => ({
	fetchVouchers: () => dispatch(fetchVouchers(ACTIVE)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Rewards)
