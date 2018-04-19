// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import withRedux from "next-redux-wrapper";
import { initStore } from "../store";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { logEvent } from "../utils/analytics";
import Link from "next/link";
import SelectedOptionsCard from "../components/selected_options_card";
import { BenefitTitleCardList } from "../components/benefit_cards";

type Props = {
  i18n: mixed,
  t: mixed,
  benefitList: mixed
};

export class App extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      selectedOptions: []
    };
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

  countBenefitsString = (benefitList, t) => {
    switch (benefitList.length) {
      case 0:
        return t(
          "A3.Based on your selections you do not qualify for any benefits at this time"
        );
      case 1:
        return t("A3.Here is a benefit that may apply to you") + ":";
      default:
        return (
          t("A3.Here are NNN benefits that may apply to you", {
            value: benefitList.length
          }) + ":"
        );
    }
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    const vacServicesSelected = ["Financial Support", "Rehabilitation"];
    const userStatusesSelected = ["Veteran"];
    const benefitList = this.props.benefitList;

    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <p style={{ textAlign: "left", fontSize: "1.5em" }}>
                {this.countBenefitsString(benefitList, t)}
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
                    page="A1"
                    options={vacServicesSelected}
                    t={t}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectedOptionsCard
                    page="A2"
                    options={userStatusesSelected}
                    t={t}
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
                <BenefitTitleCardList benefitList={benefitList} t={t} />
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
    benefitList: state.benefitList
  };
};

export default withRedux(initStore, mapStateToProps, null)(withI18next()(App));
