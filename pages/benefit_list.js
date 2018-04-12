// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import BenefitCardList from "../components/benefit_cards";
import { logEvent } from "../utils/analytics";

type Props = {
  i18n: mixed,
  t: mixed
};

class App extends Component<Props> {
  props: Props;

  changeLanguage = () => {
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    const benefitList = [
      {
        type: "Support for Families",
        title: "Survivor's Pension",
        description: "Survivor's Pension Description"
      },
      {
        type: "Financial",
        title: "Disability Award",
        description: "Disability Award Description"
      }
    ];

    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12} />
            <BenefitCardList benefitList={benefitList} t={t} />
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default withI18next()(App);
