import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, Button, Grid } from "material-ui";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import ExpansionPanel from "material-ui/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "material-ui/ExpansionPanel/ExpansionPanelSummary";
import ExpansionPanelDetails from "material-ui/ExpansionPanel/ExpansionPanelDetails";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { logEvent } from "../utils/analytics";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    "-webkit-user-select": "all",
    "-moz-user-select": "all",
    "-ms-user-select": "all",
    "user-select": "all"
  },
  ExpansionPanelClosed: {
    borderLeft: "5px solid"
  },
  ExpansionPanelOpen: {
    borderLeft: "5px solid #808080"
  },
  ExpansionPanelSummary: {
    "-webkit-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    "&[aria-expanded*=true]": {
      backgroundColor: "#f8f8f8"
    }
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

  toggleState = () => {
    let newState = !this.state.open;
    this.setState({ open: newState });
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
          onClick={() => this.toggleState()}
          className={classes.ExpansionPanelSummary}
        >
          <Typography className={classnames(classes.heading)}>
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
  benefit: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func,
  onRef: PropTypes.func
};

export default withStyles(styles)(EmbeddedBenefitCard);
