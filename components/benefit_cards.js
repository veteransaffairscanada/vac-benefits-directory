import React, { Component } from "react";
import { Grid, Typography, Button } from "material-ui";
import { withStyles } from "material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmbeddedBenefitCard from "./embedded_benefit_card";
import ExpansionPanel from "material-ui/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "material-ui/ExpansionPanel/ExpansionPanelSummary";
import ExpansionPanelDetails from "material-ui/ExpansionPanel/ExpansionPanelDetails";

const styles = () => ({
  button: {
    marginTop: "30px"
  },
  collapse: {
    paddingTop: "25px"
  },
  root: {
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
  }
});

export class BenefitCard extends Component {
  state = {
    open: false
  };

  toggleOpenState = () => {
    let newState = !this.state.open;
    this.setState({ open: newState });
  };

  render() {
    const benefit = this.props.benefit;
    const { t, classes } = this.props;
    const childBenefits = benefit.childBenefits
      ? this.props.allBenefits.filter(
          ab => benefit.childBenefits.indexOf(ab.id) > -1
        )
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
          >
            <ExpansionPanelSummary
              className={classes.ExpansionPanelSummary}
              expandIcon={<ExpandMoreIcon />}
              onClick={() => this.toggleOpenState()}
            >
              <div>
                <Typography component="p" className="benefitName">
                  {this.props.t("current-language-code") === "en"
                    ? benefit.vacNameEn
                    : benefit.vacNameFr}
                </Typography>

                <Typography
                  className="cardDescription"
                  variant="headline"
                  component="h3"
                >
                  {t("Benefit Description")}
                </Typography>
              </div>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails timeout="auto" className={classes.collapse}>
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
                    />
                  ))}
                </div>
                <Button
                  className={classes.button}
                  target="_blank"
                  variant="raised"
                  href={
                    this.props.t("current-language-code") === "en"
                      ? benefit.benefitPageEn
                      : benefit.benefitPageFr
                  }
                >
                  {this.props.t("Find out more")}
                </Button>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(BenefitCard);
