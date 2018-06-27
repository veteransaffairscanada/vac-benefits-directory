import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BenefitCard from "../components/benefit_cards";

export class AllBenefits extends Component {
  componentWillMount() {
    let i18nEn = {};
    let i18nFr = {};
    this.props.text.forEach(text => {
      if (text.section) {
        if (!i18nEn[text.section]) {
          i18nEn[text.section] = {};
          i18nFr[text.section] = {};
        }
        i18nEn[text.section][text.key] = text.English;
        i18nFr[text.section][text.key] = text.French;
      } else {
        i18nEn[text.key] = text.English;
        i18nFr[text.key] = text.French;
      }
    });
    this.props.i18n.addResourceBundle("en", "common", i18nEn);
    this.props.i18n.addResourceBundle("fr", "common", i18nFr);
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
                    searchString=""
                    favouriteBenefits={this.props.favouriteBenefits}
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
    text: state.text
  };
};

AllBenefits.propTypes = {
  benefits: PropTypes.array,
  examples: PropTypes.array,
  eligibilityPaths: PropTypes.array,
  i18n: PropTypes.object,
  t: PropTypes.func,
  favouriteBenefits: PropTypes.array,
  text: PropTypes.array
};

export default connect(mapStateToProps)(withI18next()(AllBenefits));
