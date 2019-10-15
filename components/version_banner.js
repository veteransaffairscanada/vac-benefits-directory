import React, { Component } from "react";
import PropTypes from "prop-types";
import { PhaseBadge } from "./phase_badge";
import { css } from "emotion";
import { globalTheme } from "../theme";
import Link from "next/link";

const white = css`
  color: ${globalTheme.colour.charcoalGrey};
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

const Banner = css`
  display: flex;
  display: -ms-flexbox;
  align-items: center;
  -ms-flex-align: center;
  background-color: ${globalTheme.colour.paleGreyTwo};
  border-top: 8px solid ${globalTheme.colour.borderGreen};
  color: ${globalTheme.colour.charcoalGrey};
  font-family: ${globalTheme.fontFamilySansSerif};
  padding: 10px 30px 10px;
  span:first-of-type {
    padding: 0.2rem 0.7rem;
    border-radius: 3px;
    margin-right: 1em;
`;
/**
 * Renders an version banner and renders passed children in the `Text` container
 */
export class VersionBanner extends Component {
  render() {
    const { t, url, ...rest } = this.props;
    return (
      <div {...rest} className={Banner}>
        <span>
          {t("beta_banner.main")} &nbsp;
          <Link href={{ pathname: "/feedback", query: url.query }}>
            <a className={white}>{t("beta_banner.link_text")}</a>
          </Link>
        </span>
      </div>
    );
  }
}

VersionBanner.propTypes = {
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired
};

export default VersionBanner;
