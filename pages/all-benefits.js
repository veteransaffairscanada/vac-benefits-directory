// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import withRedux from "next-redux-wrapper";
import { initStore, loadDataStore } from "../store";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { BenefitCard } from "../components/benefit_cards";
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
  corporaFr: mixed,
  benefitTypes: mixed
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

    // add links and descriptions to benefits
    benefits = benefits.map(benefit => {
      let corporas = this.props.corporaEn.filter(corp =>
        corp.benefits.includes(benefit.id)
      );
      benefit.linkEn =
        corporas.length > 0 ? corporas[0].full_description_link : undefined;
      benefit.descriptionEn =
        corporas.length > 0 ? corporas[0].one_line_description : undefined;

      corporas = this.props.corporaFr.filter(corp =>
        corp.benefits.includes(benefit.id)
      );
      benefit.linkFr =
        corporas.length > 0 ? corporas[0].full_description_link : undefined;
      benefit.descriptionFr =
        corporas.length > 0 ? corporas[0].one_line_description : undefined;
      return benefit;
    });

    // add benefit types
    benefits = benefits.map(benefit => {
      let bts = this.props.benefitTypes.filter(bt =>
        bt.benefits.includes(benefit.id)
      );
      benefit.benefitTypeEn = bts.length > 0 ? bts[0].name_en : "";
      benefit.benefitTypeFr = bts.length > 0 ? bts[0].name_fr : "";
      return benefit;
    });

    return (
      <Layout i18n={i18n} t={t} hideNoscript={true}>
        <div style={{ padding: 12 }} className="allBenefitsList">
          <h1>{t("all-benefits.List of all benefits")}</h1>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                {benefits.map((benefit, i) => (
                  <BenefitCard
                    id={"bc" + i}
                    benefit={benefit}
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

const mapDispatchToProps = dispatch => {
  return {
    loadDataStore: bindActionCreators(loadDataStore, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    benefits: state.benefits,
    corporaEn: state.corporaEn,
    corporaFr: state.corporaFr,
    benefitTypes: state.benefitTypes
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withI18next()(AllBenefits)
);
