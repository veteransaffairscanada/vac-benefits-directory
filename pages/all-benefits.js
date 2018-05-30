// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BenefitCard from "../components/benefit_cards";

type Props = {
  benefits: mixed,
  i18n: mixed,
  t: mixed
};

export class AllBenefits extends Component<Props> {
  props: Props;

  render() {
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
                    allBenefits={this.props.benefits}
                    t={this.props.t}
                    key={i}
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
    benefits: state.benefits
  };
};

export default connect(mapStateToProps)(withI18next()(AllBenefits));
