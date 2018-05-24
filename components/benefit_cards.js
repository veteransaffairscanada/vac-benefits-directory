import React, { Component } from "react";
import Card, { CardContent } from "material-ui/Card";
import { Grid, Typography, Button } from "material-ui";
import SelectButton from "./select_button";
import { withStyles } from "material-ui/styles";
import red from "material-ui/colors/red";
import Collapse from "material-ui/transitions/Collapse";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classnames from "classnames";

type Props = {
  benefit: mixed,
  allBenefits: mixed,
  t: mixed,
  classes: mixed
};

const buttonStyles = {
  float: "right",
  marginTop: "10px"
};

export class EmbeddedBenefitCard extends Component<Props> {
  props: Props;

  render() {
    const benefit = this.props.benefit;
    return (
      <Grid item xs={12}>
        <SelectButton
          target="_blank"
          text={
            this.props.t("current-language-code") === "en"
              ? benefit.vacNameEn
              : benefit.vacNameFr
          }
          href={
            this.props.t("current-language-code") === "en"
              ? benefit.benefitPageEn
              : benefit.benefitPageFr
          }
          isDown={false}
          id="title"
        />
      </Grid>
    );
  }
}

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

export class BenefitCard extends Component<Props> {
  props: Props;

  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
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
      <Grid item xs={12} lg={6}>
        <Card>
          <Button
            style={buttonStyles}
            target="_blank"
            href={
              this.props.t("current-language-code") === "en"
                ? benefit.benefitPageEn
                : benefit.benefitPageFr
            }
          >
            {this.props.t("View Details")}
          </Button>

          <CardContent>
            <Typography className="cardTitle" variant="title" gutterBottom>
              {this.props.t("current-language-code") === "en"
                ? benefit.vacNameEn
                : benefit.vacNameFr}
            </Typography>

            <Typography
              className="cardDescription"
              variant="body1"
              gutterBottom
            >
              {"Benefit Description"}
            </Typography>

            <Grid container spacing={24}>
              {childBenefits.length ? (
                <Grid item>
                  {t("child benefits")}:
                  <IconButton
                    id="expandButton"
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>
              ) : (
                ""
              )}
            </Grid>

            <Collapse
              id="collapseBlock"
              in={this.state.expanded}
              timeout="auto"
              unmountOnExit
            >
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
            </Collapse>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(BenefitCard);
