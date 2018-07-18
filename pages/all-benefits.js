import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BenefitCard from "../components/benefit_cards";
import { redux2i18n } from "../utils/redux2i18n";

export class AllBenefits extends Component {
  UNSAFE_componentWillMount() {
    redux2i18n(this.props.i18n, this.props.translations);
  }

  render() {
    let veteranBenefitIds = [];
    let familyBenefitIds = [];

    this.props.eligibilityPaths.forEach(ep => {
      if (ep.patronType === "service-person") {
        veteranBenefitIds = veteranBenefitIds.concat(ep.benefits);
      }
      if (ep.patronType === "family") {
        familyBenefitIds = familyBenefitIds.concat(ep.benefits);
      }
    });

    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout i18n={i18n} t={t} hideNoscript={true} showRefreshCache={false}>
        <div
          style={{ padding: 12, maxWidth: "1200px", margin: "0 auto" }}
          className="allBenefitsList"
        >
          <h1>{t("all-benefits.List of all benefits")}</h1>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                {this.props.benefits.map((benefit, i) => (
                  <BenefitCard
                    className="benefitCard"
                    id={"bc" + i}
                    benefit={benefit}
                    allBenefits={this.props.benefits}
                    veteranBenefitIds={veteranBenefitIds}
                    familyBenefitIds={familyBenefitIds}
                    t={this.props.t}
                    key={i}
                    onRef={foo => foo}
                    searchString=""
                    store={this.props.store}
                    examples={this.props.examples}
                    showFavourite={false}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    benefits: state.benefits,
    examples: state.examples,
    eligibilityPaths: state.eligibilityPaths,
    favouriteBenefits: state.favouriteBenefits,
    needs: state.needs,
    selectedNeeds: state.selectedNeeds,
    translations: state.translations
  };
};

AllBenefits.propTypes = {
  benefits: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  translations: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(withI18next()(AllBenefits));
