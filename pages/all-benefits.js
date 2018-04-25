// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import withRedux from "next-redux-wrapper";
import { initStore, loadDataStore } from "../store";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { BenefitTitleCardList } from "../components/benefit_cards";
import { bindActionCreators } from "redux";
import { fetchFromAirtable } from "../utils/airtable";

type Props = {
  benefits: mixed,
  i18n: mixed,
  loadDataStore: mixed,
  storeHydrated: boolean,
  t: mixed,
  url: mixed,
  corporaEn: mixed,
  corporaFr: mixed
};

export class AllBenefits extends Component<Props> {
  props: Props;

  async componentWillMount() {
    if (!this.props.storeHydrated) {
      fetchFromAirtable(this.props.loadDataStore);
    }
  }

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    let benefits = this.props.benefits;

    // add links to benefits
    benefits = benefits.map(benefit => {
      let links = this.props.corporaEn.filter(corp =>
        corp.benefits.includes(benefit.id)
      );
      benefit.linkEn =
        links.length > 0 ? links[0].full_description_link : undefined;
      links = this.props.corporaFr.filter(corp =>
        corp.benefits.includes(benefit.id)
      );
      benefit.linkFr =
        links.length > 0 ? links[0].full_description_link : undefined;
      return benefit;
    });

    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }}>
          <h1>{t("all-benefits.List of all benefits")}</h1>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <BenefitTitleCardList benefits={benefits} t={t} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDataStore: bindActionCreators(loadDataStore, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    benefits: state.benefits,
    corporaEn: state.corporaEn,
    corporaFr: state.corporaFr
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withI18next()(AllBenefits)
);
