import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "material-ui";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BenefitCard from "../components/benefit_cards";

export class AllBenefits extends Component {
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
      <Layout i18n={i18n} t={t} hideNoscript={true}>
        <div style={{ padding: 12 }} className="allBenefitsList">
          <h1>{t("all-benefits.List of all benefits")}</h1>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                {this.props.benefits.map((benefit, i) => (
                  <BenefitCard
                    className="benefitCard"
                    id={"bc" + i}
                    benefit={benefit}
                    examples={this.props.examples}
                    allBenefits={this.props.benefits}
                    veteranBenefitIds={veteranBenefitIds}
                    familyBenefitIds={familyBenefitIds}
                    t={this.props.t}
                    key={i}
                    onRef={foo => foo}
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
    eligibilityPaths: state.eligibilityPaths
  };
};

AllBenefits.propTypes = {
  benefits: PropTypes.array,
  examples: PropTypes.array,
  eligibilityPaths: PropTypes.array,
  i18n: PropTypes.object,
  t: PropTypes.func
};

export default connect(mapStateToProps)(withI18next()(AllBenefits));
