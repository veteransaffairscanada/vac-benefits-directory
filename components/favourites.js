import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import "babel-polyfill/dist/polyfill";
import BenefitList from "../components/benefit_list";
import { connect } from "react-redux";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Bookmark from "@material-ui/icons/BookmarkBorder";
import Print from "@material-ui/icons/Print";
import Link from "next/link";

const styles = theme => ({
  backLink: {
    fontSize: "20px",
    fontWeight: "100",
    marginBottom: "15px",
    paddingLeft: "0px",
    textDecoration: "none",
    textTransform: "none"
  },
  benefitsCount: {
    fontSize: "36px"
  },
  buttonBarButton: {
    color: "#3e57e2",
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
  contactUsTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "20px 0"
  },
  emptyList: {
    marginTop: "20px",
    textAlign: "center"
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
    marginBottom: "25px",
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
    language,
    closestAreaOffice,
    selectedAreaOffice
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
    if (closestAreaOffice.id !== undefined) {
      url += "&closestAOID=" + closestAreaOffice.id;
    }
    if (selectedAreaOffice.id !== undefined) {
      url += "&selectedAOID=" + selectedAreaOffice.id;
    }
    return url;
  };

  get_link = page => {
    return (
      page +
      "?" +
      Object.entries(this.props.url.query)
        .filter(x => x[0] !== "" && x[1] !== "")
        .map(x => {
          return x[0] + "=" + x[1];
        })
        .join("&")
    );
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
      t("current-language-code"),
      this.props.closestAreaOffice,
      this.props.selectedAreaOffice
    );

    return (
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "16px",
          paddingRight: "16px"
        }}
      >
        <Grid
          container
          spacing={24}
          style={{ paddingLeft: "16px", paddingRight: "16px" }}
        >
          <Grid item xs={12} className={classes.topMatter}>
            <Link href={this.get_link("benefits-directory")}>
              <Button
                variant="flat"
                size="large"
                className={classes.backLink}
                id="backButton"
              >
                <ArrowBack />
                &nbsp; &nbsp;
                {t("favourites.back_link")}
              </Button>
            </Link>

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
            {filteredBenefits.length == 0 ? (
              <div className={classes.emptyList}>
                <Bookmark style={{ fontSize: "70px" }} />
                <br />
                {t("favourites.help")}
              </div>
            ) : (
              ""
            )}
          </Grid>
          <Grid item md={4} xs={12}>
            <Button
              href={printUrl}
              target="_blank"
              variant="flat"
              size="large"
              className={classes.buttonBarButton}
              id="printButton"
            >
              <Print style={{ fontSize: "48px" }} />
              &nbsp;
              {t("Print")}
            </Button>
            <Typography className={classes.contactUsTitle}>
              {t("favourites.contact_us")}
            </Typography>
            <Typography>
              <Link href={this.get_link("map")}>
                <a>{t("favourites.visit_prompt")}</a>
              </Link>
            </Typography>
            <br />
            <Typography>{t("favourites.print_instructions")}</Typography>
            <br />
            <hr />
            <br />
            <Typography>
              <a href={"tel:" + t("contact.phone")}>{t("contact.phone")}</a>
            </Typography>
            <br />
            <Typography>{t("favourites.call_time")}</Typography>
            <br />
            <hr />
            <br />
            <Typography>
              <a href={"mailto:" + t("contact.email")}>{t("contact.email")}</a>
            </Typography>
            <br />
            <Typography>{t("favourites.email_disclaimer")}</Typography>
            <br />
            <hr />
            <Typography className={classes.contactUsTitle}>
              {t("favourites.apply_prompt")}
            </Typography>
            <Typography>
              <a
                href={t("contact.my_vac_link")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("favourites.login_link")}
              </a>
              &nbsp;
              {t("favourites.login_prompt")}
            </Typography>
            <br />
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
    selectedNeeds: reduxState.selectedNeeds,
    selectedAreaOffice: reduxState.selectedAreaOffice,
    closestAreaOffice: reduxState.closestAreaOffice
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
  url: PropTypes.object.isRequired,
  store: PropTypes.object,
  selectedAreaOffice: PropTypes.object.isRequired,
  closestAreaOffice: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Favourites));
