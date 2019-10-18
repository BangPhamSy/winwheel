import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { Translate } from "react-localize-redux";

class MessageBaseModal extends Component {
  constructor(props) {
    super(props);

    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleAfterOpenModal = this.handleAfterOpenModal.bind(this);
  }

  componentWillMount() {
    ReactModal.setAppElement("#root");
  }

  handleCancelClick() {
    const { onCancelClick } = this.props;
    onCancelClick && onCancelClick();
  }

  handleConfirmClick() {
    const { onConfirmClick } = this.props;
    onConfirmClick && onConfirmClick();
  }

  handleAfterOpenModal() {
    const { onAfterOpenModal } = this.props;
    onAfterOpenModal && onAfterOpenModal();
  }

  render() {
    const {
      showModal,
      title,
      message,
      isOpen,
      confirmButtonText,
      cancelButtonText,
      ...props
    } = this.props;

    return (
      <Translate>
        {(translate, activeLanguage) => (
          <ReactModal
            isOpen={isOpen}
            onAfterOpen={this.handleAfterOpenModal}
            onRequestClose={this.handleCancelClick}
            {...props}
          >
            <div className="modal-header">
              {/* <h3 className="modal-header-title">
								{!title && translate("modal.title._message")}
							</h3> */}
              <div className="modal-close-mark">
                <button
                  className="btn-close-mark"
                  onClick={this.handleCancelClick}
                />
              </div>
            </div>
            <div className="modal-body pt-0">{this.props.children}</div>
            <div className="modal-footer">
              <button
                className="btn btn-primary btn-small btn-modal-ok"
                onClick={this.handleConfirmClick}
              >
                {confirmButtonText || translate("modal.button._ok")}
              </button>
            </div>
          </ReactModal>
        )}
      </Translate>
    );
  }
}

MessageBaseModal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  onAfterOpenModal: PropTypes.func,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string
};

export default MessageBaseModal;
