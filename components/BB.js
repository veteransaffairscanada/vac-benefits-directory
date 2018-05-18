// @flow

import React, { Component } from "react";
import { Grid } from "material-ui";
import Collapse from "material-ui/transitions/Collapse";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import red from "material-ui/colors/red";
import Typography from "material-ui/Typography";

import { BenefitCard } from "../components/benefit_cards";
import FilterSelector from "../components/filter_selector";

type Props = {
  id: string,
  t: mixed,
  benefits: mixed,
  eligibilityPaths: mixed,
  selectedEligibility: mixed,
  classes: mixed
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

export class BB extends Component<Props> {
  props: Props;

  state = {
    expanded: true
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    let serviceTypes = Array.from(
      new Set(this.props.eligibilityPaths.map(ep => ep.serviceType))
    )
      .filter(st => st !== "na")
      .map(st => {
        return { id: st, name_en: st, name_fr: "FF " + st };
      });

    const patronTypes = Array.from(
      new Set(this.props.eligibilityPaths.map(ep => ep.patronType))
    ).map(st => {
      return { id: st, name_en: st, name_fr: "FF " + st };
    });

    const { t, classes, benefits } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div id={this.props.id}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item md={3} sm={5} xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Typography variant="title">
                    {t("B3.Filter Benefits")}
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
                  </Typography>
                </Grid>

                <Collapse
                  id="collapseBlock"
                  in={this.state.expanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <Grid item xs={12}>
                    {JSON.stringify(this.props.selectedEligibility.serviceType)}
                  </Grid>
                  <Grid item xs={12}>
                    <FilterSelector
                      id="serviceTypeFilter"
                      t={t}
                      legend={"B3.Service Type"}
                      filters={serviceTypes}
                      selectedFilters={
                        this.props.selectedEligibility.serviceType
                      }
                      handleChange={id =>
                        this.props.toggleSelectedEligibility("serviceType", id)
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {JSON.stringify(this.props.selectedEligibility.patronType)}
                  </Grid>
                  <Grid item xs={12}>
                    <FilterSelector
                      id="patronTypeFilter"
                      t={t}
                      legend={"B3.Patron Type"}
                      filters={patronTypes}
                      selectedFilters={
                        this.props.selectedEligibility.patronType
                      }
                      handleChange={id =>
                        this.props.toggleSelectedEligibility("patronType", id)
                      }
                    />
                  </Grid>
                </Collapse>

                <Grid item xs={12}>
                  <p style={{ textAlign: "left", fontSize: "1em" }}>
                    <a
                      className="AllBenefits"
                      href={"all-benefits?lng=" + t("current-language-code")}
                      target="_blank"
                    >
                      {t("Show All Benefits")}
                    </a>
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={9} sm={7} xs={12}>
              <Grid container spacing={24}>
                {benefits.map((benefit, i) => (
                  <BenefitCard
                    id={"bc" + i}
                    className="BenefitCards"
                    benefit={benefit}
                    t={this.props.t}
                    key={i}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BB);
