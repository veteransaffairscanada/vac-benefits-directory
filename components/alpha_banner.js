import React, { Component } from "react";
import PropTypes from "prop-types";
import { PhaseBadge } from "./phase_badge";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import Link from "next/link";

const white = css`
  color: ${globalTheme.colour.charcoalGrey};
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

const bottomMargin = css`
  margin-bottom: 24px;
`;

const Banner = css`
  display: flex;
  display: -ms-flexbox;
  align-items: center;
  -ms-flex-align: center;
  padding-bottom: 24px;
  border-bottom: 4px solid ${globalTheme.colour.darkPaleGrey};
  color: ${globalTheme.colour.charcoalGrey};
  font-family: ${globalTheme.fontFamilySerif};
  span:first-of-type {
    font-weight: 700 !important;
    padding: 0.2rem 0.7rem;
    border-radius: 3px;
    background-color: ${globalTheme.colour.betaBlue};
    margin-right: 1em;
  }
`;
/**
 * Renders an alpha banner and renders passed children in the `Text` container
 */
export class AlphaBanner extends Component {
  render() {
    const { t, url, ...rest } = this.props;
    return (
      <div className={bottomMargin}>
        <aside {...rest} className={Banner}>
          <PhaseBadge phase={t("header.beta")} />
          <span>
            {t("beta_banner.main")} &nbsp;
            <Link href={{ pathname: "/feedback", query: url.query }}>
              <a className={white}>{t("beta_banner.link_text")}</a>
            </Link>
          </span>
        </aside>
      </div>
    );
  }
}

AlphaBanner.propTypes = {
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired
};

export default AlphaBanner;
