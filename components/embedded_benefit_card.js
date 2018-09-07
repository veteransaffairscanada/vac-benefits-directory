import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { logEvent } from "../utils/analytics";
import Paper from "@material-ui/core/Paper";
import { css } from "react-emotion";
import OneLiner from "./one_liner";
import HeaderButton from "./header_button";

const root = css`
  margin: 20px;
  margin-top: 0px;
  padding: 20px;
  padding-top: 5px;
`;
const heading = css`
  margin-bottom: 10px;
  margin-top: 10px;
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
        <HeaderButton
          id={"embedded-" + benefit.id}
          target="_blank"
          rel="noopener noreferrer"
          className={heading}
          size="small"
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
  showFavourite: PropTypes.bool.isRequired,
  store: PropTypes.object
};

export default EmbeddedBenefitCard;
