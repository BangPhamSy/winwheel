import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Translate } from "react-localize-redux";

import { fetchCards, loadingCardsSelector } from "../../redux/modules/Card";
import { objectToArray } from "../../helpers/utility";

import CardList from "../modules/CardList";
import Wrapper from "../components/common/Wrapper";
import ic_spin from "../../images/icon_spin.png";
import { showMessageModal } from "../../redux/modules/Modal";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-30%",
    transform: "translate(-50%, -50%)",
    borderRadius: "7px"
  },
  overlay: {
    opacity: 1,
    background: "rgba(66, 63, 63, 0.75)"
  }
};

const fetchPrize = [
  {
    name: "prize10",
    numOfPrizes: 1,
    colorPrize: "#ee1c24"
  },
  {
    name: "prize80",
    numOfPrizes: 1,
    colorPrize: "#3cb878"
  },
  {
    name: "prize3",
    numOfPrizes: 1,
    colorPrize: "#f6989d"
  },
  {
    name: "prize20",
    numOfPrizes: 1,
    colorPrize: "#aaa"
  },
  {
    name: "prize40",
    numOfPrizes: 1,
    colorPrize: "#00aef0"
  },
  {
    name: "prize30",
    numOfPrizes: 1,
    colorPrize: "#f26522"
  },
  {
    name: "prize9",
    numOfPrizes: 500,
    colorPrize: "#e70697"
  },
  {
    name: "prize5",
    numOfPrizes: 1,
    colorPrize: "#fff200"
  },
  {
    name: "prize150",
    numOfPrizes: 2,
    colorPrize: "aqua"
  },
  {
    name: "prize110",
    numOfPrizes: 2,
    colorPrize: "green"
  },
  {
    name: "prize130",
    numOfPrizes: 2,
    colorPrize: "blue"
  },
  {
    name: "prize200",
    numOfPrizes: 2,
    colorPrize: "violet"
  }
];

