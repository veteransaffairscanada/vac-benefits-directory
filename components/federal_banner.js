import React, { Component } from "react";
import { css } from "react-emotion";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import LanguageButton from "./language_button";
import FIP from "./fip";

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

const container = css`
  padding: 1rem 0rem 0.5rem 1rem;
  width: auto;
  justify-content: space-between;
  background-color: #555;
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
class FederalBanner extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className={container}>
        <div className="svg-container">
          <FIP fillColor="white" t={this.props.t} />
        </div>
        <div>
          {this.props.showRefreshCache ? (
            <a href="/refresh">
              <Button id="refreshCache" style={{ color: "#fff" }}>
                {t("refresh-cache")}
              </Button>
            </a>
          ) : (
            ""
          )}
          <LanguageButton i18n={this.props.i18n} t={this.props.t} />
        </div>
      </div>
    );
  }
}

FederalBanner.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  showRefreshCache: PropTypes.bool.isRequired
};

export default FederalBanner;
