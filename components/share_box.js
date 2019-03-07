import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { globalTheme } from "../theme";
import HeaderButton from "./header_button";
import HeaderLink from "./header_link";
import ShareModal from "./share_modal";
import Print from "./icons/Print";
import ShareIcon from "./icons/share_icon";
import { uuidv4 } from "../utils/common";
import { logEvent } from "../utils/analytics";

const shareBoxItem = css`
  color: ${globalTheme.colour.darkGreyBlue};
  margin-left: 5px;
`;
const shareText = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 14px;
  color: ${globalTheme.colour.navy};
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 10px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none;
  }
`;

class ShareBox extends Component {
  state = {
    showModal: false
  };

  uid = uuidv4();

  render() {
    const { t, printUrl, url, showShareLink, className } = this.props;
    return (
      <div className={className}>
        <span className={shareText}>{t("share_colon")}</span>
        <HeaderLink
          className={shareBoxItem}
          size="small"
          href={printUrl}
          target="_blank"
          aria-label={t("Print")}
          onClick={() => {
            logEvent("Exit", "print");
          }}
        >
          <Print />
        </HeaderLink>
        {showShareLink ? (
          <React.Fragment>
            <HeaderButton
              id={this.uid}
              className={shareBoxItem}
              size="small"
              aria-label={t("titles.share")}
              onClick={() => this.setState({ showModal: true })}
            >
              <ShareIcon />
            </HeaderButton>
            <ShareModal
              uid={this.uid}
              isOpen={this.state.showModal}
              onRequestClose={() => this.setState({ showModal: false })}
              closeModal={() => this.setState({ showModal: false })}
              url={url}
              t={t}
            />
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

ShareBox.propTypes = {
  t: PropTypes.func.isRequired,
  printUrl: PropTypes.string,
  url: PropTypes.object.isRequired,
  showShareLink: PropTypes.bool.isRequired,
  className: PropTypes.string
};

export default ShareBox;
