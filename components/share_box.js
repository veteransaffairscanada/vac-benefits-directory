import React, { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import HeaderButton from "./header_button";
import HeaderLink from "./header_link";
import ShareModal from "./share_modal";
import Icon from "./icon";
import { uuidv4 } from "../utils/common";
import { logEvent } from "../utils/analytics";

const shareBoxItem = css`
  color: ${globalTheme.colour.greyishBrown};
  margin-left: 10px;
  svg {
    padding-left: 5px;
    padding-right: 5px;
  }
`;
const shareText = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 14px;
  color: ${globalTheme.colour.greyishBrown};
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 5px;
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
    const { t, printUrl, url, showShareLink, css } = this.props;
    return (
      <div css={css}>
        <span css={shareText}>{t("share_colon")}</span>
        <nobr>
          <HeaderLink
            css={shareBoxItem}
            size="small"
            href={printUrl}
            aria-label={t("Print")}
            onClick={() => {
              logEvent("Exit", "print");
            }}
          >
            <Icon icon="print" color={`${globalTheme.colour.greyishBrown}`} />
          </HeaderLink>
          {showShareLink ? (
            <React.Fragment>
              <HeaderButton
                id={this.uid}
                styles={shareBoxItem}
                size="small"
                aria-label={t("titles.share")}
                onClick={() => this.setState({ showModal: true })}
              >
                <Icon
                  icon="share"
                  color={`${globalTheme.colour.greyishBrown}`}
                />
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
        </nobr>
      </div>
    );
  }
}

ShareBox.propTypes = {
  t: PropTypes.func.isRequired,
  printUrl: PropTypes.string,
  url: PropTypes.object.isRequired,
  showShareLink: PropTypes.bool.isRequired,
  css: PropTypes.string
};

export default ShareBox;
