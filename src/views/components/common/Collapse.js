import React from "react";
import classnames from "classnames";
import Transition from "react-transition-group/Transition";

class Collapse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true, height: 0 };
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  componentDidMount() {
    if (this.divElement.clientHeight > 0)
      this.setState({ height: this.divElement.clientHeight, show: false });
  }

  render() {
    const { heading, children } = this.props;
    const { show, height } = this.state;
    return (
      <Transition in={show} timeout={100}>
        {state => {
          const heightInPx =
            (state === "entering" || state === "exiting") &&
            height > 0 &&
            `${height}px`;

          return (
            <div className="card">
              <div
                className={classnames("card-header", {
                  show: show
                })}
                aria-selected={show}
                aria-expanded={show}
                onClick={this.handleCollapse}
              >
                <span className="text-left" aria-label={heading}>
                  {heading}
                </span>
                <span className="card-header-arrow text-right" />
              </div>
              <div
                style={{
                  height: heightInPx
                }}
                aria-hidden={!show}
                className={classnames(
                  "collapse textbox_sublabel",
                  {
                    collapsing: state === "entering" || state === "exiting"
                  },
                  {
                    show: state === "entered"
                  }
                )}
                ref={divElement => (this.divElement = divElement)}
              >
                {children}
              </div>
            </div>
          );
        }}
      </Transition>
    );
  }
}

export default Collapse;