const DURATION = 1;
const SPIN = 3;
const TIME_STOP = 1000;

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      isDisableBtn: false,
      isShowAlert: false,
      prize: "",
      dataPrize: [],
      rangePrize: []
    };
  }
  
  async componentDidMount() {
    let rangePrize = await this.getRangePrize();
    await this.setState({
      dataPrize: fetchPrize,
      rangePrize: rangePrize
    });
    const SEGMENTS = this.getSegmentWheel();
    const NUMSEGMENTS = SEGMENTS.length;
    this.theWheel = new window.Winwheel({
      canvasId: "myCanvas",
      responsive: true,
      textFontSize: 18,
      textOrientation: "curved",
      textAlignment: "outer",
      numSegments: NUMSEGMENTS,
      pointerAngle: 0,
      lineWidth: 0,
      textFillStyle: "#FFFFFF",
      textFontWeight: "bold",
      strokeStyle: "#FFFFFF",
      textFontFamily: "Times",
      segments: SEGMENTS,
      animation: {
        type: "spinToStop",
        duration: DURATION,
        spins: SPIN,
        callbackFinished: "",
        // 'callbackSound'    : playSound,   // Called when the tick sound is to be played.
        soundTrigger: "pin"
      }
    });
    await this.getNamePrize();
  }
  getNamePrize = () => {
    let arrPrize = fetchPrize.map((prize, index) => {
      return prize.name;
    });
    this.setState({ arrPrize: arrPrize });
  };
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  getSegmentWheel = () => {
    const segment = [];
    for (let i = 0; i < fetchPrize.length; i++) {
      // let color;
      // for(let j=0; j< fetchPrize.length;j++){
      //   color = this.getRandomColor()
      // }
      // console.log('color:',color)
      segment.push({
        fillStyle: fetchPrize[i].colorPrize,
        text: fetchPrize[i].name
      });
    }
    console.log("color:", segment);
    return segment;
  };

  startSpin = () => {
    this.setState({ isDisableBtn: true });
    this.resetSpin();
    this.getPrizeRandom();
    setTimeout(() => {
      let winningSegment = this.theWheel.getIndicatedSegment();
      console.log("aaa1:", winningSegment);
      this.setState({
        isDisableBtn: false,
        isShowAlert: true,
        prize: winningSegment.text
      });
    }, TIME_STOP);
  };
  getRangePrize = () => {
    let anglePrizeItem = 360 / fetchPrize.length;
    let angleRangePrize = [];
    for (let i = 0; i < fetchPrize.length; i++) {
      let range = anglePrizeItem * i;
      angleRangePrize.push({ name: fetchPrize[i].name, range: range });
    }
    return angleRangePrize;
  };
  getPrizeRandom = () => {
    const { dataPrize, rangePrize } = this.state;
    let anglePrizeItem = 360 / fetchPrize.length;
    let angleRangePrize = rangePrize;
    let prizeRandom =
      angleRangePrize[Math.floor(Math.random() * angleRangePrize.length)];
    let stopAt =
      Math.floor(Math.random() * (anglePrizeItem + 1)) + prizeRandom.range;
    let searchPrize = dataPrize.find(prize => prize.name === prizeRandom.name);
    if (searchPrize) {
      let prizeIndex = dataPrize.findIndex(
        prize => prize.name === prizeRandom.name
      );
      dataPrize[prizeIndex].numOfPrizes--;
      if (dataPrize[prizeIndex].numOfPrizes == 0) {
        dataPrize.splice(prizeIndex, 1);
        let rangeIndex = angleRangePrize.findIndex(
          prize => prize.name === prizeRandom.name
        );
        angleRangePrize.splice(rangeIndex, 1);
      }
    }
    this.theWheel.animation.stopAngle = stopAt;
    this.theWheel.startAnimation();
  };

  resetSpin() {
    this.theWheel.stopAnimation(false);
    this.theWheel.rotationAngle = 0;
    this.theWheel.draw();
  }
  handleCancelClick = () => {
    this.setState({ isShowAlert: false });
  };

  renderAlert = () => {
    return (
      <Modal
        isOpen={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="text-center">
          <div className="modal-header">
            <div className="modal-close-mark">
              <button
                style={{ border: 0 }}
                className="btn-close-mark"
                onClick={this.handleCancelClick}
              />
            </div>
          </div>
          <p style={{ color: "#FA5858", fontWeight: "bold" }}>
            Congratulations!
          </p>
          <p style={{ fontWeight: "bold" }}>You've won {this.state.prize}</p>
          <p style={{ padding: 10, fontSize: 12, color: "#ccc" }}>
            You can check out your voucher under My Wallet section
          </p>
        </div>
      </Modal>
    );
  };

  render() {
    const {
      activeCards,
      suspendedCards,
      isFetching,
      errorMessage
    } = this.props;
    return (
      <Wrapper errorMessage={errorMessage} isFetching={isFetching}>
        <div id="my-reward-cards" className="my-4 my-lg-5">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-11">
              {this.state.isShowAlert && this.renderAlert()}
              <section
                id="myCards"
                className="row no-gutters justify-content-center"
              >
                <div className="col-12 card-list">
                  <h4 className="mb-3">SPIN THE WHEEL</h4>
                  <div className="title-sprint-win pl-4">
                    Tap to spin & stand a chance to win up to $80 worth of
                    dining vouchers!
                  </div>
                  {/* <div className="prize d-flex">
                    <p>Số giải còn lại: </p>
                    <p style={{ paddingLeft: 10, paddingRight: 10 }}>
                      $80: {this.state.countPrize80}
                    </p>
                    <p style={{ paddingRight: 10 }}>
                      $40: {this.state.countPrize40}
                    </p>
                    <p style={{ paddingRight: 10 }}>
                      $30: {this.state.countPrize30}
                    </p>
                  </div> */}
                  <div className="wheel-win pt-4">
                    <div className="col-12">
                      <div className="container-wheel text-center">
                        <canvas
                          id="myCanvas"
                          width="800"
                          height="500"
                          data-responsiveMinWidth="180"
                          data-responsiveScaleHeight="true"
                          // data-responsiveMargin="40"
                        ></canvas>
                      </div>
                      <div
                        className="btn-spin"
                        onClick={!this.state.isDisableBtn && this.startSpin}
                      >
                        <img src={ic_spin} className="ic-spin" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

Cards.propTypes = {
  cards: PropTypes.array,
  errorMessage: PropTypes.string,
  isFetching: PropTypes.bool
};

const mapStateToProps = ({ card, loading }) => {
  const cards = objectToArray(card.data).sort(card => !card.isDefault);
  return {
    activeCards: cards.filter(card => card.isActive),
    suspendedCards: cards.filter(card => !card.isActive && !card.isRemoved),
    isFetching: loadingCardsSelector({ loading }),
    errorMessage: card.errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCards: bindActionCreators(fetchCards, dispatch),
  showMessageModal: bindActionCreators(showMessageModal, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);
