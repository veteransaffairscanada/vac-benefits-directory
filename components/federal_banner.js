import React, { Component } from "react";
import { GoCSignature } from "@cdssnc/gcui";
import { css } from "react-emotion";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import LanguageButton from "./language_button";

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
  padding: 1.3rem 0rem 0.5rem 1rem;
  width: auto;
  justify-content: space-between;
  background-color: black;
  display: -webkit-flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -moz-box;
  display: flex;

  .svg-container {
    /* same as the width value in our svg */
    width: 320px;
    height: 30px;
  }

  ${mediaQuery.xs(css`
    .svg-container {
      width: 280px;
      height: 30px;

      svg {
        width: 280px;
        height: 30px;
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
          <GoCSignature
            width="320px"
            lang={t("current-language-code")}
            flag="#fff"
            text="#fff"
          />
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
  i18n: PropTypes.object,
  t: PropTypes.func,
  showRefreshCache: PropTypes.bool
};

export default FederalBanner;
