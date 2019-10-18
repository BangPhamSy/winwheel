import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Translate } from "react-localize-redux"
import { currency } from "../../../configs"
import classnames from "classnames"
import LazyLoad from "react-lazyload"
// import CardImg from "../../../images/abbott-card-front.jpeg"

const SingleCard = (props) => {
	const {
		langCode,
		card: {
			cardNo,
			printedName,
			// membershipPhoto,
			storedValueBalance,
			expiryDate,
		},
		isSelected,
		linkTo,
		showExpiryDate,
		showTransactionButton,
		className,
		onImageClick,
	} = props

	return (
		<div className={classnames("card-item", className, { selected: isSelected })}>
			{linkTo !== "transactions" && (
				<Link to={`/${langCode}/${linkTo}/${cardNo}`} className="card-img">
					<LazyLoad height={160}>
						<img src="https://via.placeholder.com/314x198" alt={printedName} />
					</LazyLoad>
				</Link>
			)}
			{linkTo === "transactions" && (
				<div onClick={() => onImageClick(cardNo)} className="card-img">
					<LazyLoad height={160}>
						<img src="https://via.placeholder.com/314x198" alt={printedName} />
					</LazyLoad>
				</div>
			)}
			<div className="card-info mb-3">
				{/* <div className="card-title">{printedName}&nbsp;</div> */}
				<div className="card-number">{`${cardNo}`}</div>
			</div>
			<div className="card-value">
				<div>BALANCE</div>
				<div className="value">
					<Translate
						id="_currencyBalance"
						data={{
							currency: currency,
							balance: storedValueBalance.formatMoney(2),
						}}
					/>
				</div>
				{/* {newValueBalance != null && (
					<span>
						<div>
							<Translate id="cardDetails.newValue" />:
						</div>
						<div className="value">
							<Translate
								id="_currencyBalance"
								data={{
									currency: currency,
									balance: newValueBalance.formatMoney(2),
								}}
							/>
						</div>
					</span>
				)} */}
			</div>
			{showExpiryDate && (
				<div className="card-exp">
					<div className="card-number">{`Expiry Date: ${expiryDate &&
						expiryDate.split(" ")[0]}`}</div>
				</div>
			)}
			{showTransactionButton && (
				<div className="view-transactions">
					<Link
						to={{
							pathname: `/${langCode}/transactions/`,
							state: { cardNo: cardNo },
						}}>
						View Transactions
					</Link>
				</div>
			)}
			{/* <div
				className={classnames("card-default color-primary", {
					"d-none": isDefault !== true,
				})}>
				<Translate id="cardDetails.defaultCard" />
			</div> */}
		</div>
	)
}

SingleCard.defaultProps = {
	linkTo: "cards",
	showTransactionButton: false,
}

SingleCard.propTypes = {
	langCode: PropTypes.string.isRequired,
	card: PropTypes.shape({
		cardNo: PropTypes.string.isRequired,
		printedName: PropTypes.string.isRequired,
		membershipPhoto: PropTypes.string,
		storedValueBalance: PropTypes.number.isRequired,
		isDefault: PropTypes.bool.isRequired,
	}),
	showTransactionButton: PropTypes.bool,
	isSelected: PropTypes.bool,
	linkTo: PropTypes.string,
}

export default SingleCard
