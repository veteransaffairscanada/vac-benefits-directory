import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "material-ui";
import { withStyles } from "material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import EmbeddedBenefitCard from "./embedded_benefit_card";
import ExpansionPanel from "material-ui/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "material-ui/ExpansionPanel/ExpansionPanelSummary";
import ExpansionPanelDetails from "material-ui/ExpansionPanel/ExpansionPanelDetails";

import { logEvent } from "../utils/analytics";

const styles = () => ({
  button: {
    marginTop: "30px"
  },
  cardDescriptionText: {
    fontSize: "20px",
    fontWeight: 400,
    padding: "15px 0px"
  },
  collapse: {
    paddingTop: "25px"
  },
  root: {
    marginLeft: "15px",
    width: "100%"
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
    }
  },
  ChildBenefitDesc: {
    paddingBottom: "30px"
  },
  children: {
    width: "100%"
  },
  ExampleDesc: {
    paddingBottom: "10px"
  },
  examples: {
    width: "100%",
    marginLeft: "20px"
  }
});

export class BenefitCard extends Component {
  state = {
    open: false
  };
  children = [];
  logExit = url => {
    logEvent("Exit", url);
  };

  toggleOpenState = () => {
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
    const benefit = this.props.benefit;
    const { t, classes } = this.props;
    const childBenefits = benefit.childBenefits
      ? this.props.allBenefits.filter(
          ab => benefit.childBenefits.indexOf(ab.id) > -1
        )
      : [];

    const examples = benefit.examples
      ? this.props.examples.filter(ex => benefit.examples.indexOf(ex.id) > -1)
      : [];

    return (
      <Grid item xs={12}>
        <div className={classes.root}>
          <ExpansionPanel
            className={
              this.state.open
                ? classes.ExpansionPanelOpen
                : classes.ExpansionPanelClosed
            }
            expanded={this.state.open}
          >
            <ExpansionPanelSummary
              className={classes.ExpansionPanelSummary}
              expandIcon={this.state.open ? <RemoveIcon /> : <AddIcon />}
              onClick={() => this.toggleOpenState()}
            >
              <div>
                <Typography component="p" className="benefitName">
                  {this.props.t("current-language-code") === "en"
                    ? benefit.vacNameEn
                    : benefit.vacNameFr}
                </Typography>

                <Typography
                  className={"cardDescription " + classes.cardDescriptionText}
                >
                  {this.props.t("current-language-code") === "en"
                    ? benefit.oneLineDescriptionEn
                    : benefit.oneLineDescriptionFr}
                </Typography>
              </div>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails timeout="auto" className={classes.collapse}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  {examples.length > 0 ? (
                    <Typography className={classes.ExampleDesc}>
                      {t("examples") + ":"}
                    </Typography>
                  ) : (
                    ""
                  )}
                  <Typography className={classes.examples}>
                    {examples.map(ex => {
                      return (
                        <li key={ex.id}>
                          {this.props.t("current-language-code") === "en"
                            ? ex.nameEn
                            : ex.nameFr}{" "}
                        </li>
                      );
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.children}>
                    {childBenefits.length > 0 ? (
                      <Typography className={classes.ChildBenefitDesc}>
                        {t("child benefits")}:
                      </Typography>
                    ) : (
                      ""
                    )}
                    <div>
                      {childBenefits.map((cb, i) => (
                        <EmbeddedBenefitCard
                          id={"cb" + i}
                          className="BenefitCards"
                          benefit={cb}
                          allBenefits={this.props.allBenefits}
                          t={this.props.t}
                          key={cb.id}
                          onRef={ref => this.children.push(ref)}
                        />
                      ))}
                    </div>
                    <Button
                      className={classes.button}
                      target="_blank"
                      variant="raised"
                      onClick={() =>
                        this.logExit(
                          this.props.t("current-language-code") === "en"
                            ? benefit.benefitPageEn
                            : benefit.benefitPageFr
                        )
                      }
                      href={
                        this.props.t("current-language-code") === "en"
                          ? benefit.benefitPageEn
                          : benefit.benefitPageFr
                      }
                    >
                      {this.props.t("Find out more")}
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Grid>
    );
  }
}

BenefitCard.propTypes = {
  allBenefits: PropTypes.array,
  benefit: PropTypes.object,
  classes: PropTypes.object,
  examples: PropTypes.array,
  t: PropTypes.func,
  onRef: PropTypes.func
};

export default withStyles(styles)(BenefitCard);
