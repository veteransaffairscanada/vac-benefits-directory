import React, { Component } from "react";
import { css } from "emotion";
import PropTypes from "prop-types";
import LanguageButton from "./language_button";
import FIP from "./fip";
import SkipToMainContent from "./skip_to_main_content";

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
  margin: 0px;
  box-sizing: border-box;
  height: 83px;
  // padding: 1rem 0rem 0.5rem 0rem;
  width: auto;
  justify-content: space-between;
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
    const { t, skipLink, i18n } = this.props;
    return (
      <div>
        <SkipToMainContent skipLink={skipLink} t={t} />
        <div className={container}>
          <div className="svg-container">
            <FIP fillColor="white" t={t} />
          </div>
          <div>
            <LanguageButton i18n={i18n} t={t} />
          </div>
        </div>
      </div>
    );
  }
}

FederalBanner.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  skipLink: PropTypes.string.isRequired
};

export default FederalBanner;
