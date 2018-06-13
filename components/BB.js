import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "material-ui";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";

import "babel-polyfill/dist/polyfill";

import BenefitList from "../components/benefit_list";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";

const styles = theme => ({
  benefitsCount: {
    fontSize: "24px"
  },
  checkEligibility: {
    fontWeight: "100"
  },
  collapse: {
    textAlign: "right",
    textDecoration: "underline",
    marginTop: "34px"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  sortBy: {
    textAlign: "left",
    marginLeft: "-7px"
  },
  sortByBox: {
    backgroundColor: "white"
  },
  subTitle: {
    fontSize: "20px",
    fontWeight: "100",
    paddingBottom: "25px"
  },
  title: {
    fontSize: "36px",
    padding: "15px 0"
  },
  topMatter: {
    borderBottom: "solid 1px lightgrey",
    marginBottom: "30px"
  }
});

export class BB extends Component {
  state = {
    sortByValue: "relevance"
  };
  children = [];

  collapseAllBenefits = () => {
    this.children.forEach(c => {
      if (c) {
        c.setState({ open: false });
        c.children.forEach(cc => {
          if (cc) {
            cc.setState({ open: false });
          }
        });
      }
    });
  };

  eligibilityMatch = (path, selected) => {
    let matches = true;
    ["serviceType", "patronType", "statusAndVitals"].forEach(criteria => {
      if (
        selected[criteria] != "" &&
        path[criteria] !== "na" &&
        selected[criteria] != path[criteria]
      ) {
        matches = false;
      }
    });
    return matches;
  };

  filterBenefits = (
    benefits,
    eligibilityPaths,
    selectedEligibility,
    needs,
    selectedNeeds
  ) => {
    if (benefits.length === 0) {
      return benefits;
    }

    // find benefits that match
    let benefitIdsForProfile = [];
    eligibilityPaths.forEach(ep => {
      if (this.eligibilityMatch(ep, selectedEligibility)) {
        benefitIdsForProfile = benefitIdsForProfile.concat(ep.benefits);
      }
    });
    let benefitIdsForSelectedNeeds = [];
    if (Object.keys(selectedNeeds).length > 0) {
      Object.keys(selectedNeeds).forEach(id => {
        const need = needs.filter(n => n.id === id)[0];
        benefitIdsForSelectedNeeds = benefitIdsForSelectedNeeds.concat(
          need.benefits
        );
      });
    } else {
      benefitIdsForSelectedNeeds = benefits.map(b => b.id);
    }
    let matchingBenefitIds = benefitIdsForProfile.filter(
      id => benefitIdsForSelectedNeeds.indexOf(id) > -1
    );

    // find benefits with matching children
    const benefitIdsWithMatchingChildren = benefits
      .filter(
        b =>
          b.childBenefits &&
          b.childBenefits.filter(cbID => matchingBenefitIds.indexOf(cbID) > -1)
            .length > 0
      )
      .map(b => b.id);

    const benefitIDsToShow = matchingBenefitIds.concat(
      benefitIdsWithMatchingChildren
    );
    let benefitsToShow = benefits.filter(
      b => benefitIDsToShow.indexOf(b.id) > -1
    );

    // if a benefit is already shown as a child, only show it (as a parent card) if it's available independently
    let childrenIDsShown = [];
    benefitsToShow.forEach(b => {
      childrenIDsShown = childrenIDsShown.concat(b.childBenefits);
    });
    benefitsToShow = benefitsToShow.filter(
      b =>
        b.availableIndependently === "Independent" ||
        childrenIDsShown.indexOf(b.id) < 0
    );

    return benefitsToShow;
  };

  handleSortByChange = event => {
    this.setState({ sortByValue: event.target.value });
  };

  countSelection = () => {
    const reducer = (acc, obj) => acc + (Object.values(obj)[0] == null ? 0 : 1);
    let count = Object.values(this.props.selectedEligibility).reduce(
      reducer,
      0
    );
    return count + Object.values(this.props.selectedNeeds).length;
  };

  countString = (x, t) => {
    switch (true) {
      case this.countSelection() === 0:
        return t("B3.All benefits to consider");
      case x == 0:
        return t("B3.No benefits");
      case x == 1:
        return t("B3.One benefit");
      default:
        return t("B3.x benefits to consider", { x: x });
    }
  };

  render() {
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars
    const filteredBenefits = this.filterBenefits(
      this.props.benefits,
      this.props.eligibilityPaths,
      this.props.selectedEligibility,
      this.props.needs,
      this.props.selectedNeeds
    );

    return (
      <div id={this.props.id}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.topMatter}>
              <Typography className={classes.title}>{t("B3.title")}</Typography>
              <Typography className={classes.subTitle}>
                {t("B3.subtitle1")} <br />
                {t("B3.subtitle2")}
              </Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={5} xs={12}>
              <ProfileSelector
                t={t}
                handleChange={this.props.setSelectedNeeds}
                clearFilters={this.props.clearFilters}
                selectedEligibility={this.props.selectedEligibility}
                setUserProfile={this.props.setUserProfile}
                eligibilityPaths={this.props.eligibilityPaths}
                pageWidth={this.props.pageWidth}
              />
              <Grid item xs={12}>
                <NeedsSelector
                  t={t}
                  needs={this.props.needs}
                  selectedNeeds={this.props.selectedNeeds}
                  handleChange={this.props.setSelectedNeeds}
                  clearNeeds={this.props.clearNeeds}
                  pageWidth={this.props.pageWidth}
                />
              </Grid>
            </Grid>
            <Grid item lg={9} md={8} sm={7} xs={12}>
              <Grid item xs={12}>
                <Typography
                  className={"BenefitsCounter " + classes.benefitsCount}
                >
                  {this.countString(filteredBenefits.length, t)}
                </Typography>
                {filteredBenefits.length > 0 ? (
                  <Typography className={classes.checkEligibility}>
                    {t("B3.check eligibility")}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>

              <Grid container spacing={24}>
                <Grid item xs={3} className={classnames(classes.sortBy)}>
                  <FormControl
                    id="sortBySelector"
                    className={classes.formControl}
                  >
                    <InputLabel>{t("B3.Sort By")}</InputLabel>
                    <Select
                      value={this.state.sortByValue}
                      onChange={this.handleSortByChange}
                      className={classnames(classes.sortByBox)}
                    >
                      <MenuItem value={"relevance"}>
                        {t("B3.Popularity")}
                      </MenuItem>
                      <MenuItem value={"alphabetical"}>
                        {t("B3.Alphabetical")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={9} className={classnames(classes.collapse)}>
                  <Button
                    id="CollapseBenefits"
                    variant="flat"
                    size="small"
                    onClick={this.collapseAllBenefits}
                  >
                    {t("Close all")}
                  </Button>
                </Grid>
                <BenefitList
                  t={t}
                  filteredBenefits={filteredBenefits}
                  eligibilityPaths={this.props.eligibilityPaths}
                  benefits={this.props.benefits}
                  onRef={ref => this.children.push(ref)}
                  examples={this.props.examples}
                  sortByValue={this.state.sortByValue}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

BB.propTypes = {
  benefits: PropTypes.array,
  classes: PropTypes.object,
  clearFilters: PropTypes.func,
  clearNeeds: PropTypes.func,
  eligibilityPaths: PropTypes.array,
  examples: PropTypes.array,
  id: PropTypes.string,
  needs: PropTypes.array,
  selectedEligibility: PropTypes.object,
  selectedNeeds: PropTypes.object,
  setSelectedNeeds: PropTypes.func,
  setUserProfile: PropTypes.func,
  t: PropTypes.func,
  toggleSelectedEligibility: PropTypes.func,
  pageWidth: PropTypes.number
};

export default withStyles(styles)(BB);
