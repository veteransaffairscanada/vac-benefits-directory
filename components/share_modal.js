import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import styled from "@emotion/styled";
import ReactModal from "react-modal";

import { globalTheme } from "../theme";
const modalStyles = { overlay: { zIndex: 100 } };

const modalCSS = css`
  position: absolute;
  top: 20%;
  left: 25%;
  right: 25%;
  border: 0;
  background: rgb(255, 255, 255);
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 0;
  @media only screen and (max-width: ${globalTheme.max.md}) {
    left: 20%;
    right: 20%;
  }
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    left: 10%;
    right: 10%;
    input {
      width: 75%;
    }
  }
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    left: 10px;
    right: 10px;

    input {
      width: 100%;
    }
    .copyButton {
      width: 100%;
      margin: auto;
    }
  }
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
  margin: "0 0 10px 0",
  border: 0,
  boxShadow:
    "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
  boxSizing: "border-box",
  fontFamily: globalTheme.fontFamilySansSerif,
  fontWeight: 400,
  textTransform: "none",
  fontSize: "1em",
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
  width: "auto",
  border: 0,
  borderRadius: "3px",
  color: globalTheme.colour.white,
  fontFamily: globalTheme.fontFamilySansSerif,
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
      url: "",
      statusMessage: "",
      origin: "",
      utm: "/utm_source=share-link&utm_medium=fbas"
    };
    this.copyText = this.copyText.bind(this);
  }
  componentDidMount() {
    this.setState({ origin: window.location.origin });
  }

  copyText(e) {
    let t = e.target.dataset.copytarget;
    let shareInput = t ? document.querySelector(t) : null;
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareInput.value).then(() => {
          this.setState({ statusMessage: this.props.t("share.link_copied") });
        });
      } else {
        // fix for iOS:
        // handle iOS as a special case
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          // create a selectable range
          var range = document.createRange();
          range.selectNodeContents(shareInput);

          // select the range
          var selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          shareInput.setSelectionRange(0, 999999);

          // restore contentEditable/readOnly to original state
        } else {
          shareInput.select();
        }

        document.execCommand("copy");

        shareInput.blur();

        this.setState({ statusMessage: this.props.t("share.link_copied") });
      }
    } catch (err) {
      this.setState({ statusMessage: this.props.t("share.not_supported") });
    }
  }
  close(closeModalFn) {
    this.setState({ statusMessage: "" });
    closeModalFn();
  }

  render() {
    const { uid, isOpen, onRequestClose, closeModal, t } = this.props;
    const shareTargetId = uid + "shareTarget";
    let iOS = false;
    if (global.navigator) {
      let userAgent = navigator.userAgent;

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        iOS = true;
      }
    }
    let inputBox = iOS ? (
      <URLInputBox
        type="text"
        id={shareTargetId}
        defaultValue={
          this.props.url.asPath &&
          this.props.url.asPath.includes(this.state.utm)
            ? this.state.origin + this.props.url.asPath
            : this.state.origin + this.props.url.asPath + this.state.utm
        }
        contentEditable="true"
        readOnly={false}
      />
    ) : (
      <URLInputBox
        type="text"
        id={shareTargetId}
        value={
          this.props.url.asPath &&
          this.props.url.asPath.includes(this.state.utm)
            ? this.state.origin + this.props.url.asPath
            : this.state.origin + this.props.url.asPath + this.state.utm
        }
        readOnly
      />
    );
    // Only render modal on the client - portals are not supported on the server and fail tests
    if (process.browser) {
      return (
        <ReactModal
          style={modalStyles}
          className={modalCSS}
          isOpen={isOpen}
          onRequestClose={() => this.close(onRequestClose)}
        >
          <div className={header}>
            <span>{t("titles.share")}</span>
            <CloseButton onClick={() => this.close(closeModal)}>X</CloseButton>
          </div>
          <div className={bodyStyle}>
            <p>
              <label htmlFor={shareTargetId}>{t("share.copy_prompt")}</label>
            </p>
            {inputBox}
            <CopyButton
              className="copyButton"
              data-copytarget={"#" + shareTargetId}
              onClick={this.copyText}
            >
              {t("share.copy_button")}
            </CopyButton>
            <div>{this.state.statusMessage}</div>
          </div>
        </ReactModal>
      );
    } else {
      return <div />;
    }
  }
}

ShareModal.propTypes = {
  uid: PropTypes.string.isRequired,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  closeModal: PropTypes.func,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};
if (process.browser) ReactModal.setAppElement("#main");
ReactModal.defaultStyles.overlay.backgroundColor = "rgba(30,30,30,0.75)";

export default ShareModal;
