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
  eligibilityOptions: mixed,
  benefits: mixed,
  eligibility_paths: mixed,
  selectedEligibility: mixed,
  selectedNeeds: mixed,
  toggleSelectedEligibility: mixed,
  toggleSelectedNeeds: mixed,
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

export class B3 extends Component<Props> {
  props: Props;

  state = {
    expanded: true
  };

  componentDidMount() {}

  // filterBenefits = (benefits, benefitTypes, patronTypes) => {
  //   return benefits.filter(benefit => {
  //     const matchingBenefitTypes = benefit.benefit_types.filter(
  //       bt => benefitTypes.indexOf(bt) > -1
  //     );
  //     const matchingPatronTypes = benefit.patron_types.filter(
  //       pt => patronTypes.indexOf(pt) > -1
  //     );
  //     return matchingBenefitTypes.length > 0 && matchingPatronTypes.length > 0;
  //   });
  // };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars

    // let benefits = this.filterBenefits(
    //   this.props.benefits,
    //   this.props.selectedBenefitTypes,
    //   this.props.selectedPatronTypes
    // );
    let benefits = this.props.benefits;

    // add links to benefits

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
                    <FilterSelector
                      id="serviceTypesFilter"
                      t={t}
                      legend={"B3.Service Type"}
                      filters={this.props.eligibilityOptions.serviceType}
                      selectedFilters={[]}
                      handleChange={this.props.toggleSelectedEligibility}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FilterSelector
                      id="serviceTypesFilter"
                      t={t}
                      legend={"B3.Service Type"}
                      filters={this.props.eligibilityOptions.serviceType}
                      selectedFilters={[]}
                      handleChange={this.props.toggleSelectedEligibility}
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
                <Grid item xs={12}>
                  <h1 id="benefitCountString" style={{ textAlign: "left" }}>
                    Some benefits selected
                    {/*{this.countBenefitsString(*/}
                    {/*this.props.selectedPatronTypes,*/}
                    {/*this.props.selectedBenefitTypes,*/}
                    {/*benefits,*/}
                    {/*t*/}
                    {/*)}*/}
                  </h1>
                </Grid>
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

export default withStyles(styles)(B3);
