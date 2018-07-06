import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, Button, Grid } from "@material-ui/core";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import FavouriteButton from "./favourite_button";

import { logEvent } from "../utils/analytics";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  ExpansionPanelClosed: {
    borderLeft: "5px solid"
  },
  ExpansionPanelOpen: {
    borderLeft: "5px solid #808080"
  },
  ExpansionPanelSummary: {
    "&[aria-expanded*=true]": {
      backgroundColor: "#f8f8f8"
    },
    userSelect: "inherit"
  },
  bullet: {
    paddingBottom: "1em"
  },
  description: {
    paddingTop: "1em"
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
  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    const { t, classes, benefit } = this.props;
    const language = t("current-language-code");
    return (
      <ExpansionPanel
        className={
          this.state.open
            ? classes.ExpansionPanelOpen
            : classes.ExpansionPanelClosed
        }
        expanded={this.state.open}
      >
        <ExpansionPanelSummary
          expandIcon={this.state.open ? <RemoveIcon /> : <AddIcon />}
          onClick={() => this.toggleOpenState()}
          className={classes.ExpansionPanelSummary}
        >
          <Typography className={classnames(classes.heading)}>
            {this.props.showFavourite ? (
              <FavouriteButton
                benefit={benefit}
                toggleOpenState={this.toggleOpenState}
                store={this.props.store}
              />
            ) : (
              ""
            )}
            {language === "en" ? benefit.vacNameEn : benefit.vacNameFr}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography
                variant="title"
                className={classnames(classes.description)}
              >
                {language === "en"
                  ? benefit.oneLineDescriptionEn
                  : benefit.oneLineDescriptionFr}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="small"
                target="_blank"
                variant="raised"
                onClick={() =>
                  this.logExit(
                    language === "en"
                      ? benefit.benefitPageEn
                      : benefit.benefitPageFr
                  )
                }
                href={
                  language === "en"
                    ? benefit.benefitPageEn
                    : benefit.benefitPageFr
                }
              >
                {t("Find out more")}
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

EmbeddedBenefitCard.propTypes = {
  benefit: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired,
  showFavourite: PropTypes.bool.isRequired,
  store: PropTypes.object
};

export default withStyles(styles)(EmbeddedBenefitCard);
