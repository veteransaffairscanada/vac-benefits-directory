import React, { Component } from "react";
import { Grid, Typography, Button } from "material-ui";
import { withStyles } from "material-ui/styles";
import red from "material-ui/colors/red";
import Collapse from "material-ui/transitions/Collapse";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classnames from "classnames";
import EmbeddedBenefitCard from "./embedded_benefit_card";
import ExpansionPanel from "material-ui/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "material-ui/ExpansionPanel/ExpansionPanelSummary";
import ExpansionPanelDetails from "material-ui/ExpansionPanel/ExpansionPanelDetails";

type Props = {
  benefit: mixed,
  allBenefits: mixed,
  t: mixed,
  classes: mixed
};

const styles = theme => ({
  button: {
    marginTop: "30px"
  },
  collapse: {
    paddingTop: "25px"
  },
  root: {
    width: "100%"
  },
  ExpansionPanelSummary: {
    "&[aria-expanded*=true]": {
      backgroundColor: "#eee"
    }
  },
  ChildBenefitDesc: {
    paddingBottom: "30px"
  }
});

export class BenefitCard extends Component<Props> {
  props: Props;

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
          <ExpansionPanel>
            <ExpansionPanelSummary
              className={classes.ExpansionPanelSummary}
              expandIcon={<ExpandMoreIcon />}
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
              <div>
                {childBenefits.length > 0 ? (
                  <Typography className={classes.ChildBenefitDesc}>
                    {t("child benefits")}:
                  </Typography>
                ) : (
                  ""
                )}
                <Grid container spacing={24}>
                  {childBenefits.map((cb, i) => (
                    <EmbeddedBenefitCard
                      id={"cb" + i}
                      className="BenefitCards"
                      benefit={cb}
                      allBenefits={this.props.allBenefits}
                      t={this.props.t}
                      key={i}
                    />
                  ))}
                </Grid>
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
                  {this.props.t("View Details")}
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
