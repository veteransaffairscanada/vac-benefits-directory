import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@material-ui/core";
import classnames from "classnames";
import { KeyboardBackspace } from "@material-ui/icons";
import { logEvent } from "../utils/analytics";
import Paper from "@material-ui/core/Paper";
import { css } from "react-emotion";

const root = css`
  margin: 20px;
  margin-top: 0px;
  padding: 20px;
  padding-top: 5px;
`;
const heading = css`
  padding-left: 0px !important;
  padding-right: 0px !important;
  text-transform: none !important;
  font-size: 15px !important;
  font-weight: 500 !important;
  color: #3c51e6 !important;
`;
const cardDescriptionText = css`
  font-size: 15px;
  line-height: 1.6;
  padding-top: 0px;
`;
const rightArrowIcon = css`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  float: left !important;
  filter: FlipH;
  -ms-filter: FlipH;
  padding-right: 5px;
`;

export class EmbeddedBenefitCard extends Component {
  state = {
    open: false
  };

  logExit = url => {
    logEvent("Exit", url);
  };

  toggleOpenState = () => {
    this.setState(previousState => {
      return { ...previousState, open: !previousState.open };
    });
  };

  render() {
    const { t, benefit } = this.props;
    const language = t("current-language-code");

    return (
      <Paper className={root}>
        <Button
          target="_blank"
          rel="noopener noreferrer"
          className={heading}
          onClick={() =>
            this.logExit(
              language === "en" ? benefit.benefitPageEn : benefit.benefitPageFr
            )
          }
          href={
            language === "en" ? benefit.benefitPageEn : benefit.benefitPageFr
          }
        >
          {language === "en" ? benefit.vacNameEn : benefit.vacNameFr}
          <KeyboardBackspace className={rightArrowIcon} />
        </Button>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h2 variant="title" className={classnames(cardDescriptionText)}>
              {language === "en"
                ? benefit.oneLineDescriptionEn
                : benefit.oneLineDescriptionFr}
            </h2>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

EmbeddedBenefitCard.propTypes = {
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  showFavourite: PropTypes.bool.isRequired,
  store: PropTypes.object
};

export default EmbeddedBenefitCard;
