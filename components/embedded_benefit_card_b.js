import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, Button, Grid } from "@material-ui/core";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { KeyboardBackspace } from "@material-ui/icons";
import { logEvent } from "../utils/analytics";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    margin: "20px",
    marginTop: "0px",
    padding: "20px",
    paddingTop: "5px"
  },
  heading: {
    paddingLeft: "0px",
    paddingRight: "0px",
    textTransform: "none",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
    color: "#3c51e6"
  },
  cardDescriptionText: {
    fontSize: "15px",
    lineHeight: "1.6",
    paddingTop: "0px"
  },
  rightArrowIcon: {
    "-moz-transform": "scaleX(-1)",
    "-o-transform": "scaleX(-1)",
    "-webkit-transform": "scaleX(-1)",
    transform: "scaleX(-1)",
    float: "left",
    filter: "FlipH",
    "-ms-filter": "FlipH",
    paddingRight: "5px"
  }
});

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
    const { t, classes, benefit } = this.props;
    const language = t("current-language-code");

    return (
      <Paper className={classes.root}>
        <Button
          target="_blank"
          className={classes.heading}
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
          <KeyboardBackspace className={classes.rightArrowIcon} />
        </Button>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography
              variant="title"
              className={classnames(classes.cardDescriptionText)}
            >
              {language === "en"
                ? benefit.oneLineDescriptionEn
                : benefit.oneLineDescriptionFr}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

EmbeddedBenefitCard.propTypes = {
  benefit: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  showFavourite: PropTypes.bool.isRequired,
  store: PropTypes.object
};

export default withStyles(styles)(EmbeddedBenefitCard);
