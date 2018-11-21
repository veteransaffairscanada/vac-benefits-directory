import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import ReactModal from "react-modal";

const modalCSS = css`
  position: absolute;
  top: 20%;
  left: 40px;
  right: 40px;
  border: 1px solid rgb(204, 204, 204);
  background: rgb(255, 255, 255);
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 0 2em 2em 2em;
`;

class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
  }
  componentDidMount() {
    this.setState({ url: window.location.href });
  }

  copyText(e) {
    let t = e.target.dataset.copytarget;
    let shareInput = t ? document.querySelector(t) : null;
    if (shareInput && shareInput.select) {
      shareInput.select();
      try {
        document.execCommand("copy");
        shareInput.blur();

        // TODO - confirmation message that link has been copied
      } catch (err) {
        alert("copy button not supported");
      }
    }
  }

  render() {
    const { isOpen, onRequestClose, closeModal } = this.props;

    return (
      <ReactModal
        className={modalCSS}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <div>
          <p>Share this page</p>
          <button onClick={closeModal}>X</button>
        </div>
        <p>Copy the link below and paste it wherever you need.</p>
        <input type="text" id="shareTarget" value={this.state.url} readOnly />
        <button data-copytarget="#shareTarget" onClick={this.copyText}>
          Copy
        </button>
      </ReactModal>
    );
  }
}

ShareModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  closeModal: PropTypes.func
};

ReactModal.setAppElement("#__next");

export default ShareModal;
