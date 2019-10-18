import React, { Component } from "react"
import PropTypes from "prop-types"
import Slider from "react-slick"
import Spinner from "../components/common/Spinner"

class CardListSlider extends Component {
	constructor(props) {
		super(props)

		this.calculateMaxWidth = this.calculateMaxWidth.bind(this)
		this.renderCard = this.renderCard.bind(this)
	}

	/**
	 * Add event listener
	 */
	componentDidMount() {
		this.calculateMaxWidth()
		window.addEventListener("resize", this.calculateMaxWidth)
	}

	/**
	 * Remove event listener
	 */
	componentWillUnmount() {
		window.removeEventListener("resize", this.calculateMaxWidth)
	}

	calculateMaxWidth = () => {
		let wBody = document.getElementById("card-design-slider").offsetWidth
		let sliderMaxWidth = wBody // - wSidebar
		let allSliders = document.getElementsByClassName("slick-slider")

		if (allSliders.length > 0) {
			let slider = allSliders[0]

			slider.style.maxWidth = sliderMaxWidth + "px"
		}
	}

	renderCard = (card, index) => {
		return (
			<div key={index} className="card-item">
				<div className="card-img">
					<img src={card.card_img} alt="" />
				</div>
				<div className="card-info text-center">
					<div
						className="card-title"
						dangerouslySetInnerHTML={{ __html: card.card_title }}
					/>
					<div
						className="font-small mt-2"
						dangerouslySetInnerHTML={{ __html: card.card_desc }}
					/>
				</div>
			</div>
		)
	}

	render() {
		const { cards, isFetching, errorMessage } = this.props

		if (isFetching)
			return (
				<div className="text-center my-3">
					<Spinner />
				</div>
			)

		if (errorMessage) return <div className="text-center my-3">{errorMessage}</div>

		let settings = {
			infinite: false,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 3,
			lazyload: "ondemand",
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		}

		return (
			<div className="card-list-slider" id="cardListSlider">
				<Slider {...settings}>
					{cards.map((card, index) => this.renderCard(card, index))}
				</Slider>
			</div>
		)
	}
}

CardListSlider.defaultProps = {
	cards: [],
	errorMessage: "",
	isFetching: false,
}

CardListSlider.propTypes = {
	cards: PropTypes.array.isRequired,
	errorMessage: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
}

export default CardListSlider
