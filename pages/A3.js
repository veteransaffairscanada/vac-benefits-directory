// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import withRedux from "next-redux-wrapper";
import { initStore, loadDataStore } from "../store";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { logEvent } from "../utils/analytics";
import Link from "next/link";
import SelectedOptionsCard from "../components/selected_options_card";
import { BenefitTitleCardList } from "../components/benefit_cards";
import { bindActionCreators } from "redux";
import { fetchFromAirtable } from "../utils/airtable";

type Props = {
  i18n: mixed,
  t: mixed,
  storeHydrated: boolean,
  loadDataStore: mixed,
  benefitTypes: mixed,
  patronTypes: mixed,
  benefits: mixed,
  url: mixed
};

export class App extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      selectedOptions: []
    };
  }

  async componentWillMount() {
    if (!this.props.storeHydrated) {
      fetchFromAirtable(this.props.loadDataStore);
    }
  }

  toggleButton = id => {
    let selected = this.state.selectedOptions;
    const index = selected.indexOf(id);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }
    this.setState({
      selectedOptions: selected
    });
  };

  changeLanguage = () => {
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  countBenefitsString = (benefits, t) => {
    switch (benefits.length) {
      case 0:
        return t(
          "A3.Based on your selections you do not qualify for any benefits at this time"
        );
      case 1:
        return t("A3.Here is a benefit that may apply to you") + ":";
      default:
        return (
          t("A3.Here are NNN benefits that may apply to you", {
            value: benefits.length
          }) + ":"
        );
    }
  };

  filterBenefits = (benefits, benefitTypes, patronTypes) => {
    return benefits.filter(benefit => {
      const matchingBenefitTypes = benefit.benefit_types.filter(
        bt => benefitTypes.indexOf(bt) > -1
      );
      const matchingPatronTypes = benefit.patron_types.filter(
        pt => patronTypes.indexOf(pt) > -1
      );
      return matchingBenefitTypes.length > 0 && matchingPatronTypes.length > 0;
    });
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    const benefitTypesSelected = this.props.url.query.benefitTypes.split(",");
    const patronTypesSelected = this.props.url.query.patronTypes.split(",");
    const benefitTypes = this.props.benefitTypes.filter(bt =>
      benefitTypesSelected.includes(bt.id)
    );
    const patronTypes = this.props.patronTypes.filter(pt =>
      patronTypesSelected.includes(pt.id)
    );

    const benefits = this.filterBenefits(
      this.props.benefits,
      benefitTypesSelected,
      patronTypesSelected
    );

    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <p
                id="benefitCountString"
                style={{ textAlign: "left", fontSize: "1.5em" }}
              >
                {this.countBenefitsString(benefits, t)}
              </p>
            </Grid>
          </Grid>
        </div>

        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item sm={3} xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <div style={{ textAlign: "left", fontSize: "1em" }}>
                    {t("A3.Your Selection") + ":"}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <SelectedOptionsCard
                    id="vacServicesCard"
                    page="A1"
                    options={benefitTypes.map(
                      bt =>
                        t("current-language-code") === "en"
                          ? bt.name_en
                          : bt.name_fr
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectedOptionsCard
                    id="userStatusesCard"
                    page="A2"
                    options={patronTypes.map(
                      pt =>
                        t("current-language-code") === "en"
                          ? pt.name_en
                          : pt.name_fr
                    )}
                  />
                </Grid>
                <Grid item>
                  <p style={{ textAlign: "center", fontSize: "1em" }}>
                    <Link href="all-benefits">
                      <a>{t("Show All Benefits")}</a>
                    </Link>
                  </p>
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm={9} xs={12}>
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
    benefitTypes: state.benefitTypes,
    patronTypes: state.patronTypes
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withI18next()(App)
);
