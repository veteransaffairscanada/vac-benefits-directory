import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { logEvent } from "../utils/analytics";
import Paper from "./paper";
import { css } from "react-emotion";
import OneLiner from "./typography/one_liner";
import HeaderButton from "./header_button";

const root = css`
  margin-bottom: 20px;
  margin-top: 0px;
`;
const heading = css`
  margin-bottom: 10px;
  text-align: left;
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
      <Paper padding="sm" className={root}>
        <HeaderButton
          id={"embedded-" + benefit.id}
          target="_blank"
          rel="noopener noreferrer"
          className={heading}
          size="small"
          useLink
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
        </HeaderButton>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <OneLiner>
              {language === "en"
                ? benefit.oneLineDescriptionEn
                : benefit.oneLineDescriptionFr}
            </OneLiner>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

EmbeddedBenefitCard.propTypes = {
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default EmbeddedBenefitCard;
