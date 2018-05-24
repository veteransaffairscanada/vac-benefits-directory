import React, { Component } from "react";
import Card, { CardActions, CardContent } from "material-ui/Card";
import { Grid, Typography, Button } from "material-ui";
import { withStyles } from "material-ui/styles";
import red from "material-ui/colors/red";
import Collapse from "material-ui/transitions/Collapse";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classnames from "classnames";
import EmbeddedBenefitCard from "./embedded_benefit_card";

type Props = {
  benefit: mixed,
  allBenefits: mixed,
  t: mixed,
  classes: mixed
};

const buttonStyles = {
  float: "right",
  marginTop: "10px",
  marginRight: "25px"
};

const chevronStyle = {
  float: "right"
};

const collapseStyle = {
  backgroundColor: "#eee",
  padding: "25px"
};

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
      <Grid item xs={12}>
        <Card>
          <Button
            style={buttonStyles}
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
              style={{ marginTop: "10px" }}
            >
              {t("Benefit Description")}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container spacing={24}>
              {childBenefits.length ? (
                <Grid item xs={12} style={{ marginLeft: "13px" }}>
                  {t("child benefits")}:
                  <IconButton
                    id="expandButton"
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                    style={chevronStyle}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>
              ) : (
                <div />
              )}
            </Grid>
          </CardActions>
          <Collapse
            id="collapseBlock"
            in={this.state.expanded}
            timeout="auto"
            unmountOnExit
            style={collapseStyle}
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
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(BenefitCard);
