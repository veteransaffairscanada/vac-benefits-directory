import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Container from "../components/container";
import { cx, css } from "emotion";
import { globalTheme } from "../theme";
import HeaderButton from "./header_button";
import HeaderLink from "./header_link";
import ShareModal from "./share_modal";
import Print from "./icons/Print";
import ShareIcon from "./icons/share_icon";
import { uuidv4 } from "../utils/common";
import { logEvent } from "../utils/analytics";

const shareBoxStyle = css`
  background-color: ${globalTheme.colour.paleGreyishBrown};
  padding: 24px;
  margin-top: 2em;
  button {
    margin-bottom: 1em;
  }
`;

const shareBoxItem = css`
  text-decoration: underline !important;
  color: ${globalTheme.colour.darkGreyBlue};
`;

const nonMobileStyle = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    text-align: right;
  }
`;

class ShareBox extends Component {
  state = {
    showModal: false
  };

  uid = uuidv4();

  render() {
    const { t, printUrl, url, share, className } = this.props;
    return (
      <Container className={cx(shareBoxStyle, className)}>
        <Grid container spacing={8}>
          {share ? (
            <Grid item lg={12} md={12} sm={12} xs={6}>
              <HeaderButton
                id={this.uid}
                className={shareBoxItem}
                size="small"
                onClick={() => this.setState({ showModal: true })}
              >
                <ShareIcon />
                <span>{t("titles.share")}</span>
              </HeaderButton>
              <ShareModal
                uid={this.uid}
                isOpen={this.state.showModal}
                onRequestClose={() => this.setState({ showModal: false })}
                closeModal={() => this.setState({ showModal: false })}
                url={url}
                t={t}
              />
            </Grid>
          ) : (
            ""
          )}
          <Grid item lg={12} md={12} sm={12} xs={6}>
            <HeaderLink
              className={shareBoxItem}
              size="small"
              href={printUrl}
              target="_blank"
              onClick={() => {
                logEvent("Exit", "print");
              }}
            >
              <Print />
              <span className={share ? nonMobileStyle : ""}>{t("Print")}</span>
            </HeaderLink>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

ShareBox.propTypes = {
  t: PropTypes.func.isRequired,
  printUrl: PropTypes.string,
  url: PropTypes.object.isRequired,
  share: PropTypes.bool,
  className: PropTypes.string
};

export default ShareBox;
