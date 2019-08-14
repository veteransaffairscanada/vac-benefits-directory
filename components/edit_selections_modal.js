import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import ReactModal from "react-modal";
import { Grid } from "@material-ui/core/";
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
  outline: none;
  padding: 0;
  @media only screen and (max-width: ${globalTheme.max.md}) {
    left: 20%;
    right: 20%;
  }
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    left: 10%;
    right: 10%;
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
  background-color: ${globalTheme.colour.blackBlue};
  color: ${globalTheme.colour.white};
  padding: 0.75em 1.1em;
  font-size: 22px;
  font-family: ${globalTheme.fontFamilySansSerif};
  font-weight: 700;
`;

const bodyStyle = css`
  padding: 1.5em;
  font-family: ${globalTheme.fontFamilySansSerif};
  font-weight: 700;
`;

const CopyButton = styled("button")({
  backgroundColor: globalTheme.colour.blackBlue,
  cursor: "pointer",
  width: "100%",
  border: 0,
  color: globalTheme.colour.white,
  fontFamily: globalTheme.fontFamilySansSerif,
  fontWeight: "bold",
  fontSize: "22px",
  lineHeight: "23px",
  position: "relative",
  padding: ".526315em 1em",
  backgroundPosition: "2px 50%",
  ":focus": {
    outlineOffset: 0,
    outline: `3px solid ` + globalTheme.colour.focusColour
  },
  ":hover": {
    backgroundColor: globalTheme.colour.navy
  }
});

const CloseButton = styled("button")({
  float: "right",
  backgroundColor: globalTheme.colour.blackBlue,
  height: "100%",
  cursor: "pointer",
  fontSize: "24px",
  fontWeight: "900",
  padding: 0,
  border: 0,
  color: globalTheme.colour.white
});
const topMargin = css`
  margin-top: 1em;
`;

class EditSelectionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      statusMessage: "",
      origin: ""
    };
  }
  componentDidMount() {
    this.setState({ origin: window.location.origin });
  }

  close(closeModalFn) {
    this.setState({ statusMessage: "" });
    closeModalFn();
  }

  render() {
    const { uid, isOpen, onRequestClose, closeModal, t } = this.props;
    const shareTargetId = uid + "shareTarget";
    // Only render modal on the client - portals are not supported on the server and fail tests
    if (process.browser) {
      return (
        <ReactModal
          style={modalStyles}
          css={modalCSS}
          isOpen={isOpen}
          onRequestClose={() => this.close(onRequestClose)}
        >
          <div css={header}>
            <span>{t("BenefitsPane.edit_selections")}</span>
            <CloseButton onClick={() => this.close(closeModal)}>X</CloseButton>
          </div>
          <div css={bodyStyle}>
            <p>
              <label htmlFor={shareTargetId}>{t("share.copy_prompt")}</label>
            </p>
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                {/* TODO: left side of edit selection questions */}
              </Grid>
              <Grid item xs={12} md={6}>
                {/* TODO: right side of edit selection questions */}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* TODO: add "results" button */}
            </Grid>

            <div css={topMargin}>{this.state.statusMessage}</div>
          </div>
        </ReactModal>
      );
    } else {
      return <div />;
    }
  }
}

EditSelectionsModal.propTypes = {
  uid: PropTypes.string.isRequired,
  css: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  closeModal: PropTypes.func,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};
if (process.browser) ReactModal.setAppElement("#main");
ReactModal.defaultStyles.overlay.backgroundColor = "rgba(30,30,30,0.75)";

export default EditSelectionsModal;
