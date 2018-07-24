import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
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
    marginBottom: "30px",
    marginTop: "30px"
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: 12 }}>
        <Grid container spacing={24}>
          <Grid item xs={12} className={classes.topMatter}>
            <Typography className={"BenefitsCounter " + classes.benefitsCount}>
              {t("favourites.saved_benefits", { x: filteredBenefits.length })}
            </Typography>
          </Grid>
          <Grid item md={8} xs={12}>
            <Grid container spacing={24}>
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
          <Grid item md={4} xs={12}>
            <Button
              variant="flat"
              size="large"
              href={printUrl}
              className={classes.buttonBarButton}
              id="printButton"
            >
              <Print style={{ color: "#3e57e2", fontSize: "48px" }} />
              &nbsp;
              {t("Print")}
            </Button>
          </Grid>
        </Grid>
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
