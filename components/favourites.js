import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import "babel-polyfill/dist/polyfill";
import BenefitList from "../components/benefit_list";
import { connect } from "react-redux";
import { getPrintUrl } from "../selectors/urls";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Bookmark from "@material-ui/icons/BookmarkBorder";
import Print from "@material-ui/icons/Print";
import Link from "next/link";
import { css } from "react-emotion";
import Container from "../components/container";

const backLink = css`
  font-size: 20px !important;
  font-weight: 100 !important;
  margin-bottom: 15px !important;
  padding-left: 0px !important;
  text-decoration: none !important;
  text-transform: none !important;
`;
const benefitsCount = css`
  font-size: 36px;
`;
const bookmarkCSS = css`
font-size: 70px;
`;
const buttonBarButton = css`
  color: #3e57e2 !important;
  font-size: 20px !important;
  font-weight: 100 !important;
  padding-left: 0px !important;
  text-decoration: none !important;
  text-transform: none !important;
`;
const contactUsTitle = css`
  font-size: 22px;
  font-weight: bold;
  margin: 20px 0;
`;
const emptyList = css`
  margin-top: 20px;
  text-align: center;
`;
const outerGrid = css`
padding-left: 16px;
padding-right: 16px;
`;
const printCSS = css`
font-size: 48px !important;
`;
const topMatter = css`
  margin-bottom: 25px !important;
  margin-top: 30px !important;
`;

export class Favourites extends Component {
  state = {
    enIdx: null,
    frIdx: null
  };

  filterBenefits = (benefits, favouriteBenefits) => {
    if (benefits.length === 0) {
      return benefits;
    }
    return benefits.filter(b => favouriteBenefits.indexOf(b.id) > -1);
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
    const { t } = this.props; // eslint-disable-line no-unused-vars

    const filteredBenefits = this.filterBenefits(
      this.props.benefits,
      this.props.favouriteBenefits
    );

    return (
      <Container id="favourites">
        <Grid
        className={outerGrid}
          container
          spacing={24}
        >
          <Grid item xs={12} className={topMatter}>
            <Button
              variant="flat"
              size="large"
              className={backLink}
              id="backButton"
              href={this.get_link("benefits-directory")}
            >
              <ArrowBack />
              &nbsp; &nbsp;
              {t("favourites.back_link")}
            </Button>

            <h1 className={"BenefitsCounter " + benefitsCount}>
              {t("favourites.saved_benefits", { x: filteredBenefits.length })}
            </h1>
          </Grid>
          <Grid item md={8} xs={12}>
            <Grid container spacing={24}>
              <BenefitList
                t={t}
                filteredBenefits={filteredBenefits}
                sortByValue={this.props.sortBy}
                showFavourites={true}
                searchString=""
                store={this.props.store}
                favouriteBenefits={this.props.favouriteBenefits}
              />
            </Grid>
            {filteredBenefits.length == 0 ? (
              <div className={emptyList}>
                <Bookmark className={bookmarkCSS} />
                <br />
                {t("favourites.help")}
              </div>
            ) : (
              ""
            )}
          </Grid>
          <Grid item md={4} xs={12}>
            <Button
              href={this.props.printUrl}
              target="_blank"
              variant="flat"
              size="large"
              className={buttonBarButton}
              id="printButton"
            >
              <Print className={printCSS} />
              &nbsp;
              {t("Print")}
            </Button>
            <h2 className={contactUsTitle}>{t("favourites.contact_us")}</h2>
            <p>
              <Link href={this.get_link("map")}>
                <a>{t("favourites.visit_prompt")}</a>
              </Link>
            </p>

            <p>{t("favourites.print_instructions")}</p>

            <hr />

            <p>
              <a href={"tel:" + t("contact.phone")}>{t("contact.phone")}</a>
            </p>

            <p>{t("favourites.call_time")}</p>

            <hr />

            <p>
              <a href={"mailto:" + t("contact.email")}>{t("contact.email")}</a>
            </p>

            <p>{t("favourites.email_disclaimer")}</p>

            <hr />

            <h2 className={contactUsTitle}>{t("favourites.apply_prompt")}</h2>

            <p>
              <a
                href={t("contact.my_vac_link")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("favourites.login_link")}
              </a>
              &nbsp;
              {t("favourites.login_prompt")}
            </p>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    benefits: reduxState.benefits,
    eligibilityPaths: reduxState.eligibilityPaths,
    needs: reduxState.needs,
    examples: reduxState.examples,
    printUrl: getPrintUrl(reduxState, props, { fromFavourites: true }),
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals
    },
    selectedNeeds: reduxState.selectedNeeds,
    selectedAreaOffice: reduxState.selectedAreaOffice,
    sortBy: reduxState.sortBy,
    closestAreaOffice: reduxState.closestAreaOffice
  };
};

Favourites.propTypes = {
  benefits: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  needs: PropTypes.array.isRequired,
  printUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  sortBy: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  store: PropTypes.object,
  selectedAreaOffice: PropTypes.object.isRequired,
  closestAreaOffice: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Favourites);
