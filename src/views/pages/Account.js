import React, { Component } from "react"
import { connect } from "react-redux"
import { Translate } from "react-localize-redux"

import { fetchVouchers, loadingVouchersSelector } from "../../redux/modules/Voucher"
import { fetchMemberReward, loadingRewardSelector } from "../../redux/modules/Account"
import { objectToArray, isEmptyObj } from "../../helpers"

import MyRewards from "../modules/MyRewards"
import MyAccount from "../modules/MyAccount"
import { ACTIVE } from "../../constants/voucherStatus"
import { bindActionCreators } from "redux"

class Account extends Component {
	componentDidMount() {
		this.props.fetchVouchers(ACTIVE)
		this.props.fetchMemberReward()
	}

	render() {
		const {
			vouchers,
			account,
			isFetchingVoucher,
			isFetchingAccount,
			accountErrorMessage,
			vouchersErrorMessage,
		} = this.props
		return (
			<div id="my-account-page" className="my-4 my-lg-5">
				<div className="row justify-content-center">
					<div className="col-12 col-xl-11">
						{/* --- Page Content starts here --- */}
						<section className="section-my-account">
							<h4 className="mb-3">
								<Translate id="myAccount._title" />
							</h4>
							<MyAccount
								account={account}
								isFetching={isFetchingAccount}
								errorMessage={accountErrorMessage}
							/>
						</section>
						<section className="section-my-reward">
							<h4 className="mb-3 text-center">
								<Translate id="myRewards._title" />
							</h4>
							<MyRewards
								vouchers={vouchers}
								isFetching={isFetchingVoucher}
								errorMessage={vouchersErrorMessage}
							/>
						</section>
						{/* --- Page Content ends here --- */}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ voucher, account, loading }) => ({
	vouchers: objectToArray(voucher.data),
	isFetchingVoucher: loadingVouchersSelector({ loading }),
	vouchersErrorMessage: voucher.errorMessage,

	account: account.data,
	isFetchingAccount: loadingRewardSelector({ loading }) || isEmptyObj(account.data),
	accountErrorMessage: account.errorMessage,
})

const mapDispatchToProps = (dispatch) => ({
	fetchVouchers: bindActionCreators(fetchVouchers, dispatch),
	fetchMemberReward: bindActionCreators(fetchMemberReward, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
