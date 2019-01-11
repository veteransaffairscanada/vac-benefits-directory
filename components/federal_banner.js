import React, { Component } from "react";
import { css } from "emotion";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import LanguageButton from "./language_button";
import FIP from "./fip";
import { globalTheme } from "../theme";

export const breakpoints = {
  xs: 481,
  sm: 578,
  md: 764,
  base: 764,
  lg: 992
};

const mediaQuery = Object.keys(breakpoints).reduce((accumulator, label) => {
  let prefix = typeof breakpoints[label] === "string" ? "" : "max-width:";
  let suffix = typeof breakpoints[label] === "string" ? "" : "px";
  accumulator[label] = cls =>
    css`
      @media screen and (${prefix + breakpoints[label] + suffix}) {
        ${cls};
      }
    `;
  return accumulator;
}, {});

const buttonCSS = css`
  color: ${globalTheme.colour.white} !important;
`;

const container = css`
  margin: 0px;
  padding: 1rem 0rem 0.5rem 0rem;
  width: auto;
  justify-content: space-between;
  background-color: ${globalTheme.colour.greyishBrownTwo};
  display: -webkit-flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -moz-box;
  display: flex;

  .svg-container {
    /* same as the width value in our svg */
    width: 400px;
    height: 30px;
  }

  .svg-logo {
    width: 400px;
    fill: white;
  }

  ${mediaQuery.xs(css`
    .svg-container {
      width: 220px;
      height: 30px;

      svg {
        width: 220px;
        height: 30px;
        fill: white;
      }
    }
  `)};
`;

const skipLinkContainer = css`
  position: absolute;
  text-align: center;
  width: 90%;
  z-index: 3;
  top: 10px;
  left: 0px;
  list-style: none;
`;

const skipLinkStyle = css`
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  display: inline-block;
  color: white;
  text-decoration: none;
  font-family: ${globalTheme.fontFamily};

  :focus {
    width: auto !important;
    height: auto !important;
    outline: 3px solid #ffbf47;
    outline-offset: 0;
  }
`;

class FederalBanner extends Component {
  render() {
    const { t, skipLink } = this.props;
    return (
      <div>
        <ul className={skipLinkContainer}>
          <li>
            <a className={skipLinkStyle} href={skipLink} id="skipLink">
              {t("skipLink")}
            </a>
          </li>
        </ul>
        <div className={container}>
          <div className="svg-container">
            <FIP fillColor="white" t={this.props.t} />
          </div>
          <div>
            {this.props.showRefreshCache ? (
              <a href="/refresh">
                <Button id="refreshCache" className={buttonCSS}>
                  {t("refresh-cache")}
                </Button>
              </a>
            ) : (
              ""
            )}
            <LanguageButton i18n={this.props.i18n} t={this.props.t} />
          </div>
        </div>
      </div>
    );
  }
}

FederalBanner.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  skipLink: PropTypes.string.isRequired,
  showRefreshCache: PropTypes.bool.isRequired
};

export default FederalBanner;
