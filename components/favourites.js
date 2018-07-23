import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import "babel-polyfill/dist/polyfill";
import BenefitList from "../components/benefit_list";
import { connect } from "react-redux";
import Print from "@material-ui/icons/Print";

const styles = theme => ({
  benefitsCount: {
    fontSize: "24px"
  },
  buttonBarButton: {
    fontSize: "20px",
    fontWeight: "100",
    paddingLeft: "0px",
    textDecoration: "none",
    textTransform: "none"
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
  title: {
    fontSize: "36px",
    padding: "15px 0"
  },
  topMatter: {
    borderBottom: "solid 1px lightgrey",
    marginBottom: "30px"
  }
});

export class Favourites extends Component {
  state = {
    enIdx: null,
    frIdx: null,
    sortByValue: "relevance"
  };

  filterBenefits = (benefits, favouriteBenefits) => {
    if (benefits.length === 0) {
      return benefits;
    }
    return benefits.filter(b => favouriteBenefits.indexOf(b.id) > -1);
  };

  handleSortByChange = event => {
    this.setState({ sortByValue: event.target.value });
  };

  countString = (x, t) => {
    switch (true) {
      case x === 0:
        return t("B3.No benefits");
      case x === 1:
        return t("B3.One benefit");
      default:
        return t("B3.x benefits to consider", { x: x });
    }
  };

  getPrintUrl = (
    filteredBenefits,
    selectedEligibility,
    selectedNeeds,
    sortBy,
    language
  ) => {
    const filteredBenefitsIDs = filteredBenefits.map(b => b.id);
    const needsIDs = Object.keys(selectedNeeds);
    const selectedEligibilityKeys = Object.keys(selectedEligibility);
    let url = "print";
    url += "?lng=" + language;
    if (selectedEligibilityKeys.length > 0) {
      Object.keys(selectedEligibility).forEach(k => {
        url += "&" + k + "=" + selectedEligibility[k];
      });
    }
    if (needsIDs.length > 0) {
      url += "&needs=" + needsIDs.join(",");
    }
    url += "&sortBy=" + sortBy;
    if (filteredBenefitsIDs.length > 0) {
      url += "&benefits=" + filteredBenefitsIDs.join(",");
    }
    return url;
  };

  render() {
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars

    const filteredBenefits = this.filterBenefits(
      this.props.benefits,
      this.props.favouriteBenefits
    );

    const printUrl = this.getPrintUrl(
      filteredBenefits,
      this.props.selectedEligibility,
      this.props.selectedNeeds,
      this.state.sortByValue,
      t("current-language-code")
    );

    return (
      <div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.topMatter}>
              <Typography className={classes.title}>
                {t("B3.favouritesButtonText")}
              </Typography>
              <Button
                variant="flat"
                size="large"
                target="dan"
                href={printUrl}
                className={classes.buttonBarButton}
                id="printButton"
              >
                <Print style={{ fontSize: "20px" }} />
                &nbsp;
                {t("Print")}
              </Button>
            </Grid>
            <Grid item xs={12}>
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

              <FormControl id="sortBySelector" className={classes.formControl}>
                <InputLabel>{t("B3.Sort By")}</InputLabel>
                <Select
                  value={this.state.sortByValue}
                  onChange={this.handleSortByChange}
                  className={classnames(classes.sortByBox)}
                >
                  <MenuItem value={"relevance"}>{t("B3.Popularity")}</MenuItem>
                  <MenuItem value={"alphabetical"}>
                    {t("B3.Alphabetical")}
                  </MenuItem>
                </Select>
              </FormControl>

              <BenefitList
                t={t}
                filteredBenefits={filteredBenefits}
                sortByValue={this.state.sortByValue}
                showFavourites={true}
                searchString=""
                store={this.props.store}
                favouriteBenefits={this.props.favouriteBenefits}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    eligibilityPaths: reduxState.eligibilityPaths,
    needs: reduxState.needs,
    examples: reduxState.examples,
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals
    },
    selectedNeeds: reduxState.selectedNeeds
  };
};

Favourites.propTypes = {
  benefits: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  needs: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withStyles(styles)(Favourites));
