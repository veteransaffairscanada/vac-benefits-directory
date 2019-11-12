import React, { Component } from "react";
import PropTypes from "prop-types";
import { PhaseBadge } from "./phase_badge";
import { css } from "emotion";
import { globalTheme } from "../theme";
import Link from "next/link";

const Banner = css`
  display: flex;
  display: -ms-flexbox;
  align-items: center;
  -ms-flex-align: center;
  border-top: 8px solid ${globalTheme.colour.borderGreen};
  font-family: ${globalTheme.fontFamilySansSerif};
  padding: 10px 30px 10px;
  span:first-of-type {
    font-weight: 700 !important;
    padding: 0.2rem 0.7rem;
    border-radius: 3px;
    background-color: ${globalTheme.colour.betaBlue};
    margin-right: 1em;
  }
`;
/**
 * Renders an version banner and renders passed children in the `Text` container
 */
export class VersionBanner extends Component {
  render() {
    const { t, url, ...rest } = this.props;
    return <div {...rest} className={Banner}></div>;
  }
}

VersionBanner.propTypes = {
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired
};

export default VersionBanner;
