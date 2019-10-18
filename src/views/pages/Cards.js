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
import xoso from "./xoso.mp3";
import reoho from "./reoho.mp3";

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

const DURATION = 20;
const SPIN = 40;
const TIME_STOP = 20000;
const ARR_PRIZE = [
  "prize1",
  "prize2",
  "prize3",
  "prize4",
  "prize5",
  "prize6",
  "prize7",
  "prize8",
  "prize9",
  "prize10"
];
const PRIZE1 = 1;
const PRIZE2 = 1;
const PRIZE3 = 1;
const PRIZE4 = 1;
const PRIZE5 = 1;
const PRIZE6 = 1;
const PRIZE7 = 1;
const PRIZE8 = 1;
const PRIZE9 = 1;
const PRIZE10 = 1;
const audio = new Audio(xoso);
const soundEnd = new Audio(reoho);

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      isDisableBtn: false,
      isShowAlert: false,
      prize: "",
      countPrize1: PRIZE1,
      countPrize2: PRIZE2,
      countPrize3: PRIZE3,
      countPrize4: PRIZE4,
      countPrize5: PRIZE5,
      countPrize6: PRIZE6,
      countPrize7: PRIZE7,
      countPrize8: PRIZE8,
      countPrize9: PRIZE9,
      countPrize10: PRIZE10,
      arrPrize: []
    };
  }
  componentDidMount() {
    this.setState({ arrPrize: ARR_PRIZE });
    this.theWheel = new window.Winwheel({
      canvasId: "myCanvas",
      responsive: true,
      textFontSize: 22,
      textOrientation: "curved",
      textAlignment: "outer",
      textMargin: 15,
      numSegments: 10,
      pointerAngle: 0,
      lineWidth: 0,
      textFillStyle: "#FFFFFF",
      textFontWeight: "bold",
      strokeStyle: "#FFFFFF",
      textFontFamily: "Courier",
      segments: [
        { fillStyle: "#ee1c24", text: "Quà \n tặng \n 1" },
        { fillStyle: "#3cb878", text: "Quà \n tặng \n 2" },
        { fillStyle: "#f6989d", text: "Quà \n tặng \n 3" },
        { fillStyle: "#aaa", text: "Hát \n một\n bài" },
        { fillStyle: "#00aef0", text: "Quà \n tặng \n 5" },
        { fillStyle: "#f26522", text: "Quà \n tặng \n 6" },
        { fillStyle: "#e70697", text: "Quà \n tặng \n 7" },
        { fillStyle: "#aaa", text: "Hát \n một \n bài" },
        { fillStyle: "#00aef0", text: "Quà \n tặng \n 9" },
        { fillStyle: "#fff200", text: "Quà \n tặng \n 10" }
      ],
      animation: {
        type: "spinToStop",
        duration: DURATION,
        spins: SPIN,
        callbackFinished: "",
        callbackSound: "", // Called when the tick sound is to be played.
        soundTrigger: "pin"
      }
    });
  }
  playSound = audio => {
    audio.play();
  };
  turnOffSound = audio => {
    audio.pause();
  };
  startSpin = async () => {
    this.playSound(audio);
    this.setState({ isDisableBtn: true });
    this.resetSpin();
    this.calculatePrize();
    setTimeout(() => {
      let winningSegment = this.theWheel.getIndicatedSegment();
      this.setState({
        isDisableBtn: false,
        isShowAlert: true,
        prize: winningSegment.text
      });
      this.turnOffSound(audio);
      this.playSound(soundEnd);
      setTimeout(() => {
        this.turnOffSound(soundEnd);
      }, 5000);
    }, TIME_STOP);
  };
  calculatePrize() {
    let stopAt;
    let {
      countPrize1,
      countPrize2,
      countPrize3,
      countPrize4,
      countPrize5,
      countPrize6,
      countPrize7,
      countPrize8,
      countPrize9,
      countPrize10,
      arrPrize
    } = this.state;
    // let prize10 = Math.floor(Math.random() * 46);
    // let prize80 = Math.floor(Math.random() * 46) + 45;
    // let prize3 = Math.floor(Math.random() * 46) + 90;
    // let prize20 = Math.floor(Math.random() * 46) + 135;
    // let prize40 = Math.floor(Math.random() * 46) + 180;
    // let prize30 = Math.floor(Math.random() * 46) + 225;
    // let prize9 = Math.floor(Math.random() * 46) + 270;
    // let prize5 = Math.floor(Math.random() * 46) + 315;
    let prize1 = Math.floor(Math.random() * 37);
    let prize2 = Math.floor(Math.random() * 37) + 36;
    let prize3 = Math.floor(Math.random() * 37) + 72;
    let prize4 = Math.floor(Math.random() * 37) + 108;
    let prize5 = Math.floor(Math.random() * 37) + 144;
    let prize6 = Math.floor(Math.random() * 37) + 180;
    let prize7 = Math.floor(Math.random() * 37) + 216;
    let prize8 = Math.floor(Math.random() * 37) + 252;
    let prize9 = Math.floor(Math.random() * 37) + 288;
    let prize10 = Math.floor(Math.random() * 37) + 324;

    // ['prize10', 'prize80', 'prize3', 'prize20', 'prize40', 'prize30', 'prize9', 'prize5'];

    let prizeRandom = arrPrize[Math.floor(Math.random() * arrPrize.length)];
    console.log("prize:", prizeRandom);

    switch (prizeRandom) {
      case "prize1":
        stopAt = prize1;
        break;
      case "prize2":
        stopAt = prize2;
        break;
      case "prize3":
        stopAt = prize3;
        break;
      case "prize4":
        stopAt = prize4;
        break;
      case "prize5":
        stopAt = prize5;
        break;
      case "prize6":
        stopAt = prize6;
        break;
      case "prize7":
        stopAt = prize7;
        break;
      case "prize8":
        stopAt = prize8;
        break;
      case "prize9":
        stopAt = prize9;
        break;
      case "prize10":
        stopAt = prize10;
        break;
    }
    console.log("prize:", stopAt);
    // if (countPrize1 == 0) {
    //   if (arrPrize.indexOf("prize1") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize1"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }

    // if (countPrize2 == 0) {
    //   if (arrPrize.indexOf("prize2") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize2"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }

    // if (countPrize3 == 0) {
    //   if (arrPrize.indexOf("prize3") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize3"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }
    // //['prize10', 'prize80', 'prize3', 'prize20', 'prize40', 'prize30', 'prize9', 'prize5'];
    // if (countPrize4 == 0) {
    //   if (arrPrize.indexOf("prize4") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize4"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }

    // if (countPrize5 == 0) {
    //   if (arrPrize.indexOf("prize5") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize5"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }

    // if (countPrize6 == 0) {
    //   if (arrPrize.indexOf("prize6") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize6"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }

    // if (countPrize7 == 0) {
    //   if (arrPrize.indexOf("prize7") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize7"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }
    // if (countPrize8 == 0) {
    //   if (arrPrize.indexOf("prize8") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize8"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }

    // if (countPrize9 == 0) {
    //   if (arrPrize.indexOf("prize9") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize9"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }
    // if (countPrize10 == 0) {
    //   if (arrPrize.indexOf("prize10") != -1) {
    //     arrPrize.splice(arrPrize.indexOf("prize10"), 1);
    //     this.setState({
    //       arrPrize: arrPrize
    //     });
    //   }
    // }

    //45-90 -prize80
    //180-225 - prize40
    //225-270-prize30

    const isPrize1 = stopAt > 0 && stopAt <= 36;
    const isPrize2 = stopAt > 36 && stopAt <= 72;
    const isPrize3 = stopAt > 72 && stopAt <= 108;
    const isPrize4 = stopAt > 108 && stopAt <= 144;
    const isPrize5 = stopAt > 144 && stopAt <= 180;
    const isPrize6 = stopAt > 180 && stopAt <= 216;
    const isPrize7 = stopAt > 216 && stopAt <= 252;
    const isPrize8 = stopAt > 252 && stopAt <= 288;
    const isPrize9 = stopAt > 288 && stopAt <= 324;
    const isPrize10 = stopAt > 324 && stopAt <= 360;

    if (isPrize1) {
      // if (arrPrize.indexOf("prize1") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize1"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize1: countPrize1 - 1 });
    }
    if (isPrize2) {
      // if (arrPrize.indexOf("prize2") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize2"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize2: countPrize2 - 1 });
    }
    if (isPrize3) {
      // if (arrPrize.indexOf("prize3") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize3"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize3: countPrize3 - 1 });
    }
    if (isPrize4) {
      // if (arrPrize.indexOf("prize4") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize4"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize4: countPrize4 - 1 });
    }
    if (isPrize5) {
      // if (arrPrize.indexOf("prize5") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize5"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize5: countPrize5 - 1 });
    }
    if (isPrize6) {
      // if (arrPrize.indexOf("prize6") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize6"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize6: countPrize6 - 1 });
    }
    if (isPrize7) {
      // if (arrPrize.indexOf("prize7") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize7"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize7: countPrize7 - 1 });
    }
    if (isPrize8) {
      // if (arrPrize.indexOf("prize8") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize8"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize8: countPrize8 - 1 });
    }
    if (isPrize9) {
      // if (arrPrize.indexOf("prize9") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize9"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize9: countPrize9 - 1 });
    }
    if (isPrize10) {
      // if (arrPrize.indexOf("prize10") != -1) {
      arrPrize.splice(arrPrize.indexOf("prize10"), 1);
      this.setState({
        arrPrize: arrPrize
      });
      // }
      this.setState({ countPrize10: countPrize10 - 1 });
    }

    console.log("arrPrize:", this.state.arrPrize);
    this.theWheel.animation.stopAngle = stopAt;
    this.theWheel.startAnimation();
  }

  resetSpin() {
    this.theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    this.theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    this.theWheel.draw();
  }
  handleCancelClick = () => {
    this.setState({ isShowAlert: false });
  };

  renderAlert = () => {
    let prizeConvert = this.state.prize.indexOf("Hát");
    console.log("aaa1:", prizeConvert);
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

          <p style={{ color: "#FA5858", fontWeight: "bold", fontSize: 20 }}>
            Chúc mừng bạn!
          </p>
          <p style={{ fontWeight: "bold" }}>
            {prizeConvert == 0
              ? "Có cơ hội thể hiện giọng ca của mình qua một bài hát"
              : `Đã nhận được ${this.state.prize}`}
          </p>
          {prizeConvert == 0 ? (
            <p
              style={{
                padding: 10,
                fontSize: 12,
                color: "#FF8000",
                fontWeight: "bold"
              }}
            >
              Âm thanh và ánh sáng đã sẵn sàng còn chần chờ gì nữa quẩy lên nào!
            </p>
          ) : (
            <p
              style={{
                padding: 10,
                fontSize: 12,
                color: "#00BFFF",
                fontWeight: "bold"
              }}
            >
              Nhân ngày 20/10 chúc bạn và gia đình luôn tràn đầy niềm vui và
              hạnh phúc!
            </p>
          )}
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
                  {/* <h4 className="mb-3">SPIN THE WHEEL</h4> */}
                  <h3 className="mb-3">VÒNG QUAY MAY MẮN 20/10</h3>
                  {/* <div className="title-sprint-win pl-4">
                    Tap to spin & stand a chance to win up to $80 worth of
                    dining vouchers!
                  </div> */}
                  {/* <div className="prize d-flex">
                    <p>Số giải còn lại: </p>
                    <p style={{ paddingLeft: 10, paddingRight: 10 }}>
                      Qua tang 1: {this.state.countPrize1}
                    </p>
                    <p style={{ paddingRight: 10 }}>
                      Qua tang 2: {this.state.countPrize2}
                    </p>
                    <p style={{ paddingRight: 10 }}>
                      Qua tang 3: {this.state.countPrize3}
                    </p>
                    <p style={{ paddingLeft: 10, paddingRight: 10 }}>
                      mat luot: {this.state.countPrize4}
                    </p>
                    <p style={{ paddingRight: 10 }}>
                      Qua tang 5: {this.state.countPrize5}
                    </p>
                    <p style={{ paddingRight: 10 }}>
                      Qua tang 6: {this.state.countPrize6}
                    </p>
                    <p style={{ paddingLeft: 10, paddingRight: 10 }}>
                      Qua tang 7 {this.state.countPrize7}
                    </p>
                    <p style={{ paddingRight: 10 }}>
                      mat luot: {this.state.countPrize8}
                    </p>
                    <p style={{ paddingRight: 10 }}>
                      Qua tang 9 {this.state.countPrize9}
                    </p>
                    <p style={{ paddingRight: 10 }}>
                      Qua tang 10: {this.state.countPrize10}
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
