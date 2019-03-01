import React, { Component } from "react";
import { css } from "emotion";
import PropTypes from "prop-types";
import LanguageButton from "./language_button";
import MyVacButton from "./myvac_button";
import FIP from "./fip";
import SkipToMainContent from "./skip_to_main_content";
import { Grid } from "@material-ui/core";
import { globalTheme } from "../theme";

const container = css`
  margin: 0px;
  box-sizing: border-box;
  height: 75px;
  padding-top: 26px;
  width: auto;
  justify-content: space-between;
  display: -webkit-flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -moz-box;
  display: flex;

  .svg-container {
    /* same as the width value in our svg */
    width: 350px;
    height: 30px;
  }

  .svg-logo {
    width: 350px;
    fill: white;
  }

  @media only screen and (max-width: ${globalTheme.max.xs}) {
    .svg-container {
      width: 220px;
      height: 30px;
      svg {
        width: 220px;
        height: 30px;
        fill: white;
      }
    }
  }
`;

const flex = css`
  width: 100%;
  height: 100%;
  border-top: 1px solid ${globalTheme.colour.navy};
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    height: 52px;
  }
`;

const flexItems = css`
  flex: 1;
  width: 100%;
  text-align: right;
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    text-align: left;
  }
`;

class FederalBanner extends Component {
  render() {
    const { t, skipLink, i18n, url } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <SkipToMainContent skipLink={skipLink} t={t} />
          <div className={container}>
            <a className="svg-container" href={t("ge.home_link")}>
              <FIP fillColor="white" t={t} />
            </a>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={flex}>
            <div className={flexItems}>
              <LanguageButton i18n={i18n} t={t} url={url} />
              <MyVacButton i18n={i18n} t={t} />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

FederalBanner.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  skipLink: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired
};

export default FederalBanner;
