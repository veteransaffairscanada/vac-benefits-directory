import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import styled from "react-emotion";
import ReactModal from "react-modal";

import { globalTheme } from "../theme";

const modalCSS = css`
  position: absolute;
  top: 20%;
  left: 100px;
  right: 100px;
  border: 0;
  background: rgb(255, 255, 255);
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 0;
`;

const header = css`
  background-color: ${globalTheme.colour.darkGreyBlue};
  color: ${globalTheme.colour.white};
  padding: 0.75em 1.5em;
  font-size: 18px;
`;

const bodyStyle = css`
  padding: 1.5em;
`;

const URLInputBox = styled("input")({
  width: "80%",
  height: "44px",
  padding: "9px 19px 8px 19px",
  margin: 0,
  border: 0,
  boxShadow:
    "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
  boxSizing: "border-box",
  fontFamily: globalTheme.fontFamily,
  fontWeight: 400,
  textTransform: "none",
  fontSize: "14px",
  lineHeight: "1.5",
  background: globalTheme.colour.white,
  borderRadius: 0,
  WebkitAppearance: "none",
  ":focus": {
    marginRight: "3px",
    outline: `3px solid ` + globalTheme.colour.focusColour,
    outlineOffset: 0
  }
});

const CopyButton = styled("button")({
  backgroundColor: globalTheme.colour.cerulean,
  cursor: "pointer",
  border: 0,
  borderRadius: "3px",
  color: globalTheme.colour.white,
  fontFamily: globalTheme.fontFamily,
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "23px",
  position: "relative",
  padding: ".526315em 1em",
  marginLeft: "1em",
  backgroundPosition: "2px 50%",
  ":focus": {
    outlineOffset: 0,
    outline: `3px solid ` + globalTheme.colour.focusColour
  },
  ":hover": {
    backgroundColor: globalTheme.colour.darkGreyBlue
  }
});

const CloseButton = styled("button")({
  float: "right",
  backgroundColor: globalTheme.colour.darkGreyBlue,
  height: "100%",
  cursor: "pointer",
  fontSize: "18px",
  border: 0,
  color: globalTheme.colour.white
});

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
        // TODO - throw error
        //alert("copy button not supported");
      }
    }
  }

  render() {
    const { isOpen, onRequestClose, closeModal } = this.props;

    // Only render modal on the client - portals are not supported on the server and fail tests
    if (process.browser) {
      return (
        <ReactModal
          className={modalCSS}
          isOpen={isOpen}
          onRequestClose={onRequestClose}
        >
          <div className={header}>
            <span>Share this page</span>
            <CloseButton onClick={closeModal} id="modalCloseButton">
              X
            </CloseButton>
          </div>
          <div className={bodyStyle}>
            <p>
              <label htmlFor="shareTarget">
                Copy the link below and paste it wherever you need.
              </label>
            </p>
            <URLInputBox
              type="text"
              id="shareTarget"
              value={this.state.url}
              readOnly
            />
            <CopyButton
              id="copyButton"
              data-copytarget="#shareTarget"
              onClick={this.copyText}
            >
              Copy
            </CopyButton>
          </div>
        </ReactModal>
      );
    } else {
      return <div />;
    }
  }
}

ShareModal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  closeModal: PropTypes.func
};
if (process.browser) ReactModal.setAppElement("#main");
ReactModal.defaultStyles.overlay.backgroundColor = "rgba(30,30,30,0.75)";

export default ShareModal;
